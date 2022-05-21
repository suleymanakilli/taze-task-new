
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/home';
import CoinDetails from './pages/coinDetails/coinDetails'
import { useEffect } from 'react';
import CoinService from './services/coinService';
import Navbar from "./components/navbar/navbar";

function App() {
  useEffect(() => {
    if (!localStorage.getItem('coinsLength')) {
      let coinService = new CoinService()
      coinService.getAllCoins().then(result => localStorage.setItem('coinsLength', result.data.length))
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/coindetails/:id" element={<CoinDetails />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
