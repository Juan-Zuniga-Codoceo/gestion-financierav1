const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

// Configurar las rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/budget', budgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥Server on 🔥 http://localhost:${PORT}`);
  });
