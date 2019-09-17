import * as multer from 'multer';
import {Request, requestBody, RequestBody, BodyParser} from '@loopback/rest';

const FORM_DATA = 'multipart/form-data';

class MultipartFormDataBodyParser implements BodyParser {
  name = FORM_DATA;

  supports(mediaType: string) {
    // The mediaType can be
    // `multipart/form-data; boundary=--------------------------979177593423179356726653`
    return mediaType.startsWith(FORM_DATA);
  }

  async parse(request: Request): Promise<RequestBody> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});
    return new Promise<RequestBody>((resolve, reject) => {
      upload.any()(request, {} as any, err => {
        if (err) return reject(err);
        resolve({
          value: {
            files: request.files,
            fields: (request as any).fields,
          },
        });
      });
    });
  }
}
