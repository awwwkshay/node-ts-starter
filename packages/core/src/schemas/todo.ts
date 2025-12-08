import z from "zod";
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod';
import { todosTable } from "../db/schema";


export const todoSchema = createSelectSchema(todosTable)

export type ITodo = z.infer<typeof todoSchema>;

export const todoUpdateSchema = createUpdateSchema(todosTable);

export type ITodoUpdate = z.infer<typeof todoUpdateSchema>;

export const todoInsertSchema = createInsertSchema(todosTable);

export type ITodoInsert = z.infer<typeof todoInsertSchema>;