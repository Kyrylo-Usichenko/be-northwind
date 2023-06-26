import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const productsTable = sqliteTable('Products', {
	id: integer('ProductId').primaryKey(),
	productName: text('ProductName'),
	supplierId: integer('SupplierId'),
	categoriId: integer('CategoryId'),
	quantityPerUnit: text('QuantityPerUnit'),
	unitPrice: integer('UnitPrice'),
	unitsInStock: integer('UnitsInStock'),
	unitsOnOrder: integer('UnitsOnOrder'),
	reorderLevel: integer('ReorderLevel'),
	discontinued: integer('Discontinued'),
});
