import {
  get,
  post,
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

// Instantiation of Google Storage Client
const storage = new Storage();

/**
 * A simple controller to handle Google Bucket Storage Operations
 */
export class StorageController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(RestBindings.Http.RESPONSE) private res: Response,
  ) {}

  //@post('/storage/upload', {
  //responses: {
  //200: {
  //content: {
  //'application/json': {
  //schema: {
  //type: 'object',
  //},
  //},
  //},
  //description: '',
  //},
  //},
  //})
  //async showBody(
  //@requestBody({
  //description: 'multipart/form-data value.',
  //required: true,
  //content: {
  //'multipart/form-data': {
  //schema: {type: 'object'},
  //},
  //},
  //})
  //body: unknown,
  //) {
  //console.log(body);
  //return body;
  //}

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
  async upload(
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
  ): Promise<object | void> {
    try {
      // This function checks if the incoming requet has a folder query
      // If it does it returns the provided string if doesn't it returns an
      // empty string
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        this.res.send({status: '200', message: 'It works'});
        if (err) throw err;
        const file = files['null'][0];
        if (file == null) {
          throw new Error('No file has been uploaded');
        }
        // Check to see if the file extension is that of an image
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
          return storage.bucket('newtoni').upload(
            file.path,
            {
              destination: `${folderExists(folder)}/${regexFileExt}`,
            },
            (err, file) => {
              if (err != null) {
                throw err;
              }
              if (file) {
                this.res
                  .status(200)
                  .send({status: '200', message: 'File successfully uploaded'});
              }
            },
          );
        }
        if (!file) throw new Error('File was not found');
      });
    } catch (err) {
      this.res.status(500);
      this.res.end(err);
    }
  }
}
