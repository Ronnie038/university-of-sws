import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to database');
    app.listen(config.port, () => {
      console.log(`Server running on port`, config.port);
    });
  } catch (error) {
    console.log('connection faild');
  }
}

main();
