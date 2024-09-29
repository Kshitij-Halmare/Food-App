import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './component/Header'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast"

function App() {
  
  return (
   <>
   <Toaster/>
   <div >
    <Header/>
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
   </div>
   </>
  )
}

export default App
