require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Si es admin
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, role: "admin" });
  }

  // Si es usuario normal
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Si no existe, lo crea
    const hashed = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: { email, password: hashed }
    });
  } else {
    // Si existe, verifica la contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });
  }
  // Acceso simple para usuario normal
  return res.json({ message: "Login exitoso", role: "user" });
});

module.exports = router;