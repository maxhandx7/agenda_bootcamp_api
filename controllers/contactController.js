const Contact = require('../models/contactModel');
const User = require('../models/userModel');

// Obtener todos los contactos
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
};

// Crear un nuevo contacto
exports.createContact = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Id es requerido' });
    }
    const photo = req.file ? req.file.path : null;
    const newContact = await Contact.create({
      name,
      phone,
      photo,
      userId,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contacto' });
  }
};

exports.getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'No se encuentra el contacto o no pertenece a este usuario' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al encontrar el contacto' });
  }
};



exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  try {
    const contact = await Contact.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (contact) {
      contact.name = name;
      contact.phone = phone;
      await contact.save();
      res.json({ message: 'Contacto actualizado', contact });
    } else {
      res.status(404).json({ error: 'No se encontró el contacto o no pertenece a este usuario' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el contacto' });
  }
};


exports.destroyContacts = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (contact) {
      await contact.destroy();
      res.json({ message: 'Contacto eliminado' });
    } else {
      res.status(404).json({ error: 'No se encontró el contacto o no pertenece a este usuario' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el contacto' });
  }
};

