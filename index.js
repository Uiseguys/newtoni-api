const application = require('./dist');
const fs = require('fs');

// Create google folder to contain authentication key if it doesn't exist
if (!fs.existsSync("./src/datasources/google")) {
    fs.mkdirSync("./src/datasources/google");
    console.log("created google folder");
}

/* Create Google Cloud Storage Key from environment Variables */
let googleStorageKey = `{
    "type": "${process.env.GOOGLE_STORAGE_TYPE}",
    "project_id": "${process.env.GOOGLE_STORAGE_PROJECT_ID}",
    "private_key_id": "${process.env.GOOGLE_STORAGE_PRIVATE_KEY_ID}",
    "private_key": "${process.env.GOOGLE_STORAGE_PRIVATE_KEY}",
    "client_email": "${process.env.GOOGLE_STORAGE_CLIENT_EMAIL}",
    "client_id": "${process.env.GOOGLE_STORAGE_CLIENT_ID}",
    "auth_uri": "${process.env.GOOGLE_STORAGE_AUTH_URI}",
    "token_uri": "${process.env.GOOGLE_STORAGE_TOKEN_URI}",
    "auth_provider_x509_cert_url": "${process.env.GOOGLE_STORAGE_AUTH_PROVIDER_X509_CERT_URL}",
    "client_x509_cert_url": "${process.env.GOOGLE_STORAGE_CLIENT_X509_CERT_URL}"
}`;
console.log("This is what the Google Storage Key looks like\n" + googleStorageKey);

googleStorageKey = JSON.parse(googleStorageKey);
googleStorageKey = JSON.stringify(googleStorageKey);

fs.writeFile("./src/datasources/google/auth.json", googleStorageKey, "utf-8", err => {
    if (err) { return console.log(err); } return console.log("Key File has been created successfully");
});

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
