import { useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setDataProduct } from './redux/productSlice.jsx'; // Correctly import the action

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);  // Correct state selection
  console.log(productData);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        let ans = await res.json();
        console.log("Fetched Data:", ans);  // Log the entire fetched data to inspect

        if (res.ok) {
          dispatch(setDataProduct(ans));  // Dispatch action to set data
        } else {
          console.error("Error fetching product data:", ans);
        }

      } catch (error) {
        console.error("Error in fetching data:", error);
      }
    })();
  }, [dispatch]);  // Add dispatch to the dependency array

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
