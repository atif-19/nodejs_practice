const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, enum: ['appetizer', 'main_course', 'dessert', 'beverage'], required: true },
    is_drink: { type: Boolean, default: false },
    is_tasty: { type: Boolean, default: true }

});
module.exports = mongoose.model('MenuItem', menuItemSchema);