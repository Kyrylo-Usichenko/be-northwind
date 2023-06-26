import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const shippersTable = sqliteTable('Shippers', {
	shipperID: integer('ShipperID').primaryKey(),
	companyName: text('CompanyName'),
	phone: text('Phone'),
});
