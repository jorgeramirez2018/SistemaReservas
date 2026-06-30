import React from 'react';
import { LayoutDashboard, Compass, ClipboardList } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'spaces', label: 'Espacios', icon: Compass },
    { id: 'bookings', label: 'Mis Reservas', icon: ClipboardList }
  ];

  return (
    <div className="d-flex flex-column flex-shrink-0 p-4 border-end" style={{ width: '260px', backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', minHeight: '100vh' }}>
      <div className="d-flex align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: 'var(--border-color) !important' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-info me-2">
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
        <span className="fs-4 fw-extrabold text-white" style={{ letterSpacing: '0.5px' }}>ZenFlow Space</span>
      </div>

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`nav-link-custom ${activeTab === item.id ? 'active-item' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      
      <div className="pt-3 border-top" style={{ borderColor: 'var(--border-color) !important', color: 'var(--text-muted)' }}>
        <small className="d-block text-center">© 2026 ZenFlow Space</small>
      </div>
    </div>
  );
}
