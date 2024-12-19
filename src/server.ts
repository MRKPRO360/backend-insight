/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const connectionString = config.db_url
  ?.replace('<DB_USERNAME>', config.db_username as string)
  .replace('<DB_PASSWORD>', config.db_password as string);

const port = config.port;
// console.log(connectionString);

async function main() {
  try {
    await mongoose.connect(connectionString as string, { autoIndex: true });
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (err: any) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

main();
