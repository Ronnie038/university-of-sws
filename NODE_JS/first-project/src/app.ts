import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFount';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello from behind');
});

app.use(globalErrorHandler);

// Not found
app.use(notFound);
export default app;
