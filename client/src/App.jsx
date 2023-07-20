import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignUp } from "./pages/SignUp";
import { ProductPage } from "./pages/ProductPage";
import { Footer } from "./components/Footer";
import { CartPage } from "./pages/CartPage";
import { OrderPage } from "./pages/OrderPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <ToastContainer position="bottom-center" limit={1}/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products/token/:token" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/order/:id" element={<OrderPage/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
