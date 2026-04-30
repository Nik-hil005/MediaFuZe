import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Navbar from "./components/Navbar"


const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Watchlist = lazy(() => import("./pages/Watchlist"));
const Details = lazy(() => import("./pages/Details"));

function App() {
  return (
    <> 
    <div >
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/details/:type/:id" element={<Details />} />
        </Routes>
      </Suspense>
    </div>
    </>
  );
}

export default App
