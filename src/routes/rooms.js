const express = require('express');
const router = express.Router();
const {
    getRooms,
    createRoom,
    deleteRoom
} = require('../controllers/roomsControllers');
const { authenticateAdmin } = require('../middleware/auth');

// Rutas para las habitaciones
router.get('/', getRooms);
router.post('/', authenticateAdmin, createRoom);
router.delete('/:id', authenticateAdmin, deleteRoom);

module.exports = router;