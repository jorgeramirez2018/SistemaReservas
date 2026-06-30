import React, { useState, useEffect } from 'react';
import { X, Calendar as CalIcon, Clock, Mail, User, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { AVAILABLE_SLOTS } from '../utils/mockData';

export default function BookingModal({ room, onClose, bookings, onAddBooking }) {
  const [step, setStep] = useState(1); // 1 = Form, 2 = Receipt
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState('');
  const [errorHeader, setErrorHeader] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Compute disabled slots for the selected date and room
  const [busySlots, setBusySlots] = useState([]);

  useEffect(() => {
    if (!room) return;
    // Find slots taken on this specific date for this room
    const filtered = bookings
      .filter(b => b.roomId === room.id && b.date === date && b.status !== 'Cancelada')
      .map(b => b.timeSlot);
    setBusySlots(filtered);
    setSelectedSlot('');
  }, [date, room, bookings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorHeader('Por favor selecciona un horario de reserva.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setErrorHeader('Por favor llena los campos obligatorios.');
      return;
    }
    
    // Check if slot overlaps with existing booking
    const isOverlapping = bookings.some(b => 
      b.roomId === room.id && 
      b.date === date && 
      b.timeSlot === selectedSlot &&
      b.status !== 'Cancelada'
    );
    if (isOverlapping) {
      setErrorHeader('Este horario ya ha sido reservado para esta sala.');
      return;
    }

    const newBooking = {
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      roomId: room.id,
      roomName: room.name,
      customerName: name,
      customerEmail: email,
      date,
      timeSlot: selectedSlot,
      durationHours: Number(duration),
      notes,
      status: 'Confirmada',
      createdAt: new Date().toISOString()
    };

    onAddBooking(newBooking);
    setSuccessBooking(newBooking);
    setStep(2);
  };

  const totalPrice = room.pricePerHour * duration;

  if (step === 2 && successBooking) {
    return (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="card border-0 p-4 shadow-lg text-center" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
            <div className="my-3">
              <CheckCircle size={64} className="text-success animate-bounce" />
            </div>
            <h2 className="text-white mb-1">¡Reserva Completada!</h2>
            <p className="text-muted small mb-4">Tu lugar ha sido asegurado con éxito.</p>
            
            <div className="p-3 mb-4 rounded-3 text-start" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Espacio:</span>
                <span className="text-white fw-bold">{room.name}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Fecha:</span>
                <span className="text-white">{successBooking.date}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Horario:</span>
                <span className="text-white fw-semibold">{successBooking.timeSlot} ({successBooking.durationHours}h)</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Cliente:</span>
                <span className="text-white">{successBooking.customerName}</span>
              </div>
              <hr style={{ borderColor: 'var(--border-color)' }} />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Monto:</span>
                <span className="text-success fw-bold fs-5">${totalPrice} USD</span>
              </div>
            </div>
            
            <button className="btn btn-primary-custom w-100 py-2 fs-6 mb-2" onClick={onClose}>
              Aceptar y Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <div className="modal-header border-bottom p-4" style={{ borderColor: 'var(--border-color)' }}>
            <div>
              <h5 className="modal-title text-white fs-4 d-flex align-items-center gap-2">
                <Sparkles className="text-info" size={20} />
                Reservar {room.name}
              </h5>
              <span className="text-secondary" style={{ fontSize: '0.85rem' }}>${room.pricePerHour} USD por hora</span>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} className="modal-body p-4">
            {errorHeader && (
              <div className="alert alert-danger border-0 text-white bg-danger bg-opacity-25 mb-4 py-2" role="alert">
                {errorHeader}
              </div>
            )}
            
            <div className="row g-4">
              {/* Left Column: Date & Slot Pickers */}
              <div className="col-md-6 border-end" style={{ borderColor: 'var(--border-color) !important' }}>
                <h6 className="text-white-50 mb-3 d-flex align-items-center gap-2">
                  <CalIcon size={16} /> 1. Elige Fecha y Horario
                </h6>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Fecha</label>
                  <input 
                    type="date" 
                    className="form-control bg-dark border-secondary text-white" 
                    min={new Date().toISOString().split('T')[0]}
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    style={{ borderColor: 'var(--border-color)' }}
                    required 
                  />
                </div>
                
                <label className="form-label text-secondary small mb-2">Horarios Disponibles</label>
                <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                  {AVAILABLE_SLOTS.map((slot) => {
                    const isBusy = busySlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBusy}
                        onClick={() => setSelectedSlot(slot)}
                        className={`btn btn-sm py-2 border ${
                          selectedSlot === slot 
                            ? 'btn-info text-dark fw-bold border-info' 
                            : isGridItemBusy(isBusy)
                        }`}
                        style={{ fontSize: '0.8rem' }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Customer Details */}
              <div className="col-md-6">
                <h6 className="text-white-50 mb-3 d-flex align-items-center gap-2">
                  <User size={16} /> 2. Información del Cliente
                </h6>
                
                <div className="mb-3">
                  <label className="form-label text-secondary small">Nombre Completo *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border text-secondary" style={{ borderColor: 'var(--border-color)' }}><User size={14} /></span>
                    <input 
                      type="text" 
                      className="form-control bg-dark border text-white" 
                      style={{ borderColor: 'var(--border-color)' }}
                      placeholder="Sofía Martínez" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-secondary small">Correo Electrónico *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border text-secondary" style={{ borderColor: 'var(--border-color)' }}><Mail size={14} /></span>
                    <input 
                      type="email" 
                      className="form-control bg-dark border text-white" 
                      style={{ borderColor: 'var(--border-color)' }}
                      placeholder="sofia@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-12">
                    <label className="form-label text-secondary small">Duración (Horas)</label>
                    <select 
                      className="form-select bg-dark border text-white" 
                      style={{ borderColor: 'var(--border-color)' }}
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="1">1 hora</option>
                      <option value="2">2 horas</option>
                      <option value="3">3 horas</option>
                      <option value="4">4 horas</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-secondary small">Notas / Requerimientos</label>
                  <textarea 
                    className="form-control bg-dark border text-white" 
                    style={{ borderColor: 'var(--border-color)' }}
                    rows="2" 
                    placeholder="Instrucciones especiales..."
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="p-3 rounded border text-start" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary small">Subtotal:</span>
                    <span className="text-white fs-6 fw-semibold">${room.pricePerHour} x {duration}h</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-white fw-bold">Total estimado:</span>
                    <span className="text-success fw-bold fs-5">${totalPrice} USD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top g-2 p-0 pt-4 mt-4" style={{ borderColor: 'var(--border-color)' }}>
              <button type="button" className="btn btn-outline-secondary px-4 py-2" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary-custom px-4 py-2">Confirmar Reserva</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function isGridItemBusy(isBusy) {
  if (isBusy) {
    return 'btn-outline-secondary border-secondary opacity-50 bg-secondary bg-opacity-10';
  }
  return 'btn-outline-info text-info border-info border-opacity-70 bg-info bg-opacity-5';
}
