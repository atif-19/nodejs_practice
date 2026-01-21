const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  work: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// ✅ hashing the password
// we should not use arrow function here to access 'this'
// we should not use next parameter here as we are using async/await

// we should perform all middleware operations before model is saved
personSchema.pre('save', async function () {
  console.log("Pre-save hook triggered for user:", this.username);
  if (!this.isModified('password')) return;

  try {
    // adding salt and hashing password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.error("Error hashing password for user:", this.username, err);
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
