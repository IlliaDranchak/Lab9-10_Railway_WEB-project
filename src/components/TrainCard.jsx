import './TrainCard.css';

const TrainCard = ({ train, onSelect }) => {
  return (
    <div className="train-card">
      <div className="card-header">
        <h3>Потяг №{train.number}</h3>
        <span className="duration">⏱ {train.duration}</span>
      </div>
      <p className="route">📍 {train.from} → {train.to}</p>
      <div className="schedule">
        <span>📅 {train.date}</span>
        <span>⏰ {train.time}</span>
      </div>
      <button className="btn-book" onClick={() => onSelect(train.id)}>
        Обрати
      </button>
    </div>
  );
};

export default TrainCard;