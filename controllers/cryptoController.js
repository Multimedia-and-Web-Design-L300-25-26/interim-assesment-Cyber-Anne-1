const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });
    res.json(gainers);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.getNewCryptos = async (req, res) => {
  try {
    const newCryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json(newCryptos);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    const change24hValue = change24h !== undefined ? change24h : req.body['24h Change'];

    if (!name || !symbol || price === undefined) {
      return res.status(400).json({ message: 'Please provide name, symbol and price fields.' });
    }

    const crypto = new Crypto({
      name,
      symbol,
      price,
      image,
      change24h: change24hValue
    });

    await crypto.save();
    res.status(201).json({ message: 'Cryptocurrency added successfully.', crypto });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
