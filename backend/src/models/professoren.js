import mongoose, { Schema } from 'mongoose';

let professorenSchema = new Schema({
  id: Number,
  name: String,
  buero: String,
  telefonnummer: String,
  email: String,
  fach: String,
  sprechzeiten: String,
  notizen: String
})

export default mongoose.model('professoren', professorenSchema);
