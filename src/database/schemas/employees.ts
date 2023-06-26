import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const employeesTable = sqliteTable('Employees', {
	employeeID: integer('EmployeeID').primaryKey(),
	lastName: text('LastName'),
	firstName: text('FirstName'),
	title: text('Title'),
	titleOfCourtesy: text('TitleOfCourtesy'),
	birthDate: text('BirthDate'),
	hireDate: text('HireDate'),
	address: text('Address'),
	city: text('City'),
	region: text('Region'),
	postalCode: text('PostalCode'),
	country: text('Country'),
	homePhone: text('HomePhone'),
	extension: integer('Extension'),
	notes: text('Notes'),
	reportsTo: text('ReportsTo'),
});
