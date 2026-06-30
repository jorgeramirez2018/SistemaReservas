import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

export default function RoomCard({ room, onBook }) {
  return (
    <div className="card h-100 transition-card border-0" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color) !important' }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', borderRadius: '16px 16px 0 0' }}>
        <img 
          src={room.image} 
          alt={room.name} 
          className="w-100 h-100" 
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span className="badge bg-info text-dark" style={{ position: 'absolute', top: '12px', right: '12px', fontWeight: 'bold' }}>
          {room.type}
        </span>
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h3 className="h4 text-white mb-2">{room.name}</h3>
        <p className="small text-muted flex-grow-1 mb-3" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{room.description}</p>
        
        <div className="d-flex justify-content-between align-items-center mb-3 py-2 border-top border-bottom" style={{ borderColor: 'var(--border-color) !important' }}>
          <div className="d-flex align-items-center text-secondary gap-1">
            <Users size={16} className="text-info" />
            <span>Capacidad: <strong>{room.capacity} pers.</strong></span>
          </div>
          <div className="d-flex align-items-center text-white gap-1 fw-semibold">
            <span className="text-success fs-5">${room.pricePerHour}</span>
            <span className="small text-muted">/ hr</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-1">
            {room.amenities.map((amenity, idx) => (
              <span key={idx} className="badge bg-dark border text-secondary" style={{ fontSize: '0.7rem', borderColor: 'var(--border-color) !important' }}>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => onBook(room)}
          className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
        >
          <span>Reservar Ahora</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
