import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Database, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { socioIndicatorsList } from '../data/mauaData';
import type { SocioIndicator } from '../data/mauaData';
import '../utils/chartConfig';
import { Line } from 'react-chartjs-2';

export const Indicadores: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const catFromUrl = searchParams.get('cat');
  const searchFromUrl = searchParams.get('search') || '';

  const [selectedCat, setSelectedCat] = useState<string>(catFromUrl || 'todos');
  const [searchTerm] = useState<string>(searchFromUrl);

  useEffect(() => {
    if (catFromUrl) {
      setSelectedCat(catFromUrl);
    }
  }, [catFromUrl]);

  const filteredIndicators = socioIndicatorsList.filter(ind => {
    const matchesCat = selectedCat === 'todos' || ind.id === selectedCat;
    const matchesSearch = ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ind.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ind.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCatChange = (catId: string) => {
    setSelectedCat(catId);
    if (catId === 'todos') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catId);
    }
    setSearchParams(searchParams);
  };

  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Indicador,Eixo,Mes,Valor Registrado,Unidade,Fonte\n";
    socioIndicatorsList.forEach(ind => {
      ind.historicalSeries.forEach(s => {
        csvContent += `"${ind.name}","${ind.category}","${s.month}",${s.value},"${ind.unit}","${ind.source}"\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "indicadores-socioeconomicos-maua.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Monitoramento Periódico de Políticas Públicas
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            OPPES Indicadores • Séries Históricas
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Acompanhamento contínuo dos principais indicadores sociais, econômicos, fiscais, de saúde, segurança e mobilidade urbana do município de Mauá, com atualização mensal.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          {/* Barra de Filtros */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} color="#2352EE" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Filtrar por Eixo Temático</h3>
              </div>

              <button 
                type="button" 
                className="access-btn" 
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.45rem 0.85rem' }}
                onClick={handleDownloadCsv}
              >
                <Download size={14} />
                <span>Exportar Todas as Séries (.CSV)</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className={`layer-toggle-btn ${selectedCat === 'todos' ? 'active' : ''}`}
                onClick={() => handleCatChange('todos')}
              >
                Todos os 7 Eixos
              </button>
              {socioIndicatorsList.map(ind => (
                <button
                  key={ind.id}
                  type="button"
                  className={`layer-toggle-btn ${selectedCat === ind.id ? 'active' : ''}`}
                  onClick={() => handleCatChange(ind.id)}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Indicadores com Gráficos das Séries Históricas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {filteredIndicators.map((indicator: SocioIndicator) => {
              const isPositiveChange = indicator.changePercent >= 0;
              const lineChartData = {
                labels: indicator.historicalSeries.map(s => s.month),
                datasets: [
                  {
                    label: indicator.name,
                    data: indicator.historicalSeries.map(s => s.value),
                    borderColor: '#2352EE',
                    backgroundColor: 'rgba(35, 82, 238, 0.12)',
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: '#2352EE',
                    pointRadius: 4
                  }
                ]
              };

              return (
                <div 
                  key={indicator.id} 
                  style={{ 
                    background: '#FFFFFF', 
                    borderRadius: 'var(--radius-lg)', 
                    border: '1px solid var(--border-subtle)', 
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div className="grid-responsive-form" style={{ alignItems: 'center' }}>
                    
                    {/* Coluna de Informações e Valor Corrente */}
                    <div>
                      <span className="pub-category">{indicator.category}</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.4rem 0' }}>
                        {indicator.name}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                        {indicator.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)' }}>
                          {indicator.currentValue.toLocaleString('pt-BR')}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 500 }}>
                          {indicator.unit}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                        <span className={`stat-badge ${isPositiveChange ? 'positive' : ''}`} style={{ fontSize: '0.8rem' }}>
                          {isPositiveChange ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                          <span>{Math.abs(indicator.changePercent)}% vs mês anterior</span>
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                          (Anterior: {indicator.lastMonthValue} {indicator.unit})
                        </span>
                      </div>

                      <div style={{ 
                        fontSize: '0.78rem', 
                        color: 'var(--text-light)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        flexWrap: 'wrap', 
                        gap: '0.5rem', 
                        borderTop: '1px solid var(--border-subtle)', 
                        paddingTop: '0.75rem' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                          <Database size={13} color="#2352EE" />
                          <span>Fonte: <strong>{indicator.source}</strong></span>
                          <span>•</span>
                          <span style={{ color: 'var(--maua-blue)', fontWeight: 700 }}>Ano: {indicator.year || '2025'}</span>
                        </div>
                        {indicator.sourceUrl && (
                          <a 
                            href={indicator.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.25rem', 
                              color: 'var(--maua-blue)', 
                              fontWeight: 600, 
                              fontSize: '0.75rem', 
                              textDecoration: 'none' 
                            }}
                            title="Consultar base oficial na fonte"
                          >
                            <span>Base Oficial ↗</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Coluna do Gráfico da Série Histórica */}
                    <div style={{ height: '260px' }}>
                      <Line 
                        data={lineChartData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          scales: {
                            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                            y: { grid: { color: '#F1F5F9' } }
                          }
                        }}
                      />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
};
