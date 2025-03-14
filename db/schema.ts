import { AVAILABLE_STATUSES } from "@/data/invoices";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map((status) => status.id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTS: timestamp("create_ts").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  customerId: integer("customerId").references(() => Customers.id),
  status: statusEnum("status").default("open").notNull(),
});

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  createTS: timestamp("create_ts").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("userId").notNull(),
});
