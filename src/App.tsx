import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Features } from "./pages/Features";
import { Pricing } from "./pages/Pricing";
import { Creators } from "./pages/Creators";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/creators" element={<Creators />} />
      </Routes>
    </BrowserRouter>
  );
}
