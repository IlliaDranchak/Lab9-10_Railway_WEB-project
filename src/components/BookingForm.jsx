import { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ selectedSeats, train, wagonNumber, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введіть ім'я";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Невірний телефон (10 цифр)";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Невірний email";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Передаємо дані наверх
    onSubmit({ ...formData, selectedSeats, wagonNumber });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  if (selectedSeats.length === 0) {
    return <p className="hint-text">👈 Спочатку оберіть місця на схемі</p>;
  }

  return (
    <div className="booking-form">
      <h3>🎫 Оформлення квитка</h3>
      <p className="form-info">
        Потяг: <b>{train.number}</b> | Вагон: <b>{wagonNumber}</b> | Місця: <b>{selectedSeats.join(', ')}</b>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ім'я та Прізвище</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Іван Іванов"
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Телефон</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="0991234567"
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="ivan@example.com"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <button type="submit" className="btn-confirm">Підтвердити бронювання</button>
      </form>
    </div>
  );
};

export default BookingForm;