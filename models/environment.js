const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnvironmentSchema = new Schema({
  name: { type: String, required: true }
})

module.exports = mongoose.models.Environment || mongoose.model('Environment', EnvironmentSchema);