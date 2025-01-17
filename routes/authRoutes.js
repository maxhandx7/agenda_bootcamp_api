const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/user', authenticateToken, (req, res) => {
    res.json({ user: req.user }); 
});

// Rutas del login
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);



module.exports = router;
