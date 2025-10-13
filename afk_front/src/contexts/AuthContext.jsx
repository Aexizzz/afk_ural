import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  // Настройка axios baseURL из переменных окружения Vite
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://176.109.105.158:8000/api';
  axios.defaults.baseURL = apiBaseUrl;

  // Добавляем токен к запросам
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      console.log('Запрос профиля пользователя...');
      console.log('Текущий заголовок авторизации:', axios.defaults.headers.common['Authorization']);
      
      const response = await axios.get('/auth/profile/');
      console.log('Профиль получен:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Ошибка получения профиля:', error.response?.data);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Попытка входа для пользователя:', username);
      
      const response = await axios.post('/auth/login/', {
        username,
        password
      });
      
      console.log('Ответ сервера:', response.data);
      
      const { access, refresh } = response.data.tokens;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Сразу устанавливаем заголовок авторизации
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      console.log('Установлен заголовок авторизации:', `Bearer ${access}`);
      
      setToken(access);
      setUser(response.data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Ошибка входа:', error.response?.data);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Ошибка входа';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/auth/register/', userData);
      
      const { access, refresh } = response.data.tokens;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      // Сразу устанавливаем заголовок авторизации
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setToken(access);
      setUser(response.data.user);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Ошибка регистрации';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axios.post('/auth/logout/', { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 