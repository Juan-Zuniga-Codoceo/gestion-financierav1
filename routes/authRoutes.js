const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', (req, res) => res.render('login', { title: 'Login' }));
router.get('/register', (req, res) => res.render('register', { title: 'Registro' }));
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
