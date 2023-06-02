import Database from 'better-sqlite3';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import exress from 'express';
import { Customers } from './routers/customers';
const app = exress();
const port = 4321;
const sqlite = new Database('./src/main.db');
const db = drizzle(sqlite);
app.use(cors());

const pageRoutes = [
	{
		router: new Customers('/customers', db),
	},
];

pageRoutes.forEach((route) => {
	const { path, router } = route.router;
	app.use(path, router);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
