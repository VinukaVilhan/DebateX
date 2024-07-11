import NavbarDashboard from '@/components/NavbarDashboard'
import Sidebar from '@/components/Sidebar'
import React, {ReactNode} from 'react'

const HomeLayout = ({children}: {children:ReactNode}) => {
  return (
    <main className='relative'>
        <NavbarDashboard/>
    
        <div className='flex bg-background_of_dashboard-1 width'>
            <section className='flex min-h-screen flex-1 flex-col px-9 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                <div className='w-full bg-background_of_dashboard-1'>
                    {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout