import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ChevronUp, 
  Building, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer-official">
        <div className="container">
          <div className="footer-grid">
            
            {/* Coluna 1: Informações Institucionais */}
            <div>
              <div className="footer-brand-title">
                <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                  <path d="M50 5 L88 20 V52 C88 74 50 94 50 94 C50 94 12 74 12 52 V20 Z" fill="#2352EE"/>
                  <path d="M50 16 L76 26 V48 C76 64 50 78 50 78 C50 78 24 64 24 48 V26 Z" fill="#B5179E"/>
                  <circle cx="50" cy="46" r="12" fill="#FFFFFF"/>
                </svg>
                <span>OPPES MAUÁ</span>
              </div>
              <p className="footer-desc">
                Observatório de Políticas Públicas, Econômico e Social de Mauá. Instrumento oficial de inteligência territorial, transparência pública, indicadores municipais e apoio à tomada de decisão da gestão municipal.
              </p>

              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>Paço Municipal: Av. João Ramalho, 205 – Vila Noêmia, Mauá - SP | CEP 09371-520</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>Telefone Geral: (11) 4512-7500 | Atendimento: (11) 4512-7661</span>
                </div>
                <div className="footer-contact-item">
                  <Mail size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span>Ouvidoria Geral do Município: (11) 4512-7847</span>
                </div>
              </div>

              <div className="footer-social-row">
                <a 
                  href="https://www.facebook.com/prefeitura.maua/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn"
                  title="Facebook Prefeitura de Mauá"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/prefeiturademaua/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn"
                  title="Instagram Prefeitura de Mauá"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href="https://www.youtube.com/@prefeiturademaua" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon-btn"
                  title="YouTube Prefeitura de Mauá"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Inteligência e BIs */}
            <div>
              <h4 className="footer-col-heading">Painéis de BI</h4>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-maua-geral">BI Mauá Geral (Demografia)</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-economia-maua">BI Economia & Polo Petroquímico</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-cnpj-maua">BI CNPJ & Dinâmica Empresarial</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-estabel-saude">BI Estabelecimentos de Saúde</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-censo-escolar">BI Censo Escolar 2025</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-vulnerabilidade">BI Vulnerabilidade Social (IPVS)</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-emprego-rais">BI Emprego Formal (Novo CAGED)</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/bi-dashboards?tab=bi-energia-semil">BI Energia & Consumo Setorial (SEMIL)</Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Território & Indicadores */}
            <div>
              <h4 className="footer-col-heading">Território & Dados</h4>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <Link to="/maua-em-numeros">14 Bairros Oficiais de Mauá</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/maua-em-mapas">Mauá em Mapas (SIG Web)</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/orcamento">Orçamento Municipal 2026</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/indicadores">Indicadores Periódicos</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/documentos">Sumários & Boletins de Conjuntura</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/dados-abertos">Download de Dados Abertos (CSV)</Link>
                </li>
              </ul>
            </div>

            {/* Coluna 4: Transparência e Canais Oficiais */}
            <div>
              <h4 className="footer-col-heading">Transparência & Apoio</h4>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <a href="https://transparencia.maua.sp.gov.br/" target="_blank" rel="noopener noreferrer">
                    <ShieldCheck size={14} />
                    <span>Portal da Transparência</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="https://www.maua.sp.gov.br/" target="_blank" rel="noopener noreferrer">
                    <Globe size={14} />
                    <span>Portal Oficial da Prefeitura</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="https://www.ibge.gov.br/cidades-e-estados/sp/maua.html" target="_blank" rel="noopener noreferrer">
                    <Building size={14} />
                    <span>IBGE Cidades: Mauá (SP)</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
                <li className="footer-nav-item">
                  <a href="https://municipios.seade.gov.br/" target="_blank" rel="noopener noreferrer">
                    <span>Fundação SEADE – Dados Mauá</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
                <li className="footer-nav-item">
                  <Link to="/historia-maua">História & Perfil do Município</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/equipe">Equipe Técnica OPPES</Link>
                </li>
                <li className="footer-nav-item">
                  <Link to="/fale-conosco">Fale Conosco / Solicitação de Dados</Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <div>
              © {new Date().getFullYear()} Prefeitura do Município de Mauá • CNPJ: 46.522.959/0001-98. Todos os direitos reservados.
            </div>
            <div>
              Desenvolvido pela <strong>CTI – Coordenadoria de Tecnologia da Informação</strong> • OPPES Mauá
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      <button 
        type="button" 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo da página"
        title="Voltar ao topo"
      >
        <ChevronUp size={22} />
      </button>
    </>
  );
};
