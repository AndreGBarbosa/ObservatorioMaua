import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  MapPin, 
  TrendingUp, 
  FileSpreadsheet, 
  FileText, 
  Compass, 
  Search, 
  ArrowRight, 
  Building2, 
  HeartPulse, 
  GraduationCap, 
  Briefcase, 
  Calendar,
  Database
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { InteractiveMap } from '../components/InteractiveMap';
import { IbgeIndicatorPanel } from '../components/IbgeIndicatorPanel';
import { mauaOverview, biDashboardsList, mauaPublications } from '../data/mauaData';
import '../utils/chartConfig';
import { Bar, Line } from 'react-chartjs-2';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/indicadores?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="main-content">
      
      {/* 1. HERO INSTITUCIONAL */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            
            <div>
              <div className="hero-pill-badge">
                <Database size={14} />
                <span>OPPES Mauá • Inteligência Territorial & Gestão Pública</span>
              </div>

              <h1 className="hero-title">
                Conheça Mauá por meio de <span>Dados, Mapas e Indicadores</span>
              </h1>

              <p className="hero-subtitle">
                O Observatório de Políticas Públicas, Econômico e Social compila, analisa e espacializa informações demográficas, financeiras e socioeconômicas para transformar a gestão e empoderar o cidadão.
              </p>

              {/* Barra de Pesquisa Global */}
              <form className="hero-search-wrapper" onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  className="hero-search-input" 
                  placeholder="Pesquisar por indicador, bairro, emprego, saúde..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="hero-search-btn">
                  <Search size={16} />
                  <span>Buscar</span>
                </button>
              </form>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Link 
                  to="/bi-dashboards" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    color: '#93C5FD', 
                    fontSize: '0.8125rem', 
                    fontWeight: 600 
                  }}
                >
                  <BarChart3 size={14} />
                  <span>Explorar 9 Painéis BI</span>
                  <ArrowRight size={12} />
                </Link>

                <Link 
                  to="/maua-em-mapas" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    color: '#F472B6', 
                    fontSize: '0.8125rem', 
                    fontWeight: 600 
                  }}
                >
                  <Compass size={14} />
                  <span>Abrir SIG Web & Mapas</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Card com Resumo de Métricas de Mauá */}
            <div className="hero-metrics-card">
              <div className="metrics-card-header">
                <div className="metrics-card-title">Panorama Oficial • IBGE Cidades</div>
                <span className="stat-badge positive">Com Fonte & Ano</span>
              </div>

              <div className="metrics-grid-2x2">
                <div className="metric-item">
                  <div className="metric-label">População Residente</div>
                  <div className="metric-value">{mauaOverview.population.toLocaleString('pt-BR')}</div>
                  <div className="metric-sub">Fonte: IBGE Censo • <strong>Ano: 2022</strong></div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">Produto Interno Bruto</div>
                  <div className="metric-value">R$ {mauaOverview.gdpBillion.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} bi</div>
                  <div className="metric-sub">Fonte: IBGE Contas • <strong>Ano: 2023</strong></div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">Empresas Ativas</div>
                  <div className="metric-value">{mauaOverview.activeCompanies.toLocaleString('pt-BR')}</div>
                  <div className="metric-sub">Fonte: RFB / JUCESP • <strong>Ano: 2025</strong></div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">Área Territorial</div>
                  <div className="metric-value">{mauaOverview.areaKm2.toLocaleString('pt-BR')} km²</div>
                  <div className="metric-sub">Fonte: IBGE Malhas • <strong>Ano: 2024</strong></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STAT CARDS / KPIS DE DESTAQUE */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCard 
              title="Empregos com Carteira Assinada"
              value="88.450"
              change="+2.140 postos"
              isPositive={true}
              source="Novo CAGED / RAIS (MTE)"
              sourceYear="2025"
              footerText="Saldo líquido positivo no município"
              linkUrl="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho"
              linkText="(Consultar no MTE ↗)"
              icon={<Briefcase size={22} />}
              colorScheme="emerald"
            />
            <StatCard 
              title="Orçamento Municipal"
              value="R$ 2,12 bi"
              change="+7.1% vs 2025"
              isPositive={true}
              source="Prefeitura de Mauá / TCE-SP"
              sourceYear="LOA 2026"
              footerText="31,5% aplicado em Saúde Pública"
              icon={<FileSpreadsheet size={22} />}
              colorScheme="blue"
            />
            <StatCard 
              title="Rede de Educação Básica"
              value="80.200 alunos"
              change="187 escolas ativas"
              neutral={true}
              source="INEP • Censo Escolar / QEdu"
              sourceYear="2025"
              footerText="48 municipais • 60+ estaduais • 79 privadas"
              linkUrl="https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9"
              linkText="(Censo 2025 INEP ↗)"
              icon={<GraduationCap size={22} />}
              colorScheme="magenta"
            />
            <StatCard 
              title="Consultas e Atendimentos SUS"
              value="864.200"
              change="23 UBSs + Hospital"
              isPositive={true}
              source="Secretaria de Saúde / SUS"
              sourceYear="2025"
              footerText="Hospital Nardini & 4 UPAs"
              icon={<HeartPulse size={22} />}
              colorScheme="cyan"
            />
          </div>
        </div>
      </section>

      {/* 2.5 PAINEL OFICIAL IBGE CIDADES */}
      <section className="section-wrapper" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <IbgeIndicatorPanel />
        </div>
      </section>

      {/* 3. SEÇÃO DOS 6 EIXOS PRINCIPAIS */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header-wrap">
            <div>
              <span className="section-tag">Navegue por Temas</span>
              <h2 className="section-heading">Eixos de Informação do OPPES Mauá</h2>
              <p className="section-description">
                Acesse dados estatísticos consolidados, pesquisas socioeconômicas e inteligência geográfica organizados em módulos estruturados.
              </p>
            </div>
          </div>

          <div className="axes-grid">
            
            {/* Eixo 1: BI OPPES */}
            <div className="axis-card">
              <div className="axis-card-icon">
                <BarChart3 size={26} />
              </div>
              <h3 className="axis-card-title">BI OPPES Mauá</h3>
              <p className="axis-card-text">
                Resumo demográfico combinado com dados do CadÚnico, CNPJs ativos, RAIS/CAGED, indicadores econômicos, ICMS arrecadado, vulnerabilidade social e estabelecimentos de saúde e ensino em ambiente interativo.
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>9 Dashboards</span>
                <Link to="/bi-dashboards" className="axis-card-btn">
                  <span>Acessar Painéis</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Eixo 2: Orçamento 2026 */}
            <div className="axis-card">
              <div className="axis-card-icon" style={{ background: 'rgba(181, 23, 158, 0.1)', color: '#B5179E' }}>
                <FileSpreadsheet size={26} />
              </div>
              <h3 className="axis-card-title">Orçamento 2026</h3>
              <p className="axis-card-text">
                Detalhamento de toda a despesa realizada e receita arrecadada pela Administração Direta e Indireta de Mauá em 2025/2026, com dados obtidos e conferidos no Tribunal de Contas do Estado de São Paulo (TCE/SP).
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Contas Públicas</span>
                <Link to="/orcamento" className="axis-card-btn">
                  <span>Ver Orçamento</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Eixo 3: Mauá em Números */}
            <div className="axis-card">
              <div className="axis-card-icon" style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#0284C7' }}>
                <MapPin size={26} />
              </div>
              <h3 className="axis-card-title">Mauá em Números</h3>
              <p className="axis-card-text">
                Dados demográficos, domicílios e infraestrutura mapeados para os 14 Bairros Oficiais de Mauá (Zaíra, Bocaina, Guapituba, Itapeva, etc.), territórios de planejamento e áreas de ponderação do IBGE.
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>14 Bairros</span>
                <Link to="/maua-em-numeros" className="axis-card-btn">
                  <span>Consultar Territórios</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Eixo 4: OPPES Indicadores */}
            <div className="axis-card">
              <div className="axis-card-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                <TrendingUp size={26} />
              </div>
              <h3 className="axis-card-title">OPPES Indicadores</h3>
              <p className="axis-card-text">
                Monitore mensalmente as séries históricas: acidentes de trânsito (InfoSiga), famílias no CadÚnico e Bolsa Família, emprego formal (CAGED), saúde, receita e índices de segurança pública (SSP-SP).
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Séries Mensais</span>
                <Link to="/indicadores" className="axis-card-btn">
                  <span>Ver Séries</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Eixo 5: Mauá em Mapas */}
            <div className="axis-card">
              <div className="axis-card-icon" style={{ background: 'rgba(217, 119, 6, 0.1)', color: '#D97706' }}>
                <Compass size={26} />
              </div>
              <h3 className="axis-card-title">Mauá em Mapas (SIG)</h3>
              <p className="axis-card-text">
                Recursos de geoprocessamento e análise espacial. Camadas interativas com UPAs, UBSs, escolas, Polo Petroquímico, parques e áreas de preservação ambiental com download de arquivos Shapefile, GeoJSON e KML.
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>SIG Web & Downloads</span>
                <Link to="/maua-em-mapas" className="axis-card-btn">
                  <span>Abrir Mapa</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Eixo 6: Documentos e Publicações */}
            <div className="axis-card">
              <div className="axis-card-icon" style={{ background: 'rgba(100, 116, 139, 0.1)', color: '#475569' }}>
                <FileText size={26} />
              </div>
              <h3 className="axis-card-title">Documentos & Estudos</h3>
              <p className="axis-card-text">
                Acesse levantamentos consolidados, Sumários de Dados Socioeconômicos, Boletins de Conjuntura, Notas Técnicas e cadernos temáticos produzidos pela equipe do Observatório de Mauá.
              </p>
              <div className="axis-card-footer">
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Acervo Técnico</span>
                <Link to="/documentos" className="axis-card-btn">
                  <span>Ver Publicações</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEÇÃO GRÁFICA DE DESTAQUE */}
      <section className="section-wrapper bg-alt">
        <div className="container">
          <div className="section-header-wrap">
            <div>
              <span className="section-tag">Visualização de Dados</span>
              <h2 className="section-heading">Indicadores Econômicos e Demográficos</h2>
              <p className="section-description">
                Acompanhe a trajetória de crescimento do PIB municipal e a composição da pirâmide etária de Mauá.
              </p>
            </div>
            <Link to="/bi-dashboards" className="pub-btn" style={{ fontSize: '0.9rem' }}>
              <span>Ver todos os 9 dashboards interativos</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Gráfico 1: PIB */}
            <div className="chart-card-wrapper">
              <div className="chart-card-header">
                <div>
                  <h3 className="chart-title">Evolução do PIB de Mauá (2020 - 2025)</h3>
                  <p className="chart-desc">Em bilhões de Reais (R$) a preços correntes • Fonte: IBGE / SEADE</p>
                </div>
                <span className="stat-badge positive">+24,8% no período</span>
              </div>
              <div style={{ height: '280px' }}>
                <Line 
                  data={biDashboardsList[1].chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { grid: { color: '#F1F5F9' }, ticks: { callback: (v) => `R$ ${v} bi` } },
                      x: { grid: { display: false } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Gráfico 2: Pirâmide Etária */}
            <div className="chart-card-wrapper">
              <div className="chart-card-header">
                <div>
                  <h3 className="chart-title">População por Faixa Etária e Gênero</h3>
                  <p className="chart-desc">Distribuição censitária municipal • Censo Demográfico 2022</p>
                </div>
                <span className="stat-badge neutral">418.261 hab</span>
              </div>
              <div style={{ height: '280px' }}>
                <Bar 
                  data={biDashboardsList[0].chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { position: 'top', labels: { boxWidth: 12 } } 
                    },
                    scales: {
                      y: { grid: { color: '#F1F5F9' }, ticks: { callback: (v) => `${Number(v) / 1000}k` } },
                      x: { grid: { display: false } }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO GEOGRÁFICA INTERATIVA: MAUÁ EM MAPAS */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header-wrap">
            <div>
              <span className="section-tag">Geoprocessamento Integrado</span>
              <h2 className="section-heading">Equipamentos Públicos e Território de Mauá</h2>
              <p className="section-description">
                Explore a localização das Unidades de Pronto Atendimento, Hospital Nardini, escolas, CRAS e o complexo do Polo Petroquímico no mapa interativo.
              </p>
            </div>
            <Link to="/maua-em-mapas" className="pub-btn" style={{ fontSize: '0.9rem' }}>
              <span>Acessar portal completo de Mapas & Downloads</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <InteractiveMap />
        </div>
      </section>

      {/* 6. SLIDER / CARDS DE PUBLICAÇÕES */}
      <section className="section-wrapper bg-alt">
        <div className="container">
          <div className="section-header-wrap">
            <div>
              <span className="section-tag">Estudos & Documentos</span>
              <h2 className="section-heading">Publicações Recentes do Observatório</h2>
              <p className="section-description">
                Pesquisas e relatórios técnicos produzidos para subsidiar o planejamento de políticas públicas.
              </p>
            </div>
            <Link to="/documentos" className="pub-btn" style={{ fontSize: '0.9rem' }}>
              <span>Ver todos os documentos</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="cards-slider-container">
            <div className="slider-cards-grid">
              {mauaPublications.slice(0, 4).map((pub) => (
                <div key={pub.id} className="publication-card">
                  <span className="pub-category">{pub.category}</span>
                  <h3 className="pub-title">{pub.title}</h3>
                  <div className="pub-date">
                    <Calendar size={13} />
                    <span>{pub.date}</span>
                  </div>
                  <p className="pub-excerpt">{pub.summary}</p>
                  <Link to={`/documentos?doc=${pub.id}`} className="pub-btn">
                    <span>Acessar Documento</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. BASES DE DADOS OFICIAIS E PARCERIAS */}
      <section className="section-wrapper">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            <span className="section-tag">Fontes Oficiais Confiáveis</span>
            <h2 className="section-heading" style={{ fontSize: '1.85rem' }}>Bases Integradas ao OPPES Mauá</h2>
            <p className="section-description" style={{ margin: '0 auto' }}>
              Os dados disponibilizados no Observatório de Mauá são integrados de fontes públicas oficiais com rigor estatístico.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <a 
              href="https://cidades.ibge.gov.br/brasil/sp/maua/panorama" 
              target="_blank" 
              rel="noopener noreferrer"
              className="axis-card"
              style={{ padding: '1.25rem', textAlign: 'center' }}
            >
              <Building2 size={28} color="#2352EE" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>IBGE Cidades</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Censo Demográfico 2022 e estimativas populacionais</p>
            </a>

            <a 
              href="https://municipios.seade.gov.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="axis-card"
              style={{ padding: '1.25rem', textAlign: 'center' }}
            >
              <TrendingUp size={28} color="#B5179E" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Fundação SEADE</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Índice de Vulnerabilidade (IPVS) e PIB Municipal</p>
            </a>

            <a 
              href="https://www.tce.sp.gov.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="axis-card"
              style={{ padding: '1.25rem', textAlign: 'center' }}
            >
              <FileSpreadsheet size={28} color="#0284C7" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>TCE-SP</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Receitas e despesas orçamentárias fiscalizadas</p>
            </a>

            <a 
              href="https://www.infosiga.sp.gov.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="axis-card"
              style={{ padding: '1.25rem', textAlign: 'center' }}
            >
              <Compass size={28} color="#10B981" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.25rem' }}>InfoSiga SP</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Segurança viária e sinistros de trânsito em tempo real</p>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
