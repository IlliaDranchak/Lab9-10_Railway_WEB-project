import './SeatMap.css';

const SeatMap = ({ seats, onSelectSeat, wagonNumber }) => {
  // Розділяємо місця на ліву та праву сторону
  const leftSeats = seats.filter(seat => seat.id <= 18);
  const rightSeats = seats.filter(seat => seat.id > 18);

  return (
    <div className="wagon-layout">
      <h3 className="wagon-title">🚃 Вагон №{wagonNumber} (Купе)</h3>
      
      <div className="wagon-container">
        {/* Ліва сторона */}
        <div className="side left-side">
          <div className="compartment">
            {leftSeats.slice(0, 4).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 1 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 1 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {leftSeats.slice(4, 8).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 1 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 1 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {leftSeats.slice(8, 12).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 1 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 1 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {leftSeats.slice(12, 16).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 1 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 1 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {leftSeats.slice(16, 18).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 1 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 1 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Коридор */}
        <div className="corridor">
          <div className="corridor-line"></div>
        </div>

        {/* Права сторона */}
        <div className="side right-side">
          <div className="compartment">
            {rightSeats.slice(0, 4).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 0 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 0 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {rightSeats.slice(4, 8).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 0 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 0 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {rightSeats.slice(8, 12).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 0 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 0 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {rightSeats.slice(12, 16).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 0 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 0 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
          <div className="compartment">
            {rightSeats.slice(16, 18).map(seat => (
              <button
                key={seat.id}
                className={`seat ${seat.status} ${seat.id % 2 === 0 ? 'lower' : 'upper'}`}
                onClick={() => onSelectSeat(seat)}
                disabled={seat.status === 'booked'}
              >
                <span className="seat-number">{seat.number}</span>
                <span className="seat-type">{seat.id % 2 === 0 ? 'Н' : 'В'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="legend">
        <span className="legend-item free">🟢 Вільно</span>
        <span className="legend-item selected">🔵 Обрано</span>
        <span className="legend-item booked">🔴 Зайнято</span>
        <span className="legend-note">Н — нижнє, В — верхнє</span>
      </div>
    </div>
  );
};

export default SeatMap;