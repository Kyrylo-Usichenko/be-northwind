import { CustomerController } from '@/controllers/customers';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { Router } from 'express';

export class Customers {
	router: Router;
	path: string;
	controller: CustomerController;

	constructor(path: string, sqlite: BetterSQLite3Database) {
		(this.router = Router()), (this.path = path);
		this.controller = new CustomerController(sqlite);
		this.router.get('/', this.controller.getCustomers);
		// this.router.get('/:id', this.controller.getCustomer);
	}
}
