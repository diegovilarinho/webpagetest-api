'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/wpt-controller');

router.post('/tests', controller.runTest);
router.get('/tests/:testId/status', controller.checkTestStatusById);
router.get('/tests/:testId/results', controller.getTestResultsById);

module.exports = router;