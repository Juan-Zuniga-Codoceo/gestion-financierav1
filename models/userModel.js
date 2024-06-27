const pool = require('../config/db');

const createUser = async (user) => {
  const { name, email, password, profileImage } = user;
  const query = 'INSERT INTO users (name, email, password, profile_image) VALUES ($1, $2, $3, $4)';
  await pool.query(query, [name, email, password, profileImage]);
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const updateUser = async (user) => {
  const { id, name, password, profileImage } = user;
  const query = 'UPDATE users SET name = $1, password = $2, profile_image = $3 WHERE id = $4';
  await pool.query(query, [name, password, profileImage, id]);
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
};
