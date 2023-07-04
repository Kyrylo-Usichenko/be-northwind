import { eq, sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { employeesTable } from '../schemas/employees';

export class EmployeesRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const employees = this.db
			.select()
			.from(employeesTable)
			.limit(count)
			.offset(start)
			.all();

		return employees;
	};
	public getAllQuery = (start: number, count: number) => {
		const employeesQuery = this.db
			.select()
			.from(employeesTable)
			.limit(count)
			.offset(start)
			.toSQL();

		return employeesQuery;
	};
	public getOne = (id: number) => {
		const supplier = this.db
			.select()
			.from(employeesTable)
			.where(eq(employeesTable.employeeID, id))
			.get();
		return supplier;
	};

	public getOneQuery = (id: number) => {
		const query = this.db
			.select()
			.from(employeesTable)
			.where(eq(employeesTable.employeeID, id))
			.toSQL();

		return query;
	};

	public getAllCount = () => {
		const count = this.db
			.select({
				count: sql<number>`count(*)`.mapWith(Number),
			})
			.from(employeesTable)
			.get();
		return count.count;
	};
}
