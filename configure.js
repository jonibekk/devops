const mongoose = require("mongoose");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const redis = require("redis");

const userRoutes = require('./routes/userRoutes');
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require('./config/config');

exports.getAppPort = () => process.env.APP_PORT || 5000;

exports.configureMongoDb = () => {

  const mongoUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

  mongoose.connect(mongoUrl)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((e) => {
    console.log(e);
    setTimeout(configureMongoDb, 5000);
  });
}

exports.configureRedis = (app) => {
  let redisClient = redis.createClient({
    legacyMode: true,
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
  });
  redisClient.connect()
    .then(console.info('Successfully connected to RedisDB.'))
    .catch(console.error);

  app.use(
    session({
      name: 'sessionID',
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 30000
      }
    })
  )
}

exports.configureRoutes = (app) => {
  app.use('/api/v1/user', userRoutes);
}