const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Environment = require('./Environment');

const UrlSchema = new Schema({
  homepage: { type: String },
  download: { type: String }
})

const DistroSchema = new Schema({
  name: { type: String, required: true },
  descriptiion: { type: String },
  baseList: [{ type: Schema.Types.ObjectId, ref: 'Distro' }],
  origin: { type: String },
  architecture: [{ type: String }],
  environment: [{ type: Schema.Types.ObjectId, ref: 'Environment' }],
  status: { type: String, enum: ['active', 'inactive'] },
  visits: { type: Number },
  url: [{ UrlSchema }]
})

module.exports = mongoose.models.Distro || mongoose.model('Distro', DistroSchema);