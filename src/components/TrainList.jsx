import { useState } from 'react';
import { trains } from '../data/trains';
import TrainCard from './TrainCard';
import './TrainList.css';

const TrainList = ({ onSelectTrain }) => {
  const [search, setSearch] = useState('');

  const filtered = trains.filter(t =>
    t.number.includes(search.toUpperCase()) ||
    t.from.toLowerCase().includes(search.toLowerCase()) ||
    t.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="train-list">
      <input
        type="text"
        placeholder="🔍 Пошук за номером або містом..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map(train => (
            <TrainCard key={train.id} train={train} onSelect={onSelectTrain} />
          ))
        ) : (
          <p className="no-results">Рейсів не знайдено 😔</p>
        )}
      </div>
    </div>
  );
};

export default TrainList;