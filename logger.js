import pino from 'pino';

const logger = pino({
  transport:
    process.env.APP_ENV === 'development'
      ? { target: 'pino-pretty' }
      : undefined,
});

export default logger;
