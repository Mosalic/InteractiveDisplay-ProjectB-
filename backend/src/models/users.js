import mongoose, { Schema } from 'mongoose';

let userSchema = new Schema({
  username: String,
  password: String,
  role: Number,
})

export default mongoose.model('user', userSchema);
