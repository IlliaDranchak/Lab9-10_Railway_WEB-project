import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">🚂 Залізнична система</header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
