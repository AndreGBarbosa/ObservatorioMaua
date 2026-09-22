import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  BarChart3, 
  MapPin, 
  Layers, 
  FileText, 
  Menu, 
  X, 
  Database, 
  TrendingUp, 
  Building2, 
  HeartPulse, 
  GraduationCap, 
  Users, 
  Briefcase, 
  FileSpreadsheet,
  Compass,
  Building,
  Info,
  ExternalLink,
  Zap,
  Bot
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  }, [location]);

  const toggleDropdown = (key: string) => {
    setMobileDropdown(prev => prev === key ? null : key);
  };

  return (
    <header>
      {/* Top Header - Identidade Oficial da Prefeitura de Mauá */}
      <div className="header-top">
        <div className="container header-top-container">
          <Link to="/" className="brand-wrapper" onClick={() => setMobileMenuOpen(false)}>
            {/* Brasão Oficial Mauá em SVG estilizado */}
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Brasão de Mauá">
              <path d="M50 5 L88 20 V52 C88 74 50 94 50 94 C50 94 12 74 12 52 V20 Z" fill="#2352EE" stroke="#10277A" strokeWidth="4"/>
              <path d="M50 12 L80 24 V50 C80 68 50 84 50 84 C50 84 20 68 20 50 V24 Z" fill="#FFFFFF"/>
              <path d="M50 18 L74 28 V48 C74 62 50 76 50 76 C50 76 26 62 26 48 V28 Z" fill="#B5179E"/>
              <circle cx="50" cy="46" r="16" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3"/>
              <path d="M42 46 L48 52 L58 38" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="36" y="80" width="28" height="5" rx="2.5" fill="#2352EE"/>
            </svg>

            <div className="brand-divider"></div>

            <div className="observatorio-title-wrap">
              <div className="observatorio-title">
                <span>OPPES MAUÁ</span>
                <span className="observatorio-tag">Portal Oficial</span>
              </div>
              <span className="observatorio-subtitle">
                Observatório de Políticas Públicas, Econômico e Social • Prefeitura de Mauá
              </span>
            </div>
          </Link>

          <div className="header-info-badges">
            <a 
              href="https://www.ibge.gov.br/cidades-e-estados/sp/maua.html"
              target="_blank"
              rel="noopener noreferrer"
              className="info-pill"
              style={{ background: '#EFF6FF', color: '#1E40AF', borderColor: '#BFDBFE', textDecoration: 'none' }}
              title="Acessar IBGE Cidades: Mauá (SP)"
            >
              <ExternalLink size={13} />
              <span>IBGE Cidades: Mauá/SP</span>
            </a>
            <div className="info-pill">
              <Building size={14} />
              <span>Paço Municipal</span>
            </div>
            <div className="info-pill info-pill-highlight">
              <Database size={14} />
              <span>Dados Abertos 2026</span>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-oppes-chatbot'))}
              className="info-pill"
              style={{ 
                background: 'linear-gradient(135deg, #2352EE 0%, #B5179E 100%)', 
                color: '#FFFFFF', 
                borderColor: 'transparent',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(35, 82, 238, 0.35)'
              }}
              title="Abrir Assistente Virtual do OPPES Mauá"
            >
              <Bot size={14} />
              <span>Assistente IA</span>
            </button>
          </div>

          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Superior em Formato de Pílula Arredondada (#F2F2F2 - Padrão Prefeitura de Mauá) */}
      <nav className={`nav-pill-wrapper ${scrolled ? 'scrolled' : ''}`} aria-label="Navegação Principal">
        <div className="container">
          <div className="nav-pill-bar">
            <ul className={`nav-pill-list ${mobileMenuOpen ? 'open' : ''}`}>
              
              {/* Header exclusivo do Drawer Mobile */}
              {mobileMenuOpen && (
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.85rem', marginBottom: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2352EE' }} />
                    <strong style={{ fontSize: '0.95rem', color: '#0F172A' }}>Menu de Navegação</strong>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ background: 'none', border: 'none', padding: '6px', cursor: 'pointer', color: '#64748B' }}
                    aria-label="Fechar menu"
                  >
                    <X size={20} />
                  </button>
                </li>
              )}

              {/* Botão Rápido Mobile do Assistente IA */}
              {mobileMenuOpen && (
                <li style={{ marginBottom: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent('open-oppes-chatbot'));
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #2352EE 0%, #B5179E 100%)',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(35, 82, 238, 0.3)'
                    }}
                  >
                    <Bot size={18} />
                    <span>Falar com o Assistente IA de Mauá</span>
                  </button>
                </li>
              )}

              {/* Item: Principal */}
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>PRINCIPAL</span>
                </NavLink>
              </li>

              {/* Item: BI OPPES (Dropdown com 8 Dashboards) */}
              <li className="nav-item">
                <div 
                  className="nav-link nav-link-dropdown"
                  onClick={() => toggleDropdown('bi')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BarChart3 size={15} />
                    <span>BI OPPES</span>
                  </div>
                  <ChevronDown 
                    size={13} 
                    style={{ 
                      transition: 'transform 0.2s ease', 
                      transform: mobileDropdown === 'bi' ? 'rotate(180deg)' : 'none' 
                    }} 
                  />
                </div>
                <div className={`dropdown-menu ${mobileDropdown === 'bi' ? 'mobile-expanded' : ''}`}>
                  <Link to="/bi-dashboards?tab=bi-maua-geral" className="dropdown-item">
                    <Users size={15} color="#2352EE" />
                    <span>BI MAUÁ GERAL</span>
                    <span className="dropdown-item-badge">Censo 2022</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-economia-maua" className="dropdown-item">
                    <TrendingUp size={15} color="#B5179E" />
                    <span>BI ECONOMIA MAUÁ</span>
                    <span className="dropdown-item-badge">PIB & ICMS</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-cnpj-maua" className="dropdown-item">
                    <Building2 size={15} color="#0284C7" />
                    <span>BI CNPJ MAUÁ</span>
                    <span className="dropdown-item-badge">39k empresas</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-estabel-saude" className="dropdown-item">
                    <HeartPulse size={15} color="#E11D48" />
                    <span>BI ESTABEL. SAÚDE</span>
                    <span className="dropdown-item-badge">Nardini & UBS</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-censo-escolar" className="dropdown-item">
                    <GraduationCap size={15} color="#F59E0B" />
                    <span>BI CENSO ESCOLAR 2025</span>
                    <span className="dropdown-item-badge">80k alunos</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-escolas-maua" className="dropdown-item">
                    <Layers size={15} color="#10B981" />
                    <span>BI ESCOLAS DE MAUÁ</span>
                    <span className="dropdown-item-badge">148 unidades</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-vulnerabilidade" className="dropdown-item">
                    <Users size={15} color="#D97706" />
                    <span>BI VULNERABILIDADE</span>
                    <span className="dropdown-item-badge">IPVS & CadÚnico</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-emprego-rais" className="dropdown-item">
                    <Briefcase size={15} color="#6366F1" />
                    <span>BI EMPREGO RAIS / CAGED</span>
                    <span className="dropdown-item-badge">88k vagas</span>
                  </Link>
                  <Link to="/bi-dashboards?tab=bi-energia-semil" className="dropdown-item">
                    <Zap size={15} color="#059669" />
                    <span>BI ENERGIA SEMIL</span>
                    <span className="dropdown-item-badge">Anuário SP</span>
                  </Link>
                </div>
              </li>

              {/* Item: Orçamento 2026 */}
              <li className="nav-item">
                <NavLink 
                  to="/orcamento" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileSpreadsheet size={15} />
                    <span>ORÇAMENTO 2026</span>
                  </div>
                </NavLink>
              </li>

              {/* Item: Mauá em Números (Territórios & Bairros) */}
              <li className="nav-item">
                <div 
                  className="nav-link nav-link-dropdown"
                  onClick={() => toggleDropdown('numeros')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={15} />
                    <span>MAUÁ EM NÚMEROS</span>
                  </div>
                  <ChevronDown 
                    size={13} 
                    style={{ 
                      transition: 'transform 0.2s ease', 
                      transform: mobileDropdown === 'numeros' ? 'rotate(180deg)' : 'none' 
                    }} 
                  />
                </div>
                <div className={`dropdown-menu ${mobileDropdown === 'numeros' ? 'mobile-expanded' : ''}`}>
                  <Link to="/maua-em-numeros?filter=bairros" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>14 Bairros Oficiais</span>
                    <span className="dropdown-item-badge">Zaíra, Bocaina...</span>
                  </Link>
                  <Link to="/maua-em-numeros?filter=territorio" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Regiões de Planejamento 2026</span>
                  </Link>
                  <Link to="/maua-em-numeros?filter=ponderacao" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Áreas de Ponderação Censo IBGE</span>
                  </Link>
                  <Link to="/maua-em-numeros?filter=subdivisao" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Subdivisão Territorial & Densidade</span>
                  </Link>
                </div>
              </li>

              {/* Item: OPPES Indicadores */}
              <li className="nav-item">
                <div 
                  className="nav-link nav-link-dropdown"
                  onClick={() => toggleDropdown('indicadores')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <TrendingUp size={15} />
                    <span>OPPES INDICADORES</span>
                  </div>
                  <ChevronDown 
                    size={13} 
                    style={{ 
                      transition: 'transform 0.2s ease', 
                      transform: mobileDropdown === 'indicadores' ? 'rotate(180deg)' : 'none' 
                    }} 
                  />
                </div>
                <div className={`dropdown-menu ${mobileDropdown === 'indicadores' ? 'mobile-expanded' : ''}`}>
                  <Link to="/indicadores?cat=acidentes-transito" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Acidentes de Trânsito (InfoSiga)</span>
                  </Link>
                  <Link to="/indicadores?cat=assistencia-social" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Assistência Social & CRAS</span>
                  </Link>
                  <Link to="/indicadores?cat=atividade-economica" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Atividade Econômica</span>
                  </Link>
                  <Link to="/indicadores?cat=emprego-formal" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Emprego Formal (Novo CAGED)</span>
                  </Link>
                  <Link to="/indicadores?cat=receita-despesa" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Receita e Despesa Municipal</span>
                  </Link>
                  <Link to="/indicadores?cat=saude-consultas" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Saúde e Atenção Básica</span>
                  </Link>
                  <Link to="/indicadores?cat=seguranca-publica" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Segurança Pública (SSP-SP)</span>
                  </Link>
                </div>
              </li>

              {/* Item: Mauá em Mapas */}
              <li className="nav-item">
                <NavLink 
                  to="/maua-em-mapas" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Compass size={15} />
                    <span>MAUÁ EM MAPAS</span>
                  </div>
                </NavLink>
              </li>

              {/* Item: Documentos */}
              <li className="nav-item">
                <NavLink 
                  to="/documentos" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={15} />
                    <span>DOCUMENTOS</span>
                  </div>
                </NavLink>
              </li>

              {/* Item: Mais / Institucional */}
              <li className="nav-item">
                <div 
                  className="nav-link nav-link-dropdown"
                  onClick={() => toggleDropdown('mais')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Info size={15} />
                    <span>MAIS</span>
                  </div>
                  <ChevronDown 
                    size={13} 
                    style={{ 
                      transition: 'transform 0.2s ease', 
                      transform: mobileDropdown === 'mais' ? 'rotate(180deg)' : 'none' 
                    }} 
                  />
                </div>
                <div className={`dropdown-menu ${mobileDropdown === 'mais' ? 'mobile-expanded' : ''}`}>
                  <button 
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent('open-oppes-chatbot'));
                    }}
                    className="dropdown-item"
                    style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <Bot size={15} color="#B5179E" />
                    <span>Assistente Virtual (ChatBot IA)</span>
                    <span className="dropdown-item-badge">Online</span>
                  </button>
                  <Link to="/dados-abertos" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <Database size={15} color="#2352EE" />
                    <span>OPPES Download (Dados Abertos)</span>
                  </Link>
                  <Link to="/historia-maua" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Mauá – História & Geografia</span>
                  </Link>
                  <Link to="/equipe" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Equipe Técnica OPPES</span>
                  </Link>
                  <Link to="/fale-conosco" className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                    <span>Fale Conosco & LAI</span>
                  </Link>
                  <a 
                    href="https://www.maua.sp.gov.br/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dropdown-item"
                  >
                    <span>Site Oficial Prefeitura de Mauá</span>
                    <ExternalLink size={12} style={{ marginLeft: 'auto' }} />
                  </a>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
