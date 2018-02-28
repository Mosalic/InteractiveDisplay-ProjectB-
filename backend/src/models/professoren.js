import mongoose, { Schema } from 'mongoose';

let professorenSchema = new Schema({
  id: Number,
  name: String,
  buero: String,
  img: { data: Buffer, contentType: String },
  telefonnummer: String,
  email: String,
  funktion: String,
  sprechzeiten: String,
  notizen: String,
})

export default mongoose.model('professoren', professorenSchema);
