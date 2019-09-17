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
import {promisify} from 'util';

// Instantiation of Google Storage Client
const storage = new Storage();
/**
 * A simple controller to handle Google Bucket Storage Operations
 */
export class StorageController {
  constructor() {}

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
    @inject(RestBindings.Http.RESPONSE) res: Response,
    @param.query.string('folder') folder?: string,
  ): Promise<object> {
    // This function checks if the incoming requet has a folder query
    // If it does it returns the provided string if doesn't it returns an
    // empty string
    let statusCode = 500;
    let message = 'Something went wrong';
    const form = new multiparty.Form();
    return new Promise<object>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        if (!files['null']) {
          err = new Error('No file has been uploaded');
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
}
