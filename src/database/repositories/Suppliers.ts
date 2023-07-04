import { eq, sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { suppliersTable } from '../schemas/suppliers';

export class SuppliersRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const suppliers = this.db
			.select()
			.from(suppliersTable)
			.limit(count)
			.offset(start)
			.all();
		console.log(suppliers);

		return suppliers;
	};
	public getAllQuery = (start: number, count: number) => {
		const suppliersQuery = this.db
			.select()
			.from(suppliersTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return suppliersQuery;
	};
	public getOne = (id: number) => {
		const supplier = this.db
			.select()
			.from(suppliersTable)
			.where(eq(suppliersTable.supplierID, id))
			.get();
		console.log(supplier);

		return supplier;
	};

	public getOneQuery = (id: number) => {
		const query = this.db
			.select()
			.from(suppliersTable)
			.where(eq(suppliersTable.supplierID, id))
			.toSQL();

		return query;
	};

	public getAllCount = () => {
		const count = this.db
			.select({
				count: sql<number>`count(*)`.mapWith(Number),
			})
			.from(suppliersTable)
			.get();
		return count.count;
	};
}
