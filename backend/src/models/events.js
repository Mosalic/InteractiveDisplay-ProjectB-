import mongoose, { Schema } from 'mongoose';

let eventsSchema = new Schema({
  id: Number,
  name: String,
  startDate: Date,
  startTime: String,
  endDate: Date,
  endTime: String,
  information: String,
  place: String,
  img: { data: Buffer, contentType: String },
})

export default mongoose.model('events', eventsSchema);
