const mongoose = require('mongoose');
const Schema = mongoose.Schema;

Schema.Types.String.set('trim', true);

const DistroSchema = new Schema({
  name: { type: String, required: true },
  nameLowerCase: {
    type: String,
    select: false,
    default: function() {
      return this.name.toLowerCase();
    }
  },
  description: { type: String },
  baseList: [{ type: Schema.Types.ObjectId, ref: 'Distro' }],
  origin: { type: String },
  architectureList: [{ type: String }],
  environmentList: [{ type: Schema.Types.ObjectId, ref: 'Environment' }],
  status: { type: String, enum: ['active', 'inactive'] },
  visits: { type: Number },
  url: {
    homepage: { type: String },
    download: { type: String },
    logo: { type: String }
  }
})

module.exports = mongoose.models.Distro || mongoose.model('Distro', DistroSchema);