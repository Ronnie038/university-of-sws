import express, { NextFunction, Request, Response } from 'express';

const app = express();

// parser

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.url, req.method, req.hostname);
	next();
};

// if we send text from client then we need express.text() method
app.use(express.text());

app.get('/', logger, (req: Request, res: Response) => {
	res.send('hello from behind');
});

export default app;
