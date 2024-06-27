const pool = require('../config/db');

const createUser = async ({ name, email, password, profileImage }) => {
  console.log('Creando usuario:', email);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, password, profileImage]
  );
  console.log('Resultado de creación de usuario:', result.rows[0]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  console.log('Buscando usuario por correo:', email);
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  console.log('Resultado de búsqueda de usuario:', result.rows[0]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
