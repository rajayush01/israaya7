import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Lookbook from "./pages/Lookbook";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import About from "./pages/About";
import CustomerCare from "./pages/CustomerCare";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <Cursor /> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/lookbook" element={<Lookbook />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:slug" element={<Story />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer-care" element={<CustomerCare />} />
      </Routes>
    </BrowserRouter>
  );
}
