import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetails } from "./pages/ProductDetails";
import { Footer } from "../src/components/Footer/Footer.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />}/>
          </Routes>
        </main>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
