import { eq, sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { orderDetailsTable, ordersTable } from '../schemas/orders';

class OrdersRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const orders = this.db
			.select({
				orderID: orderDetailsTable.orderID,
				productID: orderDetailsTable.productID,
				products: sql<number>`count(${orderDetailsTable.productID})`.mapWith(
					Number
				),
				discount: sql<number>`sum(${orderDetailsTable.discount})`.mapWith(
					Number
				),
				quantity: sql<number>`sum(${orderDetailsTable.quantity})`.mapWith(
					Number
				),
				sum: sql<number>`sum(${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice} * (1 - ${orderDetailsTable.discount}))`.mapWith(
					Number
				),
				ordersTable,
			})
			.from(orderDetailsTable)
			.groupBy(orderDetailsTable.orderID)
			.innerJoin(
				ordersTable,
				eq(ordersTable.orderID, orderDetailsTable.orderID)
			)
			.orderBy(orderDetailsTable.orderID)
			.limit(count)
			.offset(start)
			.all();

		return orders;
	};
}

export default OrdersRepository;
