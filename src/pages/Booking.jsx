import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { trains } from '../data/trains';
import { useBooking } from '../context/BookingContext';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import './Booking.css';

const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  
  // Отримуємо стан з контексту
  const { 
    selectedTrain, 
    setSelectedTrain,
    selectedWagon, 
    setSelectedWagon,
    selectedSeats,
    setSelectedSeats,
    bookTickets,
    clearSelection
  } = useBooking();

  const train = trains.find((t) => t.id === parseInt(trainId));

  // Зберігаємо обраний потяг у контекст
  useEffect(() => {
    if (train) {
      setSelectedTrain(train);
    }
  }, [train, setSelectedTrain]);

  // Генерація місць (локальний стан)
  const [seats, setSeats] = useState([]);
  
  useEffect(() => {
    if (!train) return;
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
    setSelectedSeats([]);
  }, [train, selectedWagon]);

  const handleSelectSeat = (seat) => {
    if (seat.status === 'booked') return;
    
    const newSeats = seats.map((s) =>
      s.id === seat.id ? { ...s, status: s.status === 'selected' ? 'free' : 'selected' } : s
    );
    setSeats(newSeats);
    
    const isSelecting = newSeats.find(s => s.id === seat.id).status === 'selected';
    setSelectedSeats(prev =>
      isSelecting ? [...prev, seat.number] : prev.filter(n => n !== seat.number)
    );
  };

  const handleBookingSubmit = (formData) => {
    bookTickets({
      ...formData,
    });

    toast.success(`✅ Місця ${selectedSeats.join(', ')} успішно заброньовано!`);
    clearSelection();

    setTimeout(() => navigate('/'), 2000);
  };

  if (!train) return <p>Потяг не знайдено</p>;

  return (
    <div className="booking-page">
      <ToastContainer position="top-center" />
      
      <button className="btn-back" onClick={() => navigate('/')}>← Назад</button>
      
      <div className="train-info">
        <h2>🚂 Потяг №{train.number}</h2>
        <p>{train.from} → {train.to} | {train.date}</p>
      </div>

      <WagonSelector 
        wagonsCount={3} 
        selectedWagon={selectedWagon} 
        onSelectWagon={setSelectedWagon} 
      />

      <SeatMap 
        seats={seats} 
        onSelectSeat={handleSelectSeat}
        wagonNumber={selectedWagon}
      />

      <BookingForm 
        selectedSeats={selectedSeats}
        train={train}
        wagonNumber={selectedWagon}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default Booking;