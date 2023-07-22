import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignUp } from "./pages/SignUp";
import { ProductPage } from "./pages/ProductPage";
import { Footer } from "./components/Footer";
import { CartPage } from "./pages/CartPage";
import { OrderPage } from "./pages/OrderPage";
import { ShippingAddressPage } from "./pages/ShippingAddressPage";
import { PaymentPage } from "./pages/PaymentPage";
import { SearchPage } from "./pages/SearchPage";
import { SubmitOrderPage } from "./pages/SubmitOrderPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <ToastContainer position="bottom-center" limit={1}/>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products/token/:token" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/shipping" element={<ShippingAddressPage/>}/>
            <Route path="/placeorder" element={<SubmitOrderPage/>}/>
            <Route path="/order/:id" element={<OrderPage/>}/>
            <Route path="/payment" element={<PaymentPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
