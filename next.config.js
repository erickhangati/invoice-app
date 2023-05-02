const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DOMAIN: 'http://localhost:3000',
        MONGODB_USERNAME: 'ekhangati',
        MONGODB_PASSWORD: 'SMxHvXzaZ5hAQzYl',
        MONGODB_CLUSTER: 'test-field',
        MONGODB_DATABASE: 'invoice-app-dev',
      },
    };
  }

  return {
    env: {
      DOMAIN: 'https://eric-invoice-app.vercel.app',
      MONGODB_USERNAME: 'ekhangati',
      MONGODB_PASSWORD: 'SMxHvXzaZ5hAQzYl',
      MONGODB_CLUSTER: 'test-field',
      MONGODB_DATABASE: 'invoice-app-dev',
    },
  };
};
