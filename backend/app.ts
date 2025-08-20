require('dotenv').config();
import express, { Express} from 'express';
import cors from 'cors';
import router from './src/routes';
import { notFound } from './src/errors/errors';
import rateLimit from './src/utils/rateLimit';
import dbConnect from './src/config/dbConnect';

const { PORT = 3000 } = process.env;


const app: Express = express();
app.use(rateLimit);
app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  next(notFound('Page not found'));
});
    app.listen(PORT, () => {
      console.log(`connected! on port ${PORT}`);
    });

dbConnect();



