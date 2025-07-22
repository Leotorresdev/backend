const express = require('express');
const router = express.Router();
const { createReservation, getReservations } = require('../controllers/reservationControllers');

router.post('/', createReservation);
router.get('/', getReservations);

module.exports = router;