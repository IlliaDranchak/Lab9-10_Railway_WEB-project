import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Збереження бронювання
  const bookTickets = (bookingData) => {
    const newBooking = {
      id: Date.now(),
      train: selectedTrain,
      wagon: selectedWagon,
      seats: selectedSeats,
      ...bookingData,
      date: new Date().toISOString(),
    };
    
    setBookings(prev => [...prev, newBooking]);
    localStorage.setItem('railway_bookings', JSON.stringify(bookings));
    
    return newBooking;
  };

  // Очищення вибору після бронювання
  const clearSelection = () => {
    setSelectedSeats([]);
    setSelectedWagon(1);
  };

  const value = {
    selectedTrain,
    setSelectedTrain,
    selectedWagon,
    setSelectedWagon,
    selectedSeats,
    setSelectedSeats,
    bookings,
    bookTickets,
    clearSelection,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};