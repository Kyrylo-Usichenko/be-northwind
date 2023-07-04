import { EmployeesRepository } from '@/database/repositories/Employees';

export class EmployeesService {
	constructor(private employees: EmployeesRepository) {}
	public getAll = (start: number, count: number) => {
		const startTimestamp = Date.now();
		const employees = this.employees.getAll(start, count);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.employees.getAllQuery(start, count);
		query.params.forEach((param: any) => {
			query.sql = query.sql.replace('?', param);
		});
		query.sql = query.sql.replace('\\', ' ');
		return {
			sql: query.sql,
			employees,
			time,
		};
	};
	public getOne = (id: number) => {
		const startTimestamp = Date.now();
		const employer = this.employees.getOne(id);
		const endTimestamp = Date.now();
		const time = endTimestamp - startTimestamp;

		const query = this.employees.getOneQuery(id);
		query.params.forEach((param: any) => {
			query.sql = query.sql.replace('?', param);
		});
		query.sql = query.sql.replace('\\', ' ');

		return { employer, time, sql: query.sql };
	};
}
