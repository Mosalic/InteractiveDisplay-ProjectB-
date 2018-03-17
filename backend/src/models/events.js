import mongoose, { Schema } from 'mongoose';

let eventsSchema = new Schema({
  id: Number,
  name: String,
  date: Date,
  time: String,
  information: String,
  place: String,
  img: { data: Buffer, contentType: String }, 
})

export default mongoose.model('events', eventsSchema);
