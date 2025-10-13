import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLogin from '../components/AdminLogin';
import AdminRegister from '../components/AdminRegister';
import ContactRequestsList from '../components/ContactRequestsList';
import './AdminPanel.css';

const AdminPanel = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <ContactRequestsList />;
  }

  return (
    <div className="admin-panel">
      {showRegister ? (
        <AdminRegister onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <AdminLogin onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
};

export default AdminPanel; 