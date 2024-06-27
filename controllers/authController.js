const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password, profileImage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.createUser({ name, email, password: hashedPassword, profileImage });
  res.status(201).send('Usuario registrado exitosamente');
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findUserByEmail(email);
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Email o contraseña incorrectos');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};

module.exports = {
  register,
  login,
};
