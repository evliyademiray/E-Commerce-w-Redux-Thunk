import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BasketPages from "./pages/BasketPages";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sepet" element={<BasketPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
