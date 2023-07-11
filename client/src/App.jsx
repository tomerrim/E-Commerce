import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
