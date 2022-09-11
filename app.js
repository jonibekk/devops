const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configure = require('./configure');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

// Connect to MongoDB
configure.configureMongoDb();

// Configure Redis: E.g. session data.
configure.configureRedis(app);

// Api routes
configure.configureRoutes(app);

// App is listening to $PORT.
app.listen(configure.getAppPort(), () => {
  console.log(`App is listening to post on: ${configure.getAppPort()}`);
});
