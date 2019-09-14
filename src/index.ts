import {NewtoniApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {GoogleStorageServiceProvider} from './providers/google-storage.provider';
import * as fs from 'fs';

export {NewtoniApiApplication};

export async function main(options: ApplicationConfig = {}) {
	const app = new NewtoniApiApplication(options);


	/* Add this line, it add a service to the app after that you can
	call them in the controller with dependency injection, like:
	@inject('services.StorageGCService') */
	app.serviceProvider(GoogleStorageServiceProvider);

	/* Create Google Cloud Storage Key from environment Variables */
	const googleStorageKey = {
		"type": process.env.GOOGLE_STORAGE_TYPE,
		"project_id": process.env.GOOGLE_STORAGE_PROJECT_ID,
		"private_key_id": process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID,
		"private_key": process.env.GOOGLE_STORAGE_PRIVATE_KEY,
		"client_email": process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
		"client_id": process.env.GOOGLE_STORAGE_CLIENT_ID,
		"auth_uri": process.env.GOOGLE_STORAGE_AUTH_URI,
		"token_uri": process.env.GOOGLE_STORAGE_TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.GOOGLE_STORAGE_AUTH_PROVIDER_X509_CERT_URL,
		"x509_cert_url": process.env.GOOGLE_STORAGE_X509_CERT_URL
	};
	fs.writeFile("./datasources/google/auth.json", googleStorageKey, options, err => {if (err) {throw err;} console.log("Key File has been created successfully");});

	await app.boot();
	await app.migrateSchema();
	await app.start();

	const url = app.restServer.url;
	console.log(`Server is running at ${url}`);
	console.log(`Try ${url}/ping`);

	return app;
}
