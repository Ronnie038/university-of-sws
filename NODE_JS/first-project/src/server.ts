import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to database');
    server = app.listen(config.port, () => {
      console.log(`Server running on port`, config.port);
    });
  } catch (error) {
    console.log('connection faild');
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😡 unhandledRejection is detected, shuttin down....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😡 uncaughtException is detected, shuttin down....`);
  process.exit(1);
});
