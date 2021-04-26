const { env, logger } = require('./config');
const app = require('./app');

const PORT = env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
