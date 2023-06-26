import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const regionsTable = sqliteTable('Regions', {
	regionID: integer('RegionID').primaryKey(),
	regionDescription: text('RegionDescription'),
});
