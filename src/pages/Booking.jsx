import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trains } from '../data/trains';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import './Booking.css';

const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  
  // Стани
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  const train = trains.find((t) => t.id === parseInt(trainId));

  // Генерація місць при зміні вагона
  useEffect(() => {
    if (!train) return;

    // Базовий номер місця залежить від вагона (вагон 1: 1-36, вагон 2: 37-72)
    const baseSeatNum = (selectedWagon - 1) * 36;
    
    const generatedSeats = Array.from({ length: 36 }, (_, i) => {
      const seatNum = baseSeatNum + i + 1;
      return {
        id: seatNum,
        number: seatNum,
        status: Math.random() > 0.8 ? 'booked' : 'free',
      };
    });

    setSeats(generatedSeats);
    setSelectedSeats([]); // Скидаємо вибір при переході в інший вагон
  }, [train, selectedWagon]); // Залежність від selectedWagon важлива!

  const handleSelectWagon = (wagonNum) => {
    setSelectedWagon(wagonNum);
  };

  const handleSelectSeat = (seat) => {
    if (seat.status === 'booked') return;

    const newSeats = seats.map((s) => {
      if (s.id === seat.id) {
        return { ...s, status: s.status === 'selected' ? 'free' : 'selected' };
      }
      return s;
    });
    setSeats(newSeats);

    const isCurrentlySelected = newSeats.find(s => s.id === seat.id).status === 'selected';
    setSelectedSeats(prev => 
      isCurrentlySelected 
        ? [...prev, seat.number] 
        : prev.filter(n => n !== seat.number)
    );
  };

  if (!train) return <p>Потяг не знайдено... <button onClick={() => navigate('/')}>Назад</button></p>;

  // Припустимо, що у кожного потяга 3 вагони (можна зберегти це в trains.js)
  const wagonsCount = 3; 

  return (
    <div className="booking-page">
      <button className="btn-back" onClick={() => navigate('/')}>← Назад до списку</button>
      
      <div className="train-info">
        <h2>🚂 Потяг №{train.number}</h2>
        <p>{train.from} → {train.to} | {train.date} о {train.time}</p>
      </div>

      {/* Компонент вибору вагона */}
      <WagonSelector 
        wagonsCount={wagonsCount} 
        selectedWagon={selectedWagon} 
        onSelectWagon={handleSelectWagon} 
      />

      {/* Карта місць (передаємо номер вагона для нумерації) */}
      <SeatMap seats={seats} onSelectSeat={handleSelectSeat} />

      {selectedSeats.length > 0 && (
        <div className="selection-summary">
          <h3>Вагон {selectedWagon}, місця: {selectedSeats.join(', ')}</h3>
          <p>Кількість: {selectedSeats.length}</p>
        </div>
      )}
    </div>
  );
};

export default Booking;