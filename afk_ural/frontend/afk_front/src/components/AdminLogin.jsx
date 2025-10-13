import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Reveal from './Reveal';
import './AdminAuth.css';

const AdminLogin = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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

    const result = await login(formData.username, formData.password);
    
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
          <p className="auth-subtitle">Вход для администраторов</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="auth-card card" y={18}>
          <h2>Вход</h2>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
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
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn"
              disabled={loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              Нет аккаунта?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={onSwitchToRegister}
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AdminLogin; 