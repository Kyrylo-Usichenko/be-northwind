import { eq, like, sql } from 'drizzle-orm';
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
		return products;
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
	public getOne = (id: number) => {
		const products = this.db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, id))
			.get();
		return products;
	};

	public getOneQuery = (id: number) => {
		const query = this.db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, id))
			.toSQL();

		return query;
	};

	public getAllCount = () => {
		const count = this.db
			.select({
				count: sql<number>`count(*)`.mapWith(Number),
			})
			.from(productsTable)
			.get();
		return count.count;
	};

	public getSearched = (search: string) => {
		const products = this.db
			.select({
				productNeme: productsTable.name,
				quality: productsTable.quantityPerUnit,
				price: productsTable.unitPrice,
				unitsInStock: productsTable.unitsInStock,
			})
			.from(productsTable)
			.where(like(productsTable.name, `%${search}%`))
			.all();
		return products;
	};
}
