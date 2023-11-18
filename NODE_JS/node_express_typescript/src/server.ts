import { Server } from 'http';
import app from './app';

const port = 5000 || process.env.PORT;

let server: Server;

async function bootsTrap() {
	server = app.listen(port, () => {
		console.log(`Server running on ${port}`);
	});
}

bootsTrap();
