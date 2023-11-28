import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// * pre save meddleware/ hook : will work on careate() or save()

userSchema.pre('save', async function (next) {
  const password = this.password;
  const saltRounds = Number(config.bcrypt_salt_rounds);

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;
  next();
});

// set empty string
userSchema.post('save', function (data, next) {
  data.password = '';

  next();
});

const User = model<TUser>('User', userSchema);

export default User;
