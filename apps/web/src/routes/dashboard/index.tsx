import { ITodo } from "@awwwkshay/node-ts-core";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

import { hello, loadServerEnvVars } from "@/services";

export const Route = createFileRoute("/dashboard/")({
	component: RouteComponent,
	loader: async () => {
		const message = await hello();
		const envVars = await loadServerEnvVars();
		return { message, envVars };
	},
});

function RouteComponent() {
	const { message, envVars } = useLoaderData({ from: "/dashboard/" });
	const todos: ITodo[] = [
		{
			id: "1",
			title: "Learn TypeScript",
			completed: false,
		},
	];
	return (
		<div className="flex flex-col gap-4">
			<p className="text-red-300">Todo List</p>
			<p>{message}</p>
			<p>{JSON.stringify(envVars)}</p>
			<p>{import.meta.env.VITE_API_BASE_URL}</p>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
}
