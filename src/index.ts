import {NewtoniApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {GoogleStorageServiceProvider} from './providers/google-storage.provider';

export {NewtoniApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new NewtoniApiApplication(options);

  /* Add this line, it add a service to the app after that you can
  call them in the controller with dependency injection, like:
  @inject('services.StorageGCService') */
  app.serviceProvider(GoogleStorageServiceProvider);

  await app.boot();
  await app.migrateSchema();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
