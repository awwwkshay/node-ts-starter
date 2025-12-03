import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { ITodo } from "@awwwkshay/node-ts-core"
import { hello } from '@/services'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  loader: async () => {
    const response = await hello()
    return response
  }
})

function RouteComponent() {
  const message = useLoaderData({ from: "/dashboard/" })
  const todos: ITodo[] = [
    {
      id: '1',
      title: 'Learn TypeScript',
      completed: false
    }
  ]
  return (<div className='flex flex-col gap-4'>
    <p>Todo List</p>
    <p>{message}</p>
    <p>{import.meta.env.VITE_API_BASE_URL}</p>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </div>)
}
