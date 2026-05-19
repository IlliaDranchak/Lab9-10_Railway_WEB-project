import './WagonSelector.css';

const WagonSelector = ({ wagonsCount, selectedWagon, onSelectWagon }) => {
  // Створюємо масив вагонів на основі їх кількості
  const wagons = Array.from({ length: wagonsCount }, (_, i) => i + 1);

  return (
    <div className="wagon-selector">
      <h3>🚃 Виберіть вагон:</h3>
      <div className="tabs">
        {wagons.map((wagonNum) => (
          <button
            key={wagonNum}
            className={`tab ${selectedWagon === wagonNum ? 'active' : ''}`}
            onClick={() => onSelectWagon(wagonNum)}
          >
            Вагон {wagonNum}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;