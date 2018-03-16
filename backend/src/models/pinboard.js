import mongoose, { Schema } from 'mongoose';

let pinboardSchema = new Schema({
  id: Number,
  name: String,
  info: String,
  img: { data: Buffer, contentType: String },
})

export default mongoose.model('pinboard', pinboardSchema);
