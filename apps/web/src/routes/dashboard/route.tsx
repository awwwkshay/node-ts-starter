import { AppSidebar, SidebarProvider, SidebarTrigger } from '@/components';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <SidebarProvider>
        <AppSidebar/>
        <section className='w-full'>
          <SidebarTrigger/>
          <main className='w-full h-screen'><Outlet /></main>
        </section>
      </SidebarProvider>
    </div>
  );
}
