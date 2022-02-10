// Read all .env* files in the root folder and add them to process.env
// See https://github.com/kerimdzhanov/dotenv-flow for more details
require('dotenv-flow').config();

module.exports = {
  HOME_URL: process.env.SEMAPPS_HOME_URL,
  JSON_CONTEXT: process.env.SEMAPPS_JSON_CONTEXT,
  FRONT_NAME: process.env.SEMAPPS_FRONT_NAME,
  FRONT_URL: process.env.SEMAPPS_FRONT_URL,
  SPARQL_ENDPOINT: process.env.SEMAPPS_SPARQL_ENDPOINT,
  JENA_USER: process.env.SEMAPPS_JENA_USER,
  JENA_PASSWORD: process.env.SEMAPPS_JENA_PASSWORD,
  REDIS_CACHE_URL: process.env.SEMAPPS_REDIS_CACHE_URL,
  QUEUE_SERVICE_URL: process.env.SEMAPPS_QUEUE_SERVICE_URL,
  FROM_EMAIL: process.env.SEMAPPS_FROM_EMAIL,
  FROM_NAME: process.env.SEMAPPS_FROM_NAME,
  SMTP_HOST: process.env.SEMAPPS_SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SEMAPPS_SMTP_PORT, 10),
  SMTP_SECURE: process.env.SEMAPPS_SMTP_SECURE === 'true',
  SMTP_USER: process.env.SEMAPPS_SMTP_USER,
  SMTP_PASS: process.env.SEMAPPS_SMTP_PASS,
  BACKUP_SERVER_PATH: process.env.SEMAPPS_BACKUP_SERVER_PATH,
  BACKUP_FUSEKI_DATASETS_PATH: process.env.SEMAPPS_BACKUP_FUSEKI_DATASETS_PATH,
  SENTRY_DSN: process.env.SEMAPPS_SENTRY_DSN,
  SENTRY_ENVIRONMENT: process.env.SEMAPPS_SENTRY_ENVIRONMENT,
  AUTH_RESERVED_USER_NAMES: process.env.SEMAPPS_AUTH_RESERVED_USER_NAMES.split(',')
};
