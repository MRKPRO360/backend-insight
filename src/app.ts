import cors from 'cors';
import express, { Application } from 'express';
import notFound from './app/middlewares/not-found';
import router from './app/routes';
import globalErrHandler from './app/middlewares/globalErrHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

// BODY PARSER
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));
app.use(cookieParser());

// APPLICATION ROUTERS
app.use('/api', router);

// GENERIC RESPONSE
app.get('/', (req, res) => {
  res.send('HELLO WORLD 👋');
});

// GLOBAL ERR HANDLER
app.use(globalErrHandler);

//NOT-FOUND
app.use(notFound);

export default app;
