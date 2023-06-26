import OrdersRepository from '@/database/repositories/orders';

export class OrdersService {
	constructor(private orders: OrdersRepository) {}
	public getAll = (start: number, count: number) => {
		const orders = this.orders.getAll(start, 90);
		const uniqueOrdersWithDetails: any = [];
		// orders.forEach((order) => {
		// 	if (
		// 		!uniqueOrdersWithDetails.find(
		// 			(uniqueOrder) => uniqueOrder.orderID === order.orderID
		// 		)
		// 	) {
		// 		uniqueOrdersWithDetails.push(order);
		// 	} else {

		// 	}
		// });
		return orders;
	};
}
