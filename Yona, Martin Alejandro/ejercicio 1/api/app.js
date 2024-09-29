import express from 'express';
import cors from 'cors';
import { sumasRoute } from './sumas.js';
import { divisionesRoute } from './divisiones.js';
import { restasRoute } from './restas.js';
import { multiplicacionesRoute } from './multiplicaciones.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
const routes = [
  { path: '/sumas', handler: sumasRoute },
  { path: '/divisiones', handler: divisionesRoute },
  { path: '/restas', handler: restasRoute },
  { path: '/multiplicaciones', handler: multiplicacionesRoute }
];

routes.forEach(route => app.use(route.path, route.handler));

// Ruta principal
app.get('/', (req, res) => res.send('¡Hola, mundo!'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

