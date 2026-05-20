const STORAGE_KEY = 'railway_bookings';

export const BookingService = {
  // Отримати всі бронювання
  getAllBookings: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Зберегти нове бронювання
  bookTicket: (bookingData) => {
    const bookings = BookingService.getAllBookings();
    bookings.push({
      id: Date.now(),
      ...bookingData,
      date: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return true;
  },
};