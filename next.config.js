const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        domain: 'http://localhost:3000',
        mongodb_username: 'ekhangati',
        mongodb_password: 'SMxHvXzaZ5hAQzYl',
        mongodb_cluster: 'test-field',
        mongodb_database: 'invoice-app-dev',
      },
    };
  }

  return {
    env: {
      domain: 'https://eric-invoice-app.vercel.app',
      mongodb_username: 'ekhangati',
      mongodb_password: 'SMxHvXzaZ5hAQzYl',
      mongodb_cluster: 'test-field',
      mongodb_database: 'invoice-app-dev',
    },
  };
};
