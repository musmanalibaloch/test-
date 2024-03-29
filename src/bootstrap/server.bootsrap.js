require('dotenv').config()
const express = require('express');
const loadModels = require('../config/mongo.config');
const logger = require('../utility/logger.util');
const loadRoutes = require('./routes.bootstrap')
const analyticsMiddleware = require('../middleware/analytics.middleware');
const errorMiddleware = require('../middleware/error.middleware');
const dbConnect = require('../bootstrap/mongodb.bootrap');


const app = express();


// Middleware
app.use(express.json()); // For parsing application/json
app.use(analyticsMiddleware)


loadRoutes(app,'/v1')

app.use(errorMiddleware);

const startServer = async () => {
  await dbConnect(); //connect db
  await loadModels(); // sync models
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => logger.success(`Server started on port ${PORT}`));
};

module.exports = startServer;
