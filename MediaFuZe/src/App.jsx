// import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import Watchlist from "./pages/Watchlist"
import Details from "./pages/Details"
import Navbar from "./components/Navbar"
// import './App.css'

function App() {
  return (
    <> 
    <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </div>
    </>
  );
}

export default App
