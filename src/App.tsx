import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Cursor from "./components/Cursor";
import Home from "./pages/Home";

// Everything except the landing page is split into its own chunk,
// so the first visit only downloads what the home page needs.
const Shop = lazy(() => import("./pages/Shop"));
const Product = lazy(() => import("./pages/Product"));
const Lookbook = lazy(() => import("./pages/Lookbook"));
const Stories = lazy(() => import("./pages/Stories"));
const Story = lazy(() => import("./pages/Story"));
const About = lazy(() => import("./pages/About"));
const CustomerCare = lazy(() => import("./pages/CustomerCare"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // "instant" so the global `scroll-behavior: smooth` doesn't animate a long scroll on every route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* <Cursor /> */}
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
