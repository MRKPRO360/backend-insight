/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

const connectionString = config.db_url
  ?.replace('<DB_USERNAME>', config.db_username as string)
  .replace('<DB_PASSWORD>', config.db_password as string);

const port = config.port;

let server: Server;

async function connectToDB() {
  try {
    await mongoose.connect(connectionString as string, { autoIndex: true });
    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

connectToDB();

process.on('unhandledRejection', () => {
  console.log('💥😥 Unhandled rejection, server is shutting down...');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.log(
    '💥😥 Uncaught exception, server is shutting down...',
    err.message,
  );
  process.exit(1);
});
