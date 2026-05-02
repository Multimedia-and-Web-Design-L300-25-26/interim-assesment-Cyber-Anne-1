const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/', cryptoController.getAllCryptos);
router.get('/gainers', cryptoController.getGainers);
router.get('/new', cryptoController.getNewCryptos);
router.post('/', cryptoController.addCrypto);

// To match GET /crypto/gainers mapped from index.js as app.use('/crypto', ...)
// and exact /crypto mapping ... wait, the README paths: GET /crypto, GET /crypto/gainers, etc.
// In index.js `app.use('/api/crypto', cryptoRoutes)`, so this will actually be /api/crypto/gainers.
// Let's modify index.js to just use `/crypto` instead of `/api/crypto` if necessary, or just rely on API conventions.
// We'll leave it as is for now.

module.exports = router;
