const express = require('express');
const cors = require('cors');
const roomsRoutes = require('./src/routes/rooms');
const authRoutes = require('./src/routes/authRouter');
const userRoutes = require('./src/routes/userRouter');
const reservationRoutes = require('./src/routes/reservationRouter');

const app = express();

// ✅ CORS configurado para desarrollo y producción
const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-git-main-leodevtorres-gmailcoms-projects.vercel.app',
  'https://frontend-kohl-beta-85.vercel.app' // Puedes usar este si le das dominio final
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como Postman) o si el origen está permitido
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS no permitido para este origen'));
  },
  credentials: true,
}));

app.use(express.json());

// 🔗 Rutas
app.use('/rooms', roomsRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
