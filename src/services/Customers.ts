import { CustomersRepository } from '@/database/repositories/Customers';

export class CustomersService {
	constructor(private customers: CustomersRepository) {}
	public getAll = (start: number, count: number) => {
		const customers = this.customers.getAll(start, count);
		return customers;
	};
	public getOne = (id: string) => {
		const customer = this.customers.getOne(id);
		return customer;
	};
}
