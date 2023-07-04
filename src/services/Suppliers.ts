import { SuppliersRepository } from '@/database/repositories/Suppliers';

export class SuppliersService {
	constructor(private suppliers: SuppliersRepository) {}
	public getAll = (start: number, count: number) => {
		const startTime = performance.now();
		const suppliers = this.suppliers.getAll(start, count);
		const endTime = performance.now();
		const query = this.suppliers.getAllQuery(start, count);
		const itemsCount = this.suppliers.getAllCount();
		return {
			suppliers,
			query,
			time: endTime - startTime,
			count: itemsCount,
		};
	};
	public getOne = (id: number) => {
		const startTime = performance.now();
		const supplier = this.suppliers.getOne(id);
		const endTime = performance.now();
		const query = this.suppliers.getOneQuery(id);
		return {
			supplier,
			query,
			time: endTime - startTime,
		};
	};
}
