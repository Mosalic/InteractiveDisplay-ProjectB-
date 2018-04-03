import mongoose, { Schema } from 'mongoose';

let stundenplanSchema = new Schema({
  id: Number,
  studiengang: String,
  timetable: {},
  semester: [],
},  { minimize: false })

export default mongoose.model('stundenplan', stundenplanSchema);
