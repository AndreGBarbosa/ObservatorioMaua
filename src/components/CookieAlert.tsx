import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';

export const CookieAlert: React.FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('maua_cookies_accepted') === 'true';
    if (!hasAccepted) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('maua_cookies_accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Aviso de Privacidade e Cookies">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <Cookie size={28} color="#2352EE" style={{ flexShrink: 0 }} />
        <p className="cookie-text">
          O portal do <strong>Observatório de Mauá</strong> utiliza cookies para aprimorar sua experiência de navegação e gerar estatísticas anônimas em conformidade com a LGPD.
        </p>
      </div>
      <button 
        type="button" 
        className="cookie-btn"
        onClick={handleAccept}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Check size={14} />
          Concordo
        </span>
      </button>
    </div>
  );
};
