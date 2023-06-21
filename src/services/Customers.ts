import { CustomersRepository } from '@/database/repositories/Customers';

export class CustomersService {
	constructor(private customers: CustomersRepository) {}
	public getAll = (start: number, count: number) => {
		const startTimestamp = Date.now();
		const customers = this.customers.getAll(start, count);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.customers.getAllQuery(start, count);
		query.params.forEach((param: any) => {
			query.sql = query.sql.replace('?', param);
		});
		query.sql = query.sql.replace('\\', ' ');
		return {
			sql: query.sql,
			customers,
			time,
		};
	};
	public getOne = (id: string) => {
		const startTimestamp = Date.now();
		const customer = this.customers.getOne(id);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.customers.getOneQuery(id);
		query.params.forEach((param: any) => {
			query.sql = query.sql.replace('?', param);
		});
		query.sql = query.sql.replace('\\', ' ');

		return { customer, time, sql: query.sql };
	};
}
