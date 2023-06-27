import { eq, sql } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { orderDetailsTable, ordersTable } from '../schemas/orders';
import { productsTable } from '../schemas/products';

type Product = {
	id: number;
	name: string;
	quantity: number;
	orderPrice: number;
	totalPrice: number;
	discount: number;
};

class OrdersRepository {
	constructor(private db: BetterSQLite3Database) {}
	public getAll = (start: number, count: number) => {
		const orders = this.db
			.select({
				id: orderDetailsTable.orderID,
				products: sql<number>`count(${orderDetailsTable.productID})`.mapWith(
					Number
				),
				discount: sql<number>`sum(${orderDetailsTable.discount})`.mapWith(
					Number
				),
				quantity: sql<number>`sum(${orderDetailsTable.quantity})`.mapWith(
					Number
				),
				totalPrice:
					sql<number>`sum(${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice} * (1 - ${orderDetailsTable.discount}))`.mapWith(
						Number
					),
				shippedDate: ordersTable.shippedDate,
				shipName: ordersTable.shipName,
				city: ordersTable.shipCity,
				country: ordersTable.shipCountry,
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
	public getAllQuery = (start: number, count: number) => {
		const orders = this.db
			.select({
				id: orderDetailsTable.orderID,
				products: sql<number>`count(${orderDetailsTable.productID})`.mapWith(
					Number
				),
				discount: sql<number>`sum(${orderDetailsTable.discount})`.mapWith(
					Number
				),
				quantity: sql<number>`sum(${orderDetailsTable.quantity})`.mapWith(
					Number
				),
				totalPrice:
					sql<number>`sum(${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice} * (1 - ${orderDetailsTable.discount}))`.mapWith(
						Number
					),
				shippedDate: ordersTable.shippedDate,
				shipName: ordersTable.shipName,
				city: ordersTable.shipCity,
				country: ordersTable.shipCountry,
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
			.toSQL();
		return { query: orders.sql };
	};

	public getOne = (id: number) => {
		const order = this.db
			.select({
				customerId: ordersTable.customerID,
				shipName: ordersTable.shipName,
				productsCount:
					sql<number>`count(${orderDetailsTable.productID})`.mapWith(Number),
				quantity: sql<number>`sum(${orderDetailsTable.quantity})`.mapWith(
					Number
				),
				totalPrice:
					sql<number>`sum(${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice} * (1 - ${orderDetailsTable.discount}))`.mapWith(
						Number
					),
				totalDiscount: sql<number>`sum(${orderDetailsTable.discount})`.mapWith(
					Number
				),
				freight: ordersTable.freight,
				shipVia: ordersTable.shipVia,
				orderDate: ordersTable.orderDate,
				requiredDate: ordersTable.requiredDate,
				shippedDate: ordersTable.shippedDate,
				shipRegion: ordersTable.shipRegion,
				shipPostalCode: ordersTable.shipPostalCode,
				shipCountry: ordersTable.shipCountry,
				products:
					sql<Product>`json_group_array(json_object('name', ${productsTable.name}, 'quantity', ${orderDetailsTable.quantity}, 'orderPrice', ${orderDetailsTable.unitPrice}, 'totalPrice', ${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice}, 'discount', ${orderDetailsTable.discount}
					))
					`.mapWith((products) => JSON.parse(products)),
			})
			.from(orderDetailsTable)
			.groupBy(orderDetailsTable.orderID)
			.innerJoin(
				ordersTable,
				eq(ordersTable.orderID, orderDetailsTable.orderID)
			)
			.groupBy(orderDetailsTable.orderID)

			.innerJoin(
				productsTable,
				eq(productsTable.id, orderDetailsTable.productID)
			)
			.where(eq(ordersTable.orderID, id))
			.orderBy(orderDetailsTable.orderID)
			.all();

		return order;
	};

	public getAllCount = () => {
		const count = this.db
			.select({
				count: sql<number>`count(*)`.mapWith(Number),
			})
			.from(ordersTable)
			.get();

		return count.count;
	};

	public getOneQuery = (id: number) => {
		const order = this.db
			.select({
				customerId: ordersTable.customerID,
				shipName: ordersTable.shipName,
				productsCount:
					sql<number>`count(${orderDetailsTable.productID})`.mapWith(Number),
				quantity: sql<number>`sum(${orderDetailsTable.quantity})`.mapWith(
					Number
				),
				totalPrice:
					sql<number>`sum(${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice} * (1 - ${orderDetailsTable.discount}))`.mapWith(
						Number
					),
				totalDiscount: sql<number>`sum(${orderDetailsTable.discount})`.mapWith(
					Number
				),
				freight: ordersTable.freight,
				shipVia: ordersTable.shipVia,
				orderDate: ordersTable.orderDate,
				requiredDate: ordersTable.requiredDate,
				shippedDate: ordersTable.shippedDate,
				shipRegion: ordersTable.shipRegion,
				shipPostalCode: ordersTable.shipPostalCode,
				shipCountry: ordersTable.shipCountry,
				products: sql<Product>`json_group_array(json_object(
					'name', ${productsTable.name},
					'quantity', ${orderDetailsTable.quantity},
					'orderPrice', ${orderDetailsTable.unitPrice},
					'totalPrice', ${orderDetailsTable.quantity} * ${orderDetailsTable.unitPrice},
					'discount', ${orderDetailsTable.discount}
					))
					`.mapWith(JSON.parse),
			})
			.from(orderDetailsTable)
			.groupBy(orderDetailsTable.orderID)
			.innerJoin(
				ordersTable,
				eq(ordersTable.orderID, orderDetailsTable.orderID)
			)
			.groupBy(orderDetailsTable.orderID)

			.innerJoin(
				productsTable,
				eq(productsTable.id, orderDetailsTable.productID)
			)
			.where(eq(ordersTable.orderID, id))
			.orderBy(orderDetailsTable.orderID)
			.toSQL();
		return order.sql;
	};
}

export default OrdersRepository;
