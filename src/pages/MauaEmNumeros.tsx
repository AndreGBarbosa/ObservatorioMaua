import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  ArrowRightLeft,
  Database
} from 'lucide-react';
import { mauaBairros } from '../data/mauaData';
import { IbgeIndicatorPanel } from '../components/IbgeIndicatorPanel';
import '../utils/chartConfig';
import { Bar } from 'react-chartjs-2';

export const MauaEmNumeros: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Comparador de 2 bairros
  const [bairroAId, setBairroAId] = useState<string>(mauaBairros[0].id);
  const [bairroBId, setBairroBId] = useState<string>(mauaBairros[1].id);

  const filteredBairros = mauaBairros.filter(b => {
    const matchesRegion = selectedRegion === 'todas' || b.region.toLowerCase().includes(selectedRegion.toLowerCase());
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.mainLandmarks.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const chartData = {
    labels: mauaBairros.map(b => b.name),
    datasets: [
      {
        label: 'População Residente (hab)',
        data: mauaBairros.map(b => b.population),
        backgroundColor: '#2352EE'
      }
    ]
  };

  const bairroA = mauaBairros.find(b => b.id === bairroAId) || mauaBairros[0];
  const bairroB = mauaBairros.find(b => b.id === bairroBId) || mauaBairros[1];

  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Bairro,Regiao,Populacao (hab),Domicilios,Area (km2),Densidade (hab/km2),Escolas Publicas,Unidades de Saude\n";
    mauaBairros.forEach(b => {
      csvContent += `"${b.name}","${b.region}",${b.population},${b.households},${b.areaKm2},${b.densityHabKm2},${b.publicSchools},${b.healthUnits}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "maua-bairros-oficiais.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content">
      {/* Top Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #193DB8 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Território & Bairros Oficiais
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Mauá em Números • Indicadores por Bairro
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Conheça as características demográficas, a malha de domicílios, a densidade e os equipamentos públicos distribuídos nos 14 Bairros Oficiais e Regiões de Planejamento de Mauá com base no Censo IBGE 2022.
          </p>
        </div>
      </section>

      {/* Seção Principal de Conteúdo */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          {/* Painel Oficial IBGE Cidades */}
          <IbgeIndicatorPanel />

          {/* Gráfico de População por Bairro */}
          <div className="chart-card-wrapper" style={{ marginBottom: '2.5rem' }}>
            <div className="chart-card-header">
              <div>
                <h3 className="chart-title">População Residente por Bairro Oficial de Mauá</h3>
                <p className="chart-desc">Censo Demográfico IBGE 2022 • Agregação por setores censitários</p>
              </div>
              <span className="stat-badge positive">14 Bairros Mapeados</span>
            </div>
            <div style={{ height: '350px' }}>
              <Bar 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false }, ticks: { maxRotation: 45, minRotation: 45, font: { size: 11 } } },
                    y: { grid: { color: '#F1F5F9' }, ticks: { callback: (v) => `${Number(v) / 1000}k` } }
                  }
                }}
              />
            </div>
          </div>

          {/* Comparador Interativo Lado a Lado de Bairros */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <ArrowRightLeft size={20} color="#2352EE" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Comparador Territorial: Compare 2 Bairros de Mauá
              </h3>
            </div>

            <div className="grid-responsive-2col">
              {/* Bairro A */}
              <div style={{ background: 'var(--maua-blue-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(35,82,238,0.2)' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Selecione o Bairro 1:
                </label>
                <select 
                  className="filter-select" 
                  value={bairroAId} 
                  onChange={(e) => setBairroAId(e.target.value)}
                  style={{ width: '100%', marginBottom: '1.25rem', padding: '0.6rem' }}
                >
                  {mauaBairros.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.region})</option>
                  ))}
                </select>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>População:</span>
                    <strong>{bairroA.population.toLocaleString('pt-BR')} hab</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Domicílios:</span>
                    <strong>{bairroA.households.toLocaleString('pt-BR')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Área:</span>
                    <strong>{bairroA.areaKm2} km²</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Densidade:</span>
                    <strong>{bairroA.densityHabKm2.toLocaleString('pt-BR')} hab/km²</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Escolas Públicas:</span>
                    <strong>{bairroA.publicSchools} unidades</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Unidades de Saúde:</span>
                    <strong>{bairroA.healthUnits} unidades</strong>
                  </div>
                </div>
              </div>

              {/* Bairro B */}
              <div style={{ background: 'var(--maua-magenta-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(181,23,158,0.2)' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  Selecione o Bairro 2:
                </label>
                <select 
                  className="filter-select" 
                  value={bairroBId} 
                  onChange={(e) => setBairroBId(e.target.value)}
                  style={{ width: '100%', marginBottom: '1.25rem', padding: '0.6rem' }}
                >
                  {mauaBairros.map(b => (
                    <option key={b.id} value={b.id}>{b.name} ({b.region})</option>
                  ))}
                </select>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>População:</span>
                    <strong>{bairroB.population.toLocaleString('pt-BR')} hab</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Domicílios:</span>
                    <strong>{bairroB.households.toLocaleString('pt-BR')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Área:</span>
                    <strong>{bairroB.areaKm2} km²</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Densidade:</span>
                    <strong>{bairroB.densityHabKm2.toLocaleString('pt-BR')} hab/km²</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Escolas Públicas:</span>
                    <strong>{bairroB.publicSchools} unidades</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Unidades de Saúde:</span>
                    <strong>{bairroB.healthUnits} unidades</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela dos Bairros com Filtros */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Tabela Demográfica dos Bairros Oficiais
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Recorte geográfico municipal de acordo com a Lei de Zoneamento Urbano de Mauá.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
                  <Search size={14} color="#64748B" />
                  <input 
                    type="text" 
                    placeholder="Filtrar bairro ou referência..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8125rem', width: '180px' }}
                  />
                </div>

                <select 
                  className="filter-select"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="todas">Todas as Regiões</option>
                  <option value="norte">Região Norte</option>
                  <option value="sul">Região Sul</option>
                  <option value="leste">Região Leste</option>
                  <option value="oeste">Região Oeste</option>
                  <option value="central">Região Central</option>
                </select>

                <button 
                  type="button" 
                  className="access-btn" 
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.45rem 0.85rem' }}
                  onClick={handleDownloadCsv}
                >
                  <Download size={14} />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bairro Oficial</th>
                    <th>Região de Mauá</th>
                    <th>População (hab)</th>
                    <th>Domicílios</th>
                    <th>Área (km²)</th>
                    <th>Densidade</th>
                    <th>Escolas</th>
                    <th>Saúde</th>
                    <th>Marcos & Equipamentos</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBairros.map((b) => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 700, color: '#2352EE' }}>{b.name}</td>
                      <td>
                        <span className="stat-badge neutral" style={{ fontSize: '0.72rem' }}>
                          {b.region}
                        </span>
                      </td>
                      <td>{b.population.toLocaleString('pt-BR')}</td>
                      <td>{b.households.toLocaleString('pt-BR')}</td>
                      <td>{b.areaKm2} km²</td>
                      <td>{b.densityHabKm2.toLocaleString('pt-BR')} hab/km²</td>
                      <td>{b.publicSchools}</td>
                      <td>{b.healthUnits}</td>
                      <td style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {b.mainLandmarks.join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-light)', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <Database size={12} color="#2352EE" />
                <span>Fonte: <strong>IBGE Censo Demográfico / Malhas Territoriais 2024 / Planejamento Mauá</strong></span>
                <span>•</span>
                <span style={{ color: 'var(--maua-blue)', fontWeight: 700 }}>Ano: 2022 a 2025</span>
              </div>
              <a 
                href="https://cidades.ibge.gov.br/brasil/sp/maua/panorama" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--maua-blue)', fontWeight: 600, textDecoration: 'none' }}
              >
                Conferir no IBGE Panorama Mauá ↗
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
