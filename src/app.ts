import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(router);

// Importar e usar suas rotas aqui
// app.use('/api', yourRoutes);

export default app;
