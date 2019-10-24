import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  get,
  post,
  del,
  param,
  Request,
  requestBody,
  Response,
  getWhereSchemaFor,
  getModelSchemaRef,
  RestBindings,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Storage} from '@google-cloud/storage';
import {AuthenticationBindings, authenticate} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import {Resource} from '../models';
import * as multiparty from 'multiparty';
import {promisify} from 'util';
import * as fs from 'fs';

// Instantiation of Google Storage Client
const storage = new Storage();
/**
 * A simple controller to handle Google Bucket Storage Operations
 */
export class ResourceController {
  constructor(
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: UserProfile,
  ) {}

  @authenticate('BasicStrategy')
  @get('/resources/all', {
    responses: {
      '200': {
        description:
          'Retrieval of images from a folder in a Google Storage Bucket',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async getAllFiles(): Promise<object> {
    const allFiles = await storage
      .bucket('newtoni')
      .getFiles({prefix: 'images'});
    // Apply shift to remove first entry which is the folder name
    // As Google Cloud Storage perceives it as an object as well
    const noFolderObject = (item: {name: string}) => {
      // Return item only if it does not include any of the wine-images
      // folder name
      return !('images/' == item.name);
    };
    const mappedFiles = await allFiles[0]
      .filter(noFolderObject)
      .map(async item => {
        return {
          id: item.id,
          name: item.name,
          url: `/resources/download/${item.name.replace('images/', '')}`,
        };
      });

    return await Promise.all(mappedFiles)
      .then(data => {
        return data;
      })
      .catch(err => {
        return err.message;
      });
  }

  @authenticate('BasicStrategy')
  @post('/resources/upload', {
    responses: {
      '200': {
        description: 'Successfully Uploaded File to Google Bucket Storage',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'multipart/form-data value.',
      require: true,
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: {
            type: 'object',
          },
        },
      },
    })
    req: Request,
  ): Promise<object> {
    // This function checks if the incoming requet has a folder query
    // If it does it returns the provided string if doesn't it returns an
    // empty string
    let statusCode = 500;
    let message = 'Something went wrong';
    const form = new multiparty.Form();
    return new Promise(async (resolve, reject) => {
      await form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (!files['file']) {
          err = new Error('No file has been uploaded');
          console.log(err);
          return reject(err);
        }
        // Check to see if the file extension is that of an image
        if (files['file']) {
          let fileArr = [];
          await files['file'].forEach(
            (item: {path: string; originalFilename: string}, index: number) => {
              const fileExtensionCheck = /[^.][jpe?g|png|gif]$/.test(item.path);
              if (fileExtensionCheck) {
                // Use the google storage client library to upload the file
                storage.bucket('newtoni').upload(
                  item.path,
                  {
                    destination: `images/${item.originalFilename}`,
                  },
                  (err, file) => {
                    if (err != null) {
                      console.log(err);
                      return reject(err);
                    }
                    if (file) {
                      fileArr[index] = file;
                    }
                  },
                );
              }
            },
          );
          statusCode = 200;
          message = 'Successfully Uploaded Image(s)';
          resolve({status: statusCode, msg: message});
        }
      });
    });
  }

  @get('/resources/download/{image}', {
    responses: {
      '200': {
        description: 'Download an Image',
        content: {
          'image/jpeg': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async findImage(
    @param.path.string('image') image: string,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<void> {
    return await storage
      .bucket('newtoni')
      .file(`images/${image}`)
      .download()
      .then(data => {
        res.contentType('image/jpeg');
        res.send(data[0]);
      })
      .catch(err => {
        console.log(err.message);
        res.contentType('application/json');
        res.statusCode = 404;
        res.send({
          error: {
            statusCode: 404,
            message: 'Image File not Found',
          },
        });
      });
  }

  @get('/resources/count', {
    responses: {
      '200': {
        description: 'Resource model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @inject(RestBindings.Http.RESPONSE) res: Response,
    @param.query.object('where', getWhereSchemaFor(Resource))
    where?: Where<Resource>,
  ): Promise<void> {
    return await storage
      .bucket('newtoni')
      .getFiles({prefix: 'images'})
      .then(data => {
        const noFolderObject = (item: {name: string}) => {
          return !('images/' == item.name);
        };
        res.send({count: data[0].filter(noFolderObject).length});
      })
      .catch(err => {
        console.log(err);
        res.contentType('application/json');
        res.statusCode = 500;
        res.send({
          error: {
            statusCode: 500,
            message: 'Internal Server Error',
          },
        });
      });
  }

  @authenticate('BasicStrategy')
  @del('/resources/{id}', {
    responses: {
      '204': {
        description: 'File DELETED successfully',
      },
    },
  })
  async deleteFile(
    @inject(RestBindings.Http.RESPONSE) res: Response,
    @param.path.string('id') id: string,
  ): Promise<void> {
    return await storage
      .bucket('newtoni')
      .file(decodeURIComponent(id))
      .delete()
      .then(data => {
        res.send(data[0]);
      })
      .catch(err => {
        console.log(err);
        res.contentType('application/json');
        res.statusCode = 500;
        res.send({
          error: {
            statusCode: 500,
            message: 'Internal Server Error',
          },
        });
      });
  }
}
