const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

const Family = mongoose.model('Family', familySchema);
module.exports = Family;
