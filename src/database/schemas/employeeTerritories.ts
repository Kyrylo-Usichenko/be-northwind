import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const employeeTerritoriesTable = sqliteTable('EmployeeTerritories', {
	employeeID: integer('EmployeeID'),
	territoryID: integer('TerritoryID'),
});
