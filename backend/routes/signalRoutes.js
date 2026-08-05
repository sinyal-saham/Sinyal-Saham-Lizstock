const express = require('express');
const router = express.Router();
const signalController = require('../controllers/signalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', signalController.getAllSignals);
router.post('/', authMiddleware, signalController.createSignal);
router.put('/:id', authMiddleware, signalController.updateSignal);
router.delete('/:id', authMiddleware, signalController.deleteSignal);

module.exports = router;
