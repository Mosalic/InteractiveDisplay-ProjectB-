import mongoose, { Schema } from 'mongoose';

let stundenplanSchema = new Schema({
  id: Number,
  studiengang: String,
  zeiten: [{
    semester: String,
    montag: {},
    dienstag: {},
    mittwoch: {},
    donnerstag: {},
    freitag: {}
  }]
})

export default mongoose.model('stundenplan', stundenplanSchema);
