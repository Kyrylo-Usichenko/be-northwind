import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const ordersTable = sqliteTable('Orders', {
	orderID: integer('OrderID').primaryKey(),
	customerID: text('CustomerID'),
	empolyeeID: integer('EmployeeID'),
	orderDate: text('OrderDate'),
	requiredDate: text('RequiredDate'),
	shippedDate: text('ShippedDate'),
	shipVia: integer('ShipVia'),
	freight: real('Freight'),
	shipName: text('ShipName'),
	shipAddress: text('ShipAddress'),
	shipCity: text('ShipCity'),
	shipRegion: text('ShipRegion'),
	shipPostalCode: text('ShipPostalCode'),
	shipCountry: text('ShipCountry'),
});

export const orderDetailsTable = sqliteTable('OrderDetails', {
	orderID: integer('OrderID').primaryKey(),
	productID: integer('ProductID'),
	unitPrice: integer('UnitPrice'),
	quantity: text('Quantity'),
	discount: text('Discount'),
});

export const orderRelations = relations(ordersTable, ({ many }) => ({
	orderDetails: many(orderDetailsTable),
}));

export const orderDetailsRelations = relations(
	orderDetailsTable,
	({ one }) => ({
		order: one(ordersTable),
	})
);
