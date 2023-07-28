const express = require('express');
const router = express.Router();
const OwnerController = require('../../adapters/http/controllers/OwnerController');

router.post('/owner', OwnerController().createOwner)

module.exports = router;