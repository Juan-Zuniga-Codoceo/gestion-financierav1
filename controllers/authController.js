const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const profileImage = req.files ? req.files.profileImage.name : null;

  try {
    // Verificar si el correo ya existe
    console.log('Verificando correo:', email);
    const existingUser = await userModel.findUserByEmail(email);
    console.log('Verificación de correo:', existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ name, email, password: hashedPassword, profileImage });
    console.log('Usuario creado:', user);
    res.status(201).json({ message: 'Usuario registrado exitosamente. Por favor, inicie sesión.' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = {
  register,
  login,
};
