import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { ulid } from 'ulid';

const id = () =>
  text('id')
    .primaryKey()
    .$defaultFn(() => ulid().toLowerCase());

export const usersTable = pgTable('users', {
  id: id(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  image: varchar({ length: 255 }),
  role: text('role', { enum: ['super_admin', 'admin', 'customer'] })
    .notNull()
    .default('customer'),
});
