const config = {
  PORT: 5000,
  DB_URI: 'mongodb://zoukman:qwerty123@cluster0-shard-00-00.9uqe0.mongodb.net:27017,cluster0-shard-00-01.9uqe0.mongodb.net:27017,cluster0-shard-00-02.9uqe0.mongodb.net:27017/db?ssl=true&replicaSet=atlas-9bd96i-shard-0&authSource=admin&retryWrites=true&w=majority',
  LOG_LEVEL: 'info',
  ACCESS_SECRET_KEY: 'my-access-secret-key',
  REFRESH_SECRET_KEY: 'my-refresh-secret-key',
  SALT_WORK_FACTOR: 10,
  ACCESS_TOKEN_TTL: '15m',
  REFRESH_TOKEN_TTL: '12h',
};

export default config;