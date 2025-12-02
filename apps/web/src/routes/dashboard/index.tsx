import { createFileRoute } from '@tanstack/react-router'
import { ITodo } from "@awwwkshay/node-ts-core"

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  ssr: false
})

function RouteComponent() {
  const todos: ITodo[] = [
    {
      id: '1',
      title: 'Learn TypeScript',
      completed: false
    }
  ]
  return (<div className='flex flex-col gap-4'>
    <p>Todo List</p>
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </div>)
}
