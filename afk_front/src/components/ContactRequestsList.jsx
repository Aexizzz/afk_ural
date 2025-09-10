import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Reveal from './Reveal';
import './ContactRequestsList.css';

const ContactRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { logout } = useAuth();

  const statusOptions = [
    { value: '', label: 'Все статусы' },
    { value: 'new', label: 'Новые' },
    { value: 'in_progress', label: 'В обработке' },
    { value: 'completed', label: 'Завершены' },
    { value: 'cancelled', label: 'Отменены' }
  ];

  const statusLabels = {
    new: 'Новая',
    in_progress: 'В обработке',
    completed: 'Завершена',
    cancelled: 'Отменена'
  };

  const statusColors = {
    new: 'status-new',
    in_progress: 'status-progress',
    completed: 'status-completed',
    cancelled: 'status-cancelled'
  };

  // debounce поиска по ФИО
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setError('');
        if (initialLoad) {
          setInitialLoad(true);
        } else {
          setIsFetching(true);
        }
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (debouncedSearch) params.append('search', debouncedSearch);
        
        const response = await axios.get(`/admin/contact-requests/?${params}`);
        const data = response.data.results || response.data;
        setRequests(data);
        if (selectedRequest) {
          const stillExists = data.find(r => r.id === selectedRequest.id);
          if (!stillExists) setSelectedRequest(null);
        }
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error);
        const errorMessage = error.response?.data?.detail || 
                            error.response?.data?.error || 
                            'Ошибка загрузки заявок';
        setError(errorMessage);
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setInitialLoad(false);
        setIsFetching(false);
      }
    };

    fetchRequests();
  }, [statusFilter, debouncedSearch, logout]);

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      await axios.patch(`/admin/contact-requests/${requestId}/`, {
        status: newStatus
      });
      setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          'Ошибка обновления статуса';
      alert(errorMessage);
    }
  };

  const deleteRequest = async (requestId) => {
    if (!confirm('Удалить эту заявку? Это действие необратимо.')) return;
    try {
      await axios.delete(`/admin/contact-requests/${requestId}/`);
      setRequests(prev => prev.filter(r => r.id !== requestId));
      if (selectedRequest?.id === requestId) {
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Ошибка удаления заявки:', error);
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.error || 
                          'Ошибка удаления заявки';
      alert(errorMessage);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <section className="admin">
      <Reveal as="div" className="admin-hero">
        <div className="container">
          <h1 className="admin-title">Админ-панель</h1>
          <p className="admin-subtitle">Заявки на связь</p>
        </div>
      </Reveal>

      <div className="container">
        <div className="admin-controls card">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Поиск по ФИО..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="status-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleLogout} className="btn secondary">
            Выйти
          </button>
        </div>

        <div className="requests-container">
          <Reveal className="requests-list" y={18}>
            <h3>Список заявок ({requests.length})</h3>
            {error && (
              <div className="error-message">{error}</div>
            )}
            
            {initialLoad ? (
              <div className="loading">Загрузка заявок...</div>
            ) : requests.length === 0 ? (
              <div className="no-requests">Заявки не найдены</div>
            ) : (
              <>
                {isFetching && <div className="loading" style={{marginBottom: 8}}>Обновление...</div>}
                <div className="requests-grid" style={isFetching ? {opacity: .6} : undefined}>
                  {requests.map(request => (
                    <div
                      key={request.id}
                      className={`request-card ${selectedRequest?.id === request.id ? 'selected' : ''}`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="request-header">
                        <h4>{request.full_name}</h4>
                        <span className={`status-badge ${statusColors[request.status]}`}>
                          {statusLabels[request.status]}
                        </span>
                      </div>
                      
                      <div className="request-info">
                        <p><strong>Телефон:</strong> {request.phone}</p>
                        <p><strong>Email:</strong> {request.email}</p>
                        <p><strong>Дата:</strong> {formatDate(request.created_at)}</p>
                      </div>
                      
                      {request.comment && (
                        <div className="request-comment">
                          <strong>Комментарий:</strong>
                          <p>{request.comment.length > 100 
                            ? `${request.comment.substring(0, 100)}...` 
                            : request.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </Reveal>

          {selectedRequest && (
            <Reveal className="request-details" y={18}>
              <div className="details-header">
                <h3>Детали заявки</h3>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <button 
                    onClick={() => setSelectedRequest(null)}
                    className="close-btn"
                    title="Закрыть"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => deleteRequest(selectedRequest.id)}
                    className="btn danger"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              
              <div className="details-content">
                <div className="detail-group">
                  <label>ФИО:</label>
                  <p>{selectedRequest.full_name}</p>
                </div>
                
                <div className="detail-group">
                  <label>Телефон:</label>
                  <p>{selectedRequest.phone}</p>
                </div>
                
                <div className="detail-group">
                  <label>Email:</label>
                  <p>{selectedRequest.email}</p>
                </div>
                
                <div className="detail-group">
                  <label>Дата создания:</label>
                  <p>{formatDate(selectedRequest.created_at)}</p>
                </div>
                
                <div className="detail-group">
                  <label>Дата обновления:</label>
                  <p>{formatDate(selectedRequest.updated_at)}</p>
                </div>
                
                {selectedRequest.comment && (
                  <div className="detail-group">
                    <label>Комментарий:</label>
                    <p>{selectedRequest.comment}</p>
                  </div>
                )}
                
                <div className="detail-group">
                  <label>Статус:</label>
                  <div className="status-controls">
                    <span className={`status-badge ${statusColors[selectedRequest.status]}`}>
                      {statusLabels[selectedRequest.status]}
                    </span>
                    
                    <select
                      value={selectedRequest.status}
                      onChange={(e) => updateRequestStatus(selectedRequest.id, e.target.value)}
                      className="status-update-select"
                    >
                      {statusOptions.slice(1).map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {selectedRequest.processed_by_name && (
                  <div className="detail-group">
                    <label>Обработал:</label>
                    <p>{selectedRequest.processed_by_name}</p>
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactRequestsList; 