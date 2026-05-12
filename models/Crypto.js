const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  change24h: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
    }
  },
  toObject: { virtuals: true }
});

cryptoSchema.virtual('24h Change').get(function() {
  return this.change24h;
});

module.exports = mongoose.model('Crypto', cryptoSchema);
