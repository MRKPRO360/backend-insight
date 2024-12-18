import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const connectionString = config.db_url
  ?.replace('<DB_USERNAME>', config.db_username as string)
  .replace('<DB_PASSWORD>', config.db_password as string);

console.log(connectionString);

const port = config.port;
// console.log(connectionString);

async function main() {
  try {
    await mongoose.connect(connectionString as string);
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
