const budgetModel = require('../models/budgetModel');

const createBudget = async (req, res) => {
  const { userId, budgetAmount, extraIncome } = req.body;
  await budgetModel.createBudget({ userId, budgetAmount, extraIncome });
  res.status(201).send('Presupuesto creado exitosamente');
};

const addExpense = async (req, res) => {
  const { budgetId, name, type, amount, expenseDate, comment } = req.body;
  await budgetModel.addExpense({ budgetId, name, type, amount, expenseDate, comment });
  res.status(201).send('Gasto agregado exitosamente');
};

const getBudgets = async (req, res) => {
  const { userId } = req.params;
  const budgets = await budgetModel.getBudgetsByUserId(userId);
  res.status(200).json(budgets);
};

module.exports = {
  createBudget,
  addExpense,
  getBudgets,
};
