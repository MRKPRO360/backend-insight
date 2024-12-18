import cors from 'cors';
import express, { Application } from 'express';
import router from './app/routes';
import notFound from './app/middlewares/not-found';

const app: Application = express();

// BODY PARSER
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

// APPLICATION ROUTERS
app.use('/api', router);

// GENERIC RESPONSE
app.use('/', (req, res) => {
  res.send('HELLO WORLD 👋');
});

//NOT-FOUND
app.use(notFound);

export default app;
