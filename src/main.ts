import App from './app';
import EmployeesController from './controllers/Employees';
import SearchController from './controllers/Search';
import SuppliersController from './controllers/Suppliers';
import CustomersController from './controllers/customers';
import OrdersController from './controllers/orders';
import ProductsController from './controllers/products';
import db from './database';
import { EmployeesRepository } from './database/repositories/Employees';
import { SuppliersRepository } from './database/repositories/Suppliers';
import { CustomersRepository } from './database/repositories/customers';
import OrdersRepository from './database/repositories/orders';
import { ProductsRepository } from './database/repositories/products';
import { EmployeesService } from './services/Employees';
import { SearchService } from './services/Search';
import { SuppliersService } from './services/Suppliers';
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

	const suppliersRepository = new SuppliersRepository(db);
	const suppliersService = new SuppliersService(suppliersRepository);
	const suppliersController = new SuppliersController(suppliersService);

	const employeesRepository = new EmployeesRepository(db);
	const employeesService = new EmployeesService(employeesRepository);
	const employeesController = new EmployeesController(employeesService);

	const searchService = new SearchService(
		customersRepository,
		productsRepository
	);
	const searchController = new SearchController(searchService);

	const controllers = [
		customersController,
		productsController,
		ordersController,
		suppliersController,
		employeesController,
		searchController,
	];
	const app = new App(4321, controllers);

	app.start();
};
main();
