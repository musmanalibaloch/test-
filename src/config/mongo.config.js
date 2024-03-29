const fs = require('fs');
const path = require('path');
const logger = require('../utility/logger.util');

const loadModels = () => {
  const modelsPath = path.join(__dirname, '..', './models');
  logger.info('LOADING:::MODELS',modelsPath)
  fs.readdirSync(modelsPath).forEach((file) => {
    logger.success(`MODEL::${file}`)
    require(path.join(modelsPath, file));
  });
};

module.exports = loadModels;
