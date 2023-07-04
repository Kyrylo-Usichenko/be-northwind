import { eq, like, sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { customersTable } from '../schemas/customers';

export class CustomersRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const customers = this.db
			.select()
			.from(customersTable)
			.limit(count)
			.offset(start)
			.all();
		return {
			customers,
		};
	};
	public getAllQuery = (start: number, count: number) => {
		const customersQuery = this.db
			.select()
			.from(customersTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return customersQuery;
	};
	public getOne = (id: string) => {
		const customer = this.db
			.select()
			.from(customersTable)
			.where(eq(customersTable.id, id))
			.get();
		return customer;
	};

	public getOneQuery = (id: string) => {
		const query = this.db
			.select()
			.from(customersTable)
			.where(eq(customersTable.id, id))
			.toSQL();

		return query;
	};

	public getAllCount = () => {
		const count = this.db
			.select({
				count: sql<number>`count(*)`.mapWith(Number),
			})
			.from(customersTable)
			.get();
		return count.count;
	};

	public getSearched = (search: string) => {
		const customers = this.db
			.select({
				name: customersTable.companyName,
				contect: customersTable.contactName,
				title: customersTable.contactTitle,
				phone: customersTable.phone,
			})
			.from(customersTable)
			.where(like(customersTable.companyName, `%${search}%`))
			.all();
		return customers;
	};
}
