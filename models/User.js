const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  permissions: {
    viewServerIPAllowList: {
      permissionLevel: { type: String, default: "DENIED" },
      message: { type: String, default: "" }
    }
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.password;
      delete ret._id;
    }
  },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('User', userSchema);
