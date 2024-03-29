const fs = require('fs');
const path = require('path');
const analyticsFilePath = path.join(__dirname, '..', 'analytics', 'analytics.json');
const logger = require('../utility/logger.util')
// Ensure the analytics data file exists
const initializeAnalyticsData = () => {
  if (!fs.existsSync(analyticsFilePath)) {
    fs.writeFileSync(analyticsFilePath, JSON.stringify([]));
  }
};
initializeAnalyticsData();

const logRequest = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    const logEntry = { method, originalUrl, statusCode, duration };

    // Read the current analytics data and append the new entry
    const data = JSON.parse(fs.readFileSync(analyticsFilePath));
    data.push(logEntry);
    fs.writeFileSync(analyticsFilePath, JSON.stringify(data));

    logger.info(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = logRequest;
