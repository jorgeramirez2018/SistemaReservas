import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RoomCard from './components/RoomCard';
import BookingModal from './components/BookingModal';
import BookingList from './components/BookingList';
import { ROOMS, INITIAL_BOOKINGS } from './utils/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  const handleAddBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) => 
      prev.map((b) => b.id === id ? { ...b, status: 'Cancelada' } : b)
    );
  };

  const handleBookRoom = (room) => {
    setSelectedRoomForBooking(room);
  };

  return (
    <div className="d-flex w-100" style={{ minHeight: '100vh' }}>
      {/* Sidebar Nav */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow-1 p-4 p-md-5 overflow-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            bookings={bookings} 
            rooms={ROOMS} 
            setActiveTab={setActiveTab} 
            onBookRoom={handleBookRoom}
          />
        )}

        {activeTab === 'spaces' && (
          <div>
            <div className="mb-4">
              <h2 className="text-white h3 mb-1">Nuestros Espacios Disponibles</h2>
              <p className="text-secondary small">Explora y selecciona el espacio que mejor se adapte a tus necesidades de bienestar o trabajo.</p>
            </div>
            
            <div className="row g-4">
              {ROOMS.map((room) => (
                <div key={room.id} className="col-12 col-md-6 col-xxl-3 col-xl-4 col-sm-12">
                  <RoomCard room={room} onBook={handleBookRoom} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <BookingList 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
          />
        )}

      </main>

      {/* Booking Form Modal */}
      {selectedRoomForBooking && (
        <BookingModal 
          room={selectedRoomForBooking} 
          bookings={bookings}
          onClose={() => setSelectedRoomForBooking(null)} 
          onAddBooking={handleAddBooking}
        />
      )}
    </div>
  );
}
