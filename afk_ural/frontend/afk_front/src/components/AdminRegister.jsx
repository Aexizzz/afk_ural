import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Reveal from './Reveal';
import './AdminAuth.css';

const AdminRegister = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    password_confirm: '',
    registration_code: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <section className="admin-auth">
      <Reveal as="div" className="auth-hero">
        <div className="container">
          <h1 className="auth-title">Админ-панель</h1>
          <p className="auth-subtitle">Регистрация администратора</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="auth-card card" y={18}>
          <h2>Регистрация</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="username">Имя пользователя *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">Имя *</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="last_name">Фамилия *</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+79001234567"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Пароль *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password_confirm">Подтверждение пароля *</label>
              <input
                type="password"
                id="password_confirm"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="registration_code">Код регистрации *</label>
              <input
                type="text"
                id="registration_code"
                name="registration_code"
                value={formData.registration_code}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Введите секретный код"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              Уже есть аккаунт?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={onSwitchToLogin}
              >
                Войти
              </button>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AdminRegister; 