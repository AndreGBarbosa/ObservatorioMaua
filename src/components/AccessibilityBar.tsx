import React, { useState, useEffect } from 'react';
import { Sun, Moon, ZoomIn, ZoomOut, RotateCcw, ExternalLink, ShieldAlert, Phone } from 'lucide-react';

export const AccessibilityBar: React.FC = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'normal' | 'lg' | 'xl'>('normal');

  useEffect(() => {
    // Check saved preferences
    const savedContrast = localStorage.getItem('maua_contrast') === 'true';
    const savedFont = (localStorage.getItem('maua_font') as 'sm' | 'normal' | 'lg' | 'xl') || 'normal';
    
    if (savedContrast) {
      document.body.classList.add('high-contrast');
      setIsHighContrast(true);
    }
    
    applyFontSize(savedFont);

    // Keyboard shortcut listeners (Alt+1 for contrast, Alt+2 for font increase, Alt+3 for font reset)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '1') {
        toggleContrast();
      } else if (e.altKey && e.key === '2') {
        increaseFont();
      } else if (e.altKey && e.key === '3') {
        resetFont();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleContrast = () => {
    setIsHighContrast(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('maua_contrast', 'true');
      } else {
        document.body.classList.remove('high-contrast');
        localStorage.setItem('maua_contrast', 'false');
      }
      return next;
    });
  };

  const applyFontSize = (level: 'sm' | 'normal' | 'lg' | 'xl') => {
    document.documentElement.classList.remove('font-sm', 'font-normal', 'font-lg', 'font-xl');
    document.documentElement.classList.add(`font-${level}`);
    setFontSizeLevel(level);
    localStorage.setItem('maua_font', level);
  };

  const increaseFont = () => {
    if (fontSizeLevel === 'sm') applyFontSize('normal');
    else if (fontSizeLevel === 'normal') applyFontSize('lg');
    else if (fontSizeLevel === 'lg') applyFontSize('xl');
  };

  const decreaseFont = () => {
    if (fontSizeLevel === 'xl') applyFontSize('lg');
    else if (fontSizeLevel === 'lg') applyFontSize('normal');
    else if (fontSizeLevel === 'normal') applyFontSize('sm');
  };

  const resetFont = () => {
    applyFontSize('normal');
  };

  return (
    <aside className="accessibility-bar" aria-label="Barra de acessibilidade e transparência do Governo Municipal de Mauá">
      <div className="container accessibility-container">
        <div className="accessibility-links">
          <a 
            href="https://www.maua.sp.gov.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="accessibility-link"
          >
            <span>Portal Prefeitura de Mauá</span>
            <ExternalLink size={12} />
          </a>
          <a 
            href="https://transparencia.maua.sp.gov.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="accessibility-link"
          >
            <ShieldAlert size={13} />
            <span>Portal da Transparência</span>
          </a>
          <a 
            href="#/fale-conosco" 
            className="accessibility-link"
          >
            <Phone size={13} />
            <span>Ouvidoria: 4512-7847</span>
          </a>
        </div>

        <div className="accessibility-actions">
          <button 
            type="button" 
            className={`access-btn ${isHighContrast ? 'active' : ''}`}
            onClick={toggleContrast}
            title="Alternar modo de alto contraste (Alt+1)"
            aria-pressed={isHighContrast}
          >
            {isHighContrast ? <Sun size={13} /> : <Moon size={13} />}
            <span>{isHighContrast ? 'Contraste Normal' : 'Alto Contraste'}</span>
          </button>

          <button 
            type="button" 
            className="access-btn"
            onClick={decreaseFont}
            title="Diminuir tamanho do texto"
            aria-label="Diminuir tamanho do texto"
          >
            <ZoomOut size={13} />
            <span>A-</span>
          </button>

          <button 
            type="button" 
            className="access-btn"
            onClick={resetFont}
            title="Tamanho padrão de texto (Alt+3)"
            aria-label="Tamanho padrão de texto"
          >
            <RotateCcw size={12} />
            <span>A</span>
          </button>

          <button 
            type="button" 
            className="access-btn"
            onClick={increaseFont}
            title="Aumentar tamanho do texto (Alt+2)"
            aria-label="Aumentar tamanho do texto"
          >
            <ZoomIn size={13} />
            <span>A+</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
