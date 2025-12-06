import z from "zod";

export const todoSchema = z.object({
	id: z.string(),
	title: z.string(),
	completed: z.boolean(),
});

export type ITodo = z.infer<typeof todoSchema>;
