const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createReservation = async (req, res) => {
  const { nombre, correo, telefono, entrada, salida, comentarios } = req.body;
  if (!nombre || !correo || !entrada || !salida) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  try {
    const reservation = await prisma.reservation.create({
      data: {
        nombre,
        correo,
        telefono,
        entrada: new Date(entrada),
        salida: new Date(salida),
        comentarios,
      }
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

module.exports = { createReservation, getReservations };