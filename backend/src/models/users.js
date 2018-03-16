import mongoose, { Schema } from 'mongoose';

let userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: Number,
  id: Number,
})

export default mongoose.model('user', userSchema);
