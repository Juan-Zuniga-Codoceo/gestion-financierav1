const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => res.render('profile', { title: 'Perfil' }));
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;
