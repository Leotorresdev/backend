const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRooms = async (req, res) => {
   const rooms = await prisma.room.findMany();
  res.json(rooms);
}

const createRoom = async (req, res) => {
    const { name, type, price, image } = req.body;
    try {
        const newRoom = await prisma.room.create({
            data: {
                name,
                type,
                price,
                image
            }
        });
        res.status(201).json(newRoom);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Error creating room' });
    }
}
const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.room.delete({ where: { id: Number(id) } });
        res.json({ message: 'habitacion eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting room' });
    }
}

module.exports = {
    getRooms,
    createRoom,
    deleteRoom
};