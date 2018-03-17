import mongoose, { Schema } from 'mongoose';

let notesSchema = new Schema({
  id: Number,
  name: String,
  info: String,
  img: { data: Buffer, contentType: String },
})

export default mongoose.model('notes', notesSchema);
