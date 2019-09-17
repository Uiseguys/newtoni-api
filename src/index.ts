import {NewtoniApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
//import MultipartFormDataBodyParser from './parsers/multer.parser';

export {NewtoniApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new NewtoniApiApplication(options);

  await app.boot();
  await app.migrateSchema();
  await app.start();
  //await app.bodyParser(MultipartFormDataBodyParser);

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
