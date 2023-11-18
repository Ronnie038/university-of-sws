import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoute } from './app/modules/student/student.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/students', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello from behind');
});

export default app;
