const pool = require('../config/db');

const createBudget = async (budget) => {
  const { userId, budgetAmount, extraIncome } = budget;
  const query = 'INSERT INTO budgets (user_id, budget_amount, extra_income) VALUES ($1, $2, $3)';
  await pool.query(query, [userId, budgetAmount, extraIncome]);
};

const addExpense = async (expense) => {
  const { budgetId, name, type, amount, expenseDate, comment } = expense;
  const query = 'INSERT INTO expenses (budget_id, name, type, amount, expense_date, comment) VALUES ($1, $2, $3, $4, $5, $6)';
  await pool.query(query, [budgetId, name, type, amount, expenseDate, comment]);
};

const getBudgetsByUserId = async (userId) => {
  const query = 'SELECT * FROM budgets WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = {
  createBudget,
  addExpense,
  getBudgetsByUserId,
};
