import App from './app';
import CustomersController from './controllers/customers';
import OrdersController from './controllers/orders';
import ProductsController from './controllers/products';
import db from './database';
import { CustomersRepository } from './database/repositories/customers';
import OrdersRepository from './database/repositories/orders';
import { ProductsRepository } from './database/repositories/products';
import CustomersService from './services/customers';
import { OrdersService } from './services/orders';
import { ProductsService } from './services/products';

const main = async () => {
	const customersRepository = new CustomersRepository(db);
	const customersService = new CustomersService(customersRepository);
	const customersController = new CustomersController(customersService);

	const productsRepository = new ProductsRepository(db);
	const productsService = new ProductsService(productsRepository);
	const productsController = new ProductsController(productsService);

	const ordersRepository = new OrdersRepository(db);
	const ordersService = new OrdersService(ordersRepository);
	const ordersController = new OrdersController(ordersService);

	const controllers = [
		customersController,
		productsController,
		ordersController,
	];
	const app = new App(4321, controllers);

	app.start();
};
main();
