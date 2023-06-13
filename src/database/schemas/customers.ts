import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const customersTable = sqliteTable('Customers', {
	id: text('CustomerId').primaryKey(),
	companyName: text('CompanyName'),
	contactName: text('ContactName'),
	contactTitle: text('ContactTitle'),
	address: text('Address'),
	city: text('City'),
	region: text('Region'),
	postCode: text('PostalCode'),
	country: text('Country'),
	phone: text('Phone'),
	fax: text('Fax'),
});
