import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Reviews from "./components/Reviews";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/product/:productId/reviews" element={<Reviews />} />
      </Routes>
    </>
  );
}

export default App;
