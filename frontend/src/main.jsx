import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import SuccessPage from "./pages/SuccessPage.jsx"
import CancelPage from"./pages/CancelPage.jsx"
import NewProduct from './pages/NewProduct..jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';
import {store } from "./redux/index.js";
import {Provider} from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
        <Route index element={<Home/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="/menu/:id" element={<Menu />} />
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/> 
        <Route path='login' element={<Login/>}/>
        <Route path='newProduct' element={<NewProduct/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/success_page" element={<SuccessPage/>}/>
        <Route path="/cancel_page" element={<CancelPage/>}/>
      </Route>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
