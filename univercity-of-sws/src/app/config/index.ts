import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  NODE_ENV: process.env.NODE_ENV,
};