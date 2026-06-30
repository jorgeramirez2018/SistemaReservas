import React from 'react';
import { Layers, Calendar, DollarSign, Award } from 'lucide-react';

export default function Dashboard({ bookings, rooms, setActiveTab, onBookRoom }) {
  // Stat calculations
  const activeBookings = bookings.filter(b => b.status === 'Confirmada');
  const totalBookingsCount = activeBookings.length;
  
  const totalRevenue = activeBookings.reduce((sum, b) => {
    const roomObj = rooms.find(r => r.id === b.roomId);
    const rate = roomObj ? roomObj.pricePerHour : 0;
    return sum + (rate * b.durationHours);
  }, 0);

  // Compute Occupancy Rate for Today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = activeBookings.filter(b => b.date === todayStr).length;
  
  const totalPossibleSlots = rooms.length * 13;
  const occupancyPercentage = Math.round((todayBookingsCount / totalPossibleSlots) * 100) || 0;

  // Find popular room
  const roomBookingCount = {};
  activeBookings.forEach(b => {
    roomBookingCount[b.roomName] = (roomBookingCount[b.roomName] || 0) + 1;
  });
  let popularRoom = 'Ninguno';
  let maxCount = 0;
  Object.keys(roomBookingCount).forEach(roomName => {
    if (roomBookingCount[roomName] > maxCount) {
      maxCount = roomBookingCount[roomName];
      popularRoom = roomName;
    }
  });

  const recentBookings = [...activeBookings].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="container-fluid p-0">
      {/* Hero Header */}
      <div className="p-4 mb-4 rounded-3 text-start stat-card-gradient" style={{ borderRadius: '16px' }}>
        <h1 className="h2 text-white mb-2 fw-bold">Bienvenido a ZenFlow Space</h1>
        <p className="text-secondary mb-0">Monitorea la ocupación, administra ingresos y coordina tus citas de bienestar.</p>
      </div>

      {/* Grid of Stats Cards */}
      <div className="row g-3 mb-4">
        {/* Metric 1: Total Bookings */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Reservas Activas</span>
              <div className="p-2 rounded bg-info bg-opacity-10 text-info"><Calendar size={18} /></div>
            </div>
            <h3 className="text-white fs-3 fw-bold mb-0">{totalBookingsCount}</h3>
            <span className="text-muted small">Confirmadas</span>
          </div>
        </div>

        {/* Metric 2: Occupancy Rate */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Ocupación Hoy</span>
              <div className="p-2 rounded bg-primary bg-opacity-10 text-primary"><Layers size={18} /></div>
            </div>
            <h3 className="text-white fs-3 fw-bold mb-0">{occupancyPercentage}%</h3>
            <div className="progress mt-2" style={{ height: '6px', backgroundColor: 'var(--bg-primary)' }}>
              <div className="progress-bar bg-info" style={{ width: `${occupancyPercentage}%` }}></div>
            </div>
          </div>
        </div>

        {/* Metric 3: Total Projected Revenue */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Ingresos Proyectados</span>
              <div className="p-2 rounded bg-success bg-opacity-10 text-success"><DollarSign size={18} /></div>
            </div>
            <h3 className="text-success fs-3 fw-bold mb-0">${totalRevenue}</h3>
            <span className="text-muted small">USD totales</span>
          </div>
        </div>

        {/* Metric 4: Popular Room */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card h-100 p-3 border-0" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-secondary small fw-medium">Espacio Favorito</span>
              <div className="p-2 rounded bg-warning bg-opacity-10 text-warning"><Award size={18} /></div>
            </div>
            <h3 className="text-white fs-5 fw-bold mb-0 text-truncate" title={popularRoom}>{popularRoom}</h3>
            <span className="text-muted small">Mayor demanda</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Quick Room list */}
        <div className="col-lg-6">
          <div className="card border-0 p-4 h-100" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 text-white mb-0">Nuestros Espacios</h3>
              <button onClick={() => setActiveTab('spaces')} className="btn btn-link text-info text-decoration-none small p-0">Ver todos</button>
            </div>
            <div className="d-flex flex-column gap-3">
              {rooms.map(room => (
                <div key={room.id} className="d-flex align-items-center justify-content-between p-3 rounded" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="d-flex align-items-center">
                    <img src={room.image} alt={room.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} className="me-3" />
                    <div>
                      <h4 className="fs-6 text-white mb-0">{room.name}</h4>
                      <span className="text-secondary small">${room.pricePerHour} USD/hr</span>
                    </div>
                  </div>
                  <button onClick={() => onBookRoom(room)} className="btn btn-outline-info btn-sm">Reservar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Bookings */}
        <div className="col-lg-6">
          <div className="card border-0 p-4 h-100" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 text-white mb-0">Reservas Recientes</h3>
              <button onClick={() => setActiveTab('bookings')} className="btn btn-link text-info text-decoration-none small p-0">Ver historial</button>
            </div>
            {recentBookings.length === 0 ? (
              <div className="text-center py-5 text-muted small">No hay reservas vigentes.</div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {recentBookings.map(b => (
                  <div key={b.id} className="p-3 rounded text-start" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-white fw-semibold">{b.customerName}</span>
                      <span className="badge bg-success bg-opacity-25 text-success">{b.timeSlot}</span>
                    </div>
                    <div className="text-secondary small mt-1">
                      Espacio: {b.roomName} | Fecha: {b.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
