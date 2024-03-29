const fs = require('fs');
const path = require('path');

const loadRoutes = (app, prefix = '') => {
  const routesPath = path.join(__dirname, '..', 'routes');
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const route = require(path.join(routesPath, file));
      const routePath = `/${file.replace('.route.js', '')}`;
      app.use(routePath, route); // Prepend prefix
      console.log(`Route loaded: ${routePath}`);
    }
  });
};

module.exports = loadRoutes;
