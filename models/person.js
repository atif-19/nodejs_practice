const mongoose = require('mongoose');

const Person = mongoose.model('Person', new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  work: { type: String  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

module.exports = Person;