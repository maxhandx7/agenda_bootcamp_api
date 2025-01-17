require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', contactRoutes);
app.use('/api', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// iniciar el servidor
sequelize.sync({ force: true }).then(() => {
  console.log('Tablas sincronizadas');
  app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
  });
}).catch((err) => {
  console.error('Error al sincronizar las tablas:', err);
});
