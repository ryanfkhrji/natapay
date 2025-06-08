import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import RekapitulasiPage from "./pages/RekapitulasiPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-rekapitulasi" element={<CreatePage />} />
        <Route path="/rekapitulasi" element={<RekapitulasiPage />} />
      </Routes>
    </>
  );
}

export default App;
