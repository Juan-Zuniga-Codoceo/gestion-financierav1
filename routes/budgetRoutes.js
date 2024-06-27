const express = require('express');
const budgetController = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => res.render('budget'));
router.post('/', authMiddleware, budgetController.createBudget);
router.post('/expense', authMiddleware, budgetController.addExpense);
router.get('/:userId', authMiddleware, budgetController.getBudgets);

module.exports = router;
