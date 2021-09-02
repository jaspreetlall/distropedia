const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnvironmentSchema = new Schema({
  name: { type: String, required: true },
  nameLowerCase: {
    type: String,
    select: false,
    default: function() {
      return this.name.toLowerCase();
    }
  }
})

module.exports = mongoose.models.Environment || mongoose.model('Environment', EnvironmentSchema);