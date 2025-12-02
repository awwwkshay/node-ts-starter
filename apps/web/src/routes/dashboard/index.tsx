import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  ssr: false
})

function RouteComponent() {
  return (<div>Hello dashboard</div>)
}
