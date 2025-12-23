import 'dotenv/config';
import express from 'express';
import logger from './logger.js';
import { checkDB } from './database/connection.js';

const app = express();

app.use(express.json());

// health check
app.get('/health', async (req, res) => {
  try {
    await checkDB();
    return res.status(200).json({
      status: 'ok',
      message: 'db connected',
      uptime: process.uptime(),
    });
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'db disconnected',
    });
  }
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  logger.info(`server running at ${PORT}`);
});
