const mongoose = require('mongoose');

const facilitiesSchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  description: { type: String, },
  image: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  // image: { type: String, required: true },
  // created_at: { type: Date, default: Date.now },
  // created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
  // is_active: { type: Boolean, default: true },
  // updated_at: { type: Date },
  // updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Facilities = mongoose.model('Facilities', facilitiesSchema);

module.exports.Facilities = Facilities;
