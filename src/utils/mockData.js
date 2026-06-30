export const ROOMS = [
  {
    id: 'aura-studio',
    name: 'Aura Studio',
    type: 'Estudio de Bienestar',
    description: 'Espacio tranquilo ideal para yoga, masajes o terapia corporal. Equipado con camilla de masajes y ambiente zen.',
    capacity: 4,
    pricePerHour: 25,
    amenities: ['Camilla de masajes', 'Ambiente regulado', 'Té de cortesía', 'Sonido envolvente'],
    image: '/images/aura_studio.png'
  },
  {
    id: 'zen-sanctuary',
    name: 'Zen Sanctuary',
    type: 'Sala de Terapia',
    description: 'Habitación acústicamente aislada para sesiones terapéuticas, meditación guiada o consultas privadas individuales.',
    capacity: 2,
    pricePerHour: 20,
    amenities: ['Aislamiento acústico', 'Iluminación cálida', 'Cojines ergonómicos', 'Humidificador'],
    image: '/images/zen_sanctuary.png'
  },
  {
    id: 'oasis-lounge',
    name: 'Oasis Lounge',
    type: 'Sala de Reuniones',
    description: 'Sala premium para juntas creativas y presentaciones ejecutivas. Cuenta con pantalla interactiva y café ilimitado.',
    capacity: 8,
    pricePerHour: 40,
    amenities: ['Pantalla Smart TV', 'Pizarra magnética', 'Café & Snack premium', 'Aire acondicionado'],
    image: '/images/oasis_lounge.png'
  },
  {
    id: 'nebula-desk',
    name: 'Nebula Desk',
    type: 'Escritorio Privado',
    description: 'Estación de trabajo ergonómica individual con monitor extra y conectividad de ultra alta velocidad en zona silenciosa.',
    capacity: 1,
    pricePerHour: 12,
    amenities: ['Monitor de 27 pulgadas', 'Silla ergonómica', 'Conexión por cable LAN', 'Luz de lectura regulable'],
    image: '/images/nebula_desk.png'
  }
];

export const AVAILABLE_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00'
];

export const INITIAL_BOOKINGS = [
  {
    id: 'res-1',
    roomId: 'aura-studio',
    roomName: 'Aura Studio',
    customerName: 'Sofía Martínez',
    customerEmail: 'sofia@example.com',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00',
    durationHours: 2,
    notes: 'Requiere preparación de velas aromáticas antes de iniciar.',
    status: 'Confirmada',
    createdAt: new Date().toISOString()
  },
  {
    id: 'res-2',
    roomId: 'oasis-lounge',
    roomName: 'Oasis Lounge',
    customerName: 'Carlos Gutiérrez',
    customerEmail: 'carlos@techcorp.com',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '14:00',
    durationHours: 3,
    notes: 'Junta con inversionistas nacionales. Requiere proyector listo.',
    status: 'Confirmada',
    createdAt: new Date().toISOString()
  }
];
