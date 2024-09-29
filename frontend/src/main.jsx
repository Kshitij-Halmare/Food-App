import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NewProduct from './pages/NewProduct..jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
        <Route index element={<Home/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path='menu' element={<Menu/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/> 
        <Route path='login' element={<Login/>}/>
        <Route path='newProduct' element={<NewProduct/>}/>
        <Route path="signup" element={<Signup/>}/>
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);