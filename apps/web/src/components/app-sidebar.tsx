import { Link } from '@tanstack/react-router'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem } from './ui'

export const AppSidebar = () => {
  return (
    <Sidebar className='p-2 h-full flex flex-col items-start'>
        <SidebarHeader>
          <Link to="/">
            <h1 className="text-2xl font-semibold">My App</h1>
          </Link>
        </SidebarHeader>
        <SidebarMenu title="Main Menu" />
          <SidebarMenuItem>
              <Link
                  to="/dashboard" // route to your Todos panel
                  className="block px-4 py-2 rounded hover:bg-gray-100"
              >
                  Todos
              </Link>
          </SidebarMenuItem>
        <SidebarMenu/>
        <SidebarFooter className='mt-auto w-full'>
          <h1 className="text-2xl">Hi, Akshay</h1>
        </SidebarFooter>
    </Sidebar>
  )
}
