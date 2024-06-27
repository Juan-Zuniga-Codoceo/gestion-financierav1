const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res) => {
  const { id, name, password, profileImage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.updateUser({ id, name, password: hashedPassword, profileImage });
  res.status(200).send('Perfil actualizado exitosamente');
};

module.exports = {
  updateProfile,
};
