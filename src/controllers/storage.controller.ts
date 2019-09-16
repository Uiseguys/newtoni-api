import {
  get,
  post,
  param,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Storage} from '@google-cloud/storage';
import * as multiparty from 'multiparty';
import * as fs from 'fs';

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

  // Map to `GET /ping`
  @post('/storage/upload', {
    responses: {
      '200': {
        description: 'Uploaded File to Google Bucket Storage',
        content: {'application/json': {schema: {type: 'object'}}},
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
          schema: {type: 'object'},
        },
      },
    })
    req: Request,
    @param.query.string('folder') folder?: string,
  ): Promise<void> {
    // This function checks if the incoming requet has a folder query
    // If it does it returns the provided string if doesn't it returns an
    // empty string
    const form = new multiparty.Form();
    await form.parse(req, (err, fields, files) => {
      if (err) return err;
      const file = files['null'][0];
      // Check to see if the file extension is that of an image
      const fileExtensionCheck = /[^.][jpe?g|png|gif]$/.test(file.path);
      if (fileExtensionCheck) {
        console.log(
          '######### Is file the right filetype? ' + fileExtensionCheck,
        );
        // Check if folder query exists
        const folderExists = (folder: string | undefined) => {
          if (folder) {
            return folder;
          }
          return '';
        };

        // Extract filename and extension using regex
        // This works for both paths in linux and windows
        const regex = /[^\\^\/]+\..+$/.exec(file.path);

        // Use the google storage client library to upload the file
        storage.bucket('newtoni').upload(
          file.path,
          {
            destination: `${folderExists(folder)}/${regex}`,
          },
          (err, file) => {
            if (err != null) {
              return console.log(err);
            }
          },
        );
      }
      if (!file) return console.log('File was not found');
    });
  }
}
