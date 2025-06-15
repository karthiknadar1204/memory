import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
});
