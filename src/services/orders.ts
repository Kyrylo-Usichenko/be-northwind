import OrdersRepository from '@/database/repositories/orders';

export class OrdersService {
	constructor(private orders: OrdersRepository) {}
	public getAll = (start: number, count: number) => {
		const startTime = performance.now();
		const orders = this.orders.getAll(start, count);
		const endTime = performance.now();
		const query = this.orders.getAllQuery(start, count);
		const itemsCount = this.orders.getAllCount();
		return {
			orders,
			query,
			time: endTime - startTime,
			count: itemsCount,
		};
	};
	public getOne = (id: number) => {
		const startTime = performance.now();
		const order = this.orders.getOne(id);
		const endTime = performance.now();
		const query = this.orders.getOneQuery(id);
		return {
			order,
			query,
			time: endTime - startTime,
		};
	};
}
