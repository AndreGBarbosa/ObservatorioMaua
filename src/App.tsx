import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieAlert } from './components/CookieAlert';
import { ObservatorioChatbot } from './components/ObservatorioChatbot';

import { Home } from './pages/Home';
import { BiDashboards } from './pages/BiDashboards';
import { Orcamento } from './pages/Orcamento';
import { MauaEmNumeros } from './pages/MauaEmNumeros';
import { Indicadores } from './pages/Indicadores';
import { MauaEmMapas } from './pages/MauaEmMapas';
import { Documentos } from './pages/Documentos';
import { DadosAbertos } from './pages/DadosAbertos';
import { HistoriaMaua } from './pages/HistoriaMaua';
import { Equipe } from './pages/Equipe';
import { FaleConosco } from './pages/FaleConosco';

// Helper para rolar para o topo da página ao mudar de rota
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <HashRouter>
      <ScrollToTopOnRoute />
      <AccessibilityBar />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bi-dashboards" element={<BiDashboards />} />
          <Route path="/orcamento" element={<Orcamento />} />
          <Route path="/maua-em-numeros" element={<MauaEmNumeros />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/maua-em-mapas" element={<MauaEmMapas />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/dados-abertos" element={<DadosAbertos />} />
          <Route path="/historia-maua" element={<HistoriaMaua />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CookieAlert />
      <ObservatorioChatbot />
    </HashRouter>
  );
}

export default App;
