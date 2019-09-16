const application = require('./dist');
const fs = require('fs');

// Create google folder to contain authentication key if it doesn't exist
if (!fs.existsSync('./keys/google')) {
  fs.mkdirSync('./keys/google', {recursive: true});
  console.log('created google folder');
}
if (process.env.GOOGLE_STORAGE_SERVICE_KEY) {
  /* Create Google Cloud Storage Key from environment Variables */
  let googleStorageKey = process.env.GOOGLE_STORAGE_SERVICE_KEY;

  googleStorageKey = JSON.parse(googleStorageKey);
  googleStorageKey = JSON.stringify(googleStorageKey);

  fs.writeFile('./keys/google/auth.json', googleStorageKey, 'utf-8', err => {
    if (err) {
      return console.log(err);
    }
    return console.log('Key File has been created successfully');
  });
}

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 3000),
      host: process.env.HOST || '0.0.0.0',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
