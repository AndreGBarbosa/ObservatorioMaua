import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { mauaMapPoints } from '../data/mauaData';
import type { MapFeature } from '../data/mauaData';
import { 
  HeartPulse, 
  GraduationCap, 
  Users, 
  Factory, 
  Trees, 
  MapPin, 
  Search, 
  ExternalLink,
  Layers
} from 'lucide-react';

// Função para gerar marcadores visuais SVG customizados para o Leaflet
const createCustomIcon = (category: string) => {
  let bgColor = '#2352EE';
  let iconSvg = '🏛️';

  switch (category) {
    case 'saude':
      bgColor = '#E11D48';
      iconSvg = '🏥';
      break;
    case 'educacao':
      bgColor = '#2352EE';
      iconSvg = '🎓';
      break;
    case 'social':
      bgColor = '#B5179E';
      iconSvg = '🤝';
      break;
    case 'industria':
      bgColor = '#D97706';
      iconSvg = '🏭';
      break;
    case 'parque':
      bgColor = '#059669';
      iconSvg = '🌳';
      break;
    case 'governo':
      bgColor = '#1E293B';
      iconSvg = '🏛️';
      break;
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        width: 34px;
        height: 34px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid #FFFFFF;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: 14px;
          display: block;
          line-height: 1;
        ">${iconSvg}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
};

export const InteractiveMap: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPoints = mauaMapPoints.filter(pt => {
    const matchesCategory = selectedCategory === 'todos' || pt.category === selectedCategory;
    const matchesSearch = pt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pt.bairro.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pt.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="map-container-outer">
      {/* Barra de Filtros e Busca */}
      <div className="map-control-bar">
        <div className="map-layers-pills">
          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('todos')}
          >
            <Layers size={14} />
            <span>Todos ({mauaMapPoints.length})</span>
          </button>

          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'saude' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('saude')}
          >
            <HeartPulse size={14} color={selectedCategory === 'saude' ? '#FFF' : '#E11D48'} />
            <span>Saúde</span>
          </button>

          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'educacao' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('educacao')}
          >
            <GraduationCap size={14} color={selectedCategory === 'educacao' ? '#FFF' : '#2352EE'} />
            <span>Educação</span>
          </button>

          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'social' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('social')}
          >
            <Users size={14} color={selectedCategory === 'social' ? '#FFF' : '#B5179E'} />
            <span>Assistência Social</span>
          </button>

          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'industria' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('industria')}
          >
            <Factory size={14} color={selectedCategory === 'industria' ? '#FFF' : '#D97706'} />
            <span>Polo Petroquímico</span>
          </button>

          <button 
            type="button" 
            className={`layer-toggle-btn ${selectedCategory === 'parque' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('parque')}
          >
            <Trees size={14} color={selectedCategory === 'parque' ? '#FFF' : '#059669'} />
            <span>Parques & Mananciais</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#F1F5F9', borderRadius: '40px', padding: '0.35rem 0.85rem', flex: '1 1 200px' }}>
          <Search size={15} color="#64748B" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou bairro..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8125rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Mapa Leaflet */}
      <div className="map-leaflet-wrapper">
        <MapContainer 
          center={[-23.6678, -46.4614]} 
          zoom={13} 
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | OPPES Mauá'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredPoints.map((point: MapFeature) => (
            <Marker 
              key={point.id} 
              position={[point.lat, point.lng]}
              icon={createCustomIcon(point.category)}
            >
              <Popup>
                <div style={{ padding: '4px', maxWidth: '240px' }}>
                  <div style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    color: '#2352EE', 
                    marginBottom: '4px' 
                  }}>
                    {point.category} • {point.bairro}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: '0 0 6px 0', color: '#0F172A' }}>
                    {point.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {point.details}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.75rem', 
                    color: '#64748B', 
                    borderTop: '1px solid #E2E8F0', 
                    paddingTop: '6px' 
                  }}>
                    <MapPin size={12} />
                    <span>{point.address}</span>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${point.lat},${point.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '0.75rem', 
                      color: '#2352EE', 
                      fontWeight: '600', 
                      marginTop: '6px' 
                    }}
                  >
                    <span>Como chegar</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
