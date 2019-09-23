import {
  get,
  post,
  del,
  param,
  Request,
  requestBody,
  Response,
  //getModelSchemaRef,
  RestBindings,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Storage} from '@google-cloud/storage';
import * as multiparty from 'multiparty';
import {promisify} from 'util';
import * as fs from 'fs';

// Instantiation of Google Storage Client
const storage = new Storage();
/**
 * A simple controller to handle Google Bucket Storage Operations
 */
export class StorageController {
  constructor() {}

  @get('/storage/{folder}', {
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
  async getFiles(@param.path.string('folder') folder: string): Promise<object> {
    // Options for the Signed URLs
    const options = {
      version: 'v4' as 'v4',
      action: 'read' as 'read',
      expires: Date.now() + 5 * 60 * 1000, // Signed URL expires in 5 mins
    };
    const allFiles = await storage.bucket('newtoni').getFiles({prefix: folder});
    // Apply shift to remove first entry which is the folder name
    // As Google Cloud Storage perceives it as an object as well
    const noFolderObjects = (item: {name: string}) => {
      // Creating an array of the available foldernames and filtering them out
      const folderArray = [
        'editions-images/',
        'news-images/',
        'publications-images/',
        'tmp/',
      ];
      // Return item only if it does not include any of the folder names
      return !(folderArray.indexOf(item.name) >= 0);
    };
    let signedURL;
    const mappedFiles = await allFiles[0]
      .filter(noFolderObjects)
      .map(async item => {
        signedURL = await storage
          .bucket('newtoni')
          .file(item.name)
          .getSignedUrl(options);
        return {id: item.id, name: item.name, url: signedURL[0]};
      });

    return await Promise.all(mappedFiles)
      .then(data => {
        return data;
      })
      .catch(err => {
        return err.message;
      });
  }

  @get('/storage/all', {
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
    // Options for the Signed URLs
    const options = {
      version: 'v4' as 'v4',
      action: 'read' as 'read',
      expires: Date.now() + 5 * 60 * 1000, // Signed URL expires in 5 mins
    };
    const allFiles = await storage.bucket('newtoni').getFiles();
    // Using Filter to avoid folder names to remove first entry which is the folder name
    // As Google Cloud Storage perceives it as an object as well
    const noFolderObjects = (item: {name: string}) => {
      // Creating an array of the available foldernames and filtering them out
      const folderArray = [
        'editions-images/',
        'news-images/',
        'publications-images/',
        'tmp/',
      ];
      // Return item only if it does not include any of the folder names
      return !(folderArray.indexOf(item.name) >= 0);
    };
    let signedURL;
    const mappedFiles = await allFiles[0]
      .filter(noFolderObjects)
      .map(async item => {
        signedURL = await storage
          .bucket('newtoni')
          .file(item.name)
          .getSignedUrl(options);
        return {id: item.id, name: item.name, url: signedURL[0]};
      });

    return await Promise.all(mappedFiles)
      .then(data => {
        return data;
      })
      .catch(err => {
        return err.message;
      });
  }

  @post('/storage/upload', {
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
  upload(
    @requestBody({
      description: 'mutlipart/form-data value.',
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
    @param.query.string('folder') folder?: string,
  ): Promise<object> {
    // This function checks if the incoming requet has a folder query
    // If it does it returns the provided string if doesn't it returns an
    // empty string
    let statusCode = 500;
    let message = 'Something went wrong';
    const form = new multiparty.Form();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (!files['null']) {
          err = new Error('No file has been uploaded');
          console.log(err);
          return reject(err);
        }
        // Check to see if the file extension is that of an image
        if (files['null']) {
          const file = files['null'][0];
          const fileExtensionCheck = /[^.][jpe?g|png|gif]$/.test(file.path);
          if (fileExtensionCheck) {
            // Check if folder query exists
            const folderExists = (folder: string | undefined) => {
              if (folder) {
                return folder;
              }
              return '';
            };

            // Extract filename and extension using regex
            // This works for both paths in linux and windows
            const regexFileExt = /[^\\^\/]+\..+$/.exec(file.path);

            // Use the google storage client library to upload the file
            storage.bucket('newtoni').upload(
              file.path,
              {
                destination: `${folderExists(folder)}/${regexFileExt}`,
              },
              (err, file) => {
                if (err != null) {
                  console.log(err);
                  return reject(err);
                }
                if (file) {
                  statusCode = 200;
                  message = 'Successfully Uploaded Image';
                  resolve({status: statusCode, msg: message});
                }
              },
            );
          }
        }
      });
    });
  }

  @del('/storage/delete/{id}', {
    responses: {
      '204': {
        description: 'File DELETED successfully',
      },
    },
  })
  async deleteFile(@param.path.string('id') id: string): Promise<object> {
    return new Promise<object>(async (resolve, reject) => {
      try {
        await storage
          .bucket('newtoni')
          .file(decodeURIComponent(id))
          .delete();
        resolve({status: 'Success', msg: 'File has been deleted'});
      } catch (err) {
        reject({msg: err.message});
      }
    });
  }

  // Get a single file as base64 buffer
  @get('/storage/image/{id}', {
    responses: {
      '200': {
        description: 'Download a from the Google Storage Bucket',
        content: {
          'application/octet-stream': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async getImageURL(
    @param.path.string('id') id: string,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<object | void> {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          version: 'v4' as 'v4',
          action: 'read' as 'read',
          expires: Date.now() + 15 * 60 * 1000,
        };
        const [url] = await storage
          .bucket('newtoni')
          .file(decodeURIComponent(id))
          .getSignedUrl(options);
        resolve({url: url});
      } catch (err) {
        reject({msg: err.message});
      }
    });
  }
}
