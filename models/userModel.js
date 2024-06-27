const pool = require('../config/db');

const createUser = async ({ name, email, password, profileImage }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, profileImage]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
