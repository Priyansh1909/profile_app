"use client"

import { usePathname } from 'next/navigation'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  const path = usePathname()

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  if (path == '/login' || path =='/signup' || path == '/profile_edit'){
    
    return (
      <html lang="en">
      <body className={inter.className}>
          <div className='h-screen'> {children}</div>
        </body>
    </html>


    )
  }

  return (
<html lang="en">
      
<body className={inter.className}>
  
<div className="flex h-full">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 border-l-2">
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="lg:p-4 xs:p-0">
          {children}
        </main>
      </div>
    </div>
  </body>
</html>
    
  )
}
