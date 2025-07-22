const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y password requeridos" });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });
    // No es admin, solo acceso simple
    res.json({ message: "Login exitoso", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Error en login" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, createdAt: true } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

module.exports = { loginUser, getUsers };