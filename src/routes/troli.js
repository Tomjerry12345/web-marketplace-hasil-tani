const express = require('express');

const router = express.Router();

const troliControllers = require('../controllers/troli');

router.post('/createTroli', troliControllers.createTroli);

router.post('/getTroli', troliControllers.getTroli);

// router.put('/:produkId',produkControllers.updateProduk);

router.delete('/delete/:troliId', troliControllers.deleteTroli);

module.exports = router;