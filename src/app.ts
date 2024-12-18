import cors from 'cors';

import express, { Application } from 'express';

const app: Application = express();

// BODY PARSER
app.use(express.json());
app.use(cors());

app.use('/', (req, res) => {
  res.send('HELLO WORLD 👋');
});

export default app;
