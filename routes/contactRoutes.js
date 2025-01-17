const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Rutas para los contactos
router.get('/contacts', authenticateToken, contactController.getContacts);                // Obtener todos los contactos del usuario autenticado
router.post('/contacts', authenticateToken, upload.single('photo'), contactController.createContact);             // Crear un nuevo contacto
router.get('/contacts/:id', authenticateToken, contactController.getContact);             // Obtener un contacto por ID
router.put('/contacts/:id', authenticateToken, contactController.updateContact);          // Actualizar un contacto por ID
router.delete('/contacts/:id', authenticateToken, contactController.destroyContacts);     // Eliminar un contacto por ID

module.exports = router;
