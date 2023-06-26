import { eq } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { customersTable } from '../schemas/customers';
import { productsTable } from '../schemas/products';

export class ProductsRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const products = this.db
			.select()
			.from(productsTable)
			.limit(count)
			.offset(start)
			.all();
		return {
			products,
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
		const products = this.db
			.select()
			.from(customersTable)
			.where(eq(customersTable.id, id))
			.get();
		return products;
	};

	public getOneQuery = (id: string) => {
		const query = this.db
			.select()
			.from(customersTable)
			.where(eq(customersTable.id, id))
			.toSQL();

		return query;
	};
}
