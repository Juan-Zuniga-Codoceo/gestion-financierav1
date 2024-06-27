const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const { create } = require('express-handlebars');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

dotenv.config();

const app = express();

// Configurar Handlebars
const hbs = create({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Definir la ruta para la página principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Gestión Financiera' });
});

// Configurar las rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/budget', budgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥Server on 🔥 http://localhost:${PORT}`);
});
