import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';


dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://strayhome-server.onrender.com/, https://strayhome-client.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.use(express.json());
app.use(router);

export default app;
