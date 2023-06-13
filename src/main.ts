import App from './app';
import CustomersController from './controllers/Customers';
import db from './database';
import { CustomersRepository } from './database/repositories/Customers';
import { CustomersService } from './services/Customers';

const main = async () => {
	const customersRepository = new CustomersRepository(db);
	const customersService = new CustomersService(customersRepository);
	const customersController = new CustomersController(customersService);

	const controllers = [customersController];
	const app = new App(4321, controllers);

	app.start();
};
main();
