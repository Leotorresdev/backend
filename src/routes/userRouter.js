const express = require('express');
const router = express.Router();
const { loginUser, getUsers } = require('../controllers/userControllers');
const { authenticateAdmin } = require('../middleware/auth');


router.post('/login', loginUser);

// Solo el admin puede ver la lista de usuarios
router.get('/all', authenticateAdmin, getUsers);

module.exports = router;