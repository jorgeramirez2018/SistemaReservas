import React, { useState } from 'react';
import { Search, Trash2, AlertCircle } from 'lucide-react';

export default function BookingList({ bookings, onCancelBooking }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDate = dateFilter ? b.date === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  const handleCancelClick = (id) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      onCancelBooking(id);
    }
  };

  return (
    <div className="card border-0 p-4" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="text-white h3 mb-1">Listado de Reservas</h2>
          <p className="text-secondary small mb-0">Visualiza, busca y administra el estado de los espacios ocupados.</p>
        </div>
        
        {/* Filters */}
        <div className="d-flex flex-wrap gap-2">
          <div className="input-group" style={{ maxWidth: '280px' }}>
            <span className="input-group-text bg-dark border text-secondary" style={{ borderColor: 'var(--border-color)' }}>
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="form-control bg-dark border text-white" 
              style={{ borderColor: 'var(--border-color)' }}
              placeholder="Buscar cliente o espacio..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <input 
            type="date" 
            className="form-control bg-dark border text-white" 
            style={{ borderColor: 'var(--border-color)', maxWidth: '160px' }}
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          
          {(searchTerm || dateFilter) && (
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => { setSearchTerm(''); setDateFilter(''); }}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-5 rounded border border-dashed" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
          <AlertCircle size={48} className="text-secondary mb-3" />
          <h4 className="text-white-50">No se encontraron reservas</h4>
          <p className="text-muted small">Prueba cambiando los criterios de búsqueda o añade una nueva reserva.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle border-0" style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr className="text-secondary" style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th scope="col" className="pb-3 px-3">Cliente</th>
                <th scope="col" className="pb-3">Espacio</th>
                <th scope="col" className="pb-3">Fecha</th>
                <th scope="col" className="pb-3">Hora & Duración</th>
                <th scope="col" className="pb-3">Notas</th>
                <th scope="col" className="pb-3">Estado</th>
                <th scope="col" className="pb-3 text-end px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="clickable-row" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td className="py-3 px-3">
                    <div className="fw-semibold text-white">{b.customerName}</div>
                    <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{b.customerEmail}</div>
                  </td>
                  <td className="text-white-50 fw-semibold">{b.roomName}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className="badge bg-dark border text-info" style={{ borderColor: 'var(--border-color)' }}>{b.timeSlot}</span>
                    <span className="text-white-50 small ms-2">{b.durationHours} hrs</span>
                  </td>
                  <td className="text-truncate text-secondary" style={{ maxWidth: '180px' }} title={b.notes || '-'}>
                    {b.notes || <span className="text-muted">-</span>}
                  </td>
                  <td>
                    <span className={`badge ${
                      b.status === 'Confirmada' ? 'bg-success bg-opacity-25 text-success' : 'bg-danger bg-opacity-25 text-danger'
                    } border`} style={{ borderColor: b.status === 'Confirmada' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}>
                      {b.status}
                    </span>
                  </td>
                  <td className="text-end px-3">
                    {b.status === 'Confirmada' && (
                      <button 
                        onClick={() => handleCancelClick(b.id)}
                        className="btn btn-outline-danger btn-sm border-0 p-2" 
                        title="Cancelar Reserva"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
