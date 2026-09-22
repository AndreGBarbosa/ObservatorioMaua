import React, { useState } from 'react';
import { 
  Download, 
  Layers, 
  FileCode, 
  ExternalLink, 
  Globe, 
  CheckCircle 
} from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { mauaMapPoints } from '../data/mauaData';

export const MauaEmMapas: React.FC = () => {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownloadGeoJson = () => {
    const geoJsonData = {
      type: "FeatureCollection",
      features: mauaMapPoints.map(pt => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [pt.lng, pt.lat]
        },
        properties: {
          id: pt.id,
          nome: pt.name,
          categoria: pt.category,
          endereco: pt.address,
          bairro: pt.bairro,
          detalhes: pt.details
        }
      }))
    };

    const blob = new Blob([JSON.stringify(geoJsonData, null, 2)], { type: "application/geo+json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maua-equipamentos-publicos.geojson";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadMsg("GeoJSON baixado com sucesso!");
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  const handleDownloadKml = () => {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Equipamentos Publicos Maua</name>
    <description>Pontos georreferenciados pelo OPPES Maua</description>
`;

    mauaMapPoints.forEach(pt => {
      kml += `    <Placemark>
      <name>${pt.name}</name>
      <description>${pt.details} - ${pt.address}, ${pt.bairro}</description>
      <Point>
        <coordinates>${pt.lng},${pt.lat},0</coordinates>
      </Point>
    </Placemark>
`;
    });

    kml += `  </Document>
</kml>`;

    const blob = new Blob([kml], { type: "application/vnd.google-earth.kml+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "maua-equipamentos-publicos.kml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadMsg("KML para Google Earth baixado com sucesso!");
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #10277A 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Sistema de Informações Geográficas (SIG)
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Mauá em Mapas • Geoprocessamento & Dados Espaciais
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore e faça o download das camadas cartográficas do município de Mauá: limites de bairros, Unidades de Pronto Atendimento, Hospital Radamés Nardini, escolas municipais e estaduais, o Polo Petroquímico de Capuava e áreas de proteção ambiental.
          </p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          {/* Mapa Interativo */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Visualizador Cartográfico Interativo (SIG Web)
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Selecione as camadas temáticas, filtre por categoria e consulte os dados cadastrais de cada equipamento público.
                </p>
              </div>

              {downloadMsg && (
                <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle size={14} />
                  <span>{downloadMsg}</span>
                </div>
              )}
            </div>

            <InteractiveMap />
          </div>

          {/* Central de Downloads de Arquivos Geográficos (Shapefile, GeoJSON, KML) */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Download size={22} color="#2352EE" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Repositório de Dados Cartográficos para Download
              </h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Baixe as camadas vetorizadas para utilização em softwares SIG (como QGIS, ArcGIS) ou visualização direta no Google Earth.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              
              {/* Card GeoJSON */}
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FileCode size={20} color="#2352EE" />
                  <strong style={{ fontSize: '1rem' }}>GeoJSON (Equipamentos Públicos)</strong>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', flex: 1, marginBottom: '1rem' }}>
                  Base georreferenciada completa com Hospital Nardini, UPAs, UBSs, escolas e Polo Petroquímico de Mauá no padrão universal GeoJSON.
                </p>
                <button 
                  type="button" 
                  className="access-btn"
                  style={{ background: 'var(--maua-blue)', color: '#FFF', justifyContent: 'center', padding: '0.55rem' }}
                  onClick={handleDownloadGeoJson}
                >
                  <Download size={14} />
                  <span>Baixar GeoJSON (.geojson)</span>
                </button>
              </div>

              {/* Card KML (Google Earth) */}
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Globe size={20} color="#B5179E" />
                  <strong style={{ fontSize: '1rem' }}>KML (Google Earth)</strong>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', flex: 1, marginBottom: '1rem' }}>
                  Arquivo formatado para visualização em 3D e passeios virtuais no Google Earth e Google Maps.
                </p>
                <button 
                  type="button" 
                  className="access-btn"
                  style={{ background: 'var(--maua-magenta)', color: '#FFF', justifyContent: 'center', padding: '0.55rem' }}
                  onClick={handleDownloadKml}
                >
                  <Download size={14} />
                  <span>Baixar KML (.kml)</span>
                </button>
              </div>

              {/* Card Bairros CSV */}
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Layers size={20} color="#059669" />
                  <strong style={{ fontSize: '1rem' }}>Tabela Territorial de Bairros (CSV)</strong>
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', flex: 1, marginBottom: '1rem' }}>
                  Tabela com delimitação, área em km², densidade demográfica e população residente por setor dos 14 bairros.
                </p>
                <a 
                  href="#/maua-em-numeros"
                  className="access-btn"
                  style={{ background: '#059669', color: '#FFF', justifyContent: 'center', padding: '0.55rem' }}
                >
                  <Download size={14} />
                  <span>Consultar e Baixar CSV</span>
                </a>
              </div>

            </div>
          </div>

          {/* Seção GeoMauá */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(35,82,238,0.08) 0%, rgba(181,23,158,0.08) 100%)', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid rgba(35,82,238,0.2)', 
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <span className="section-tag">Infraestrutura Espacial</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.35rem 0' }}>
                Portal GeoMauá • Infraestrutura de Dados Espaciais Municipais (IDE)
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '700px', margin: 0 }}>
                O GeoMauá é a plataforma oficial mantida pela Secretaria de Planejamento Urbano e CTI, que reúne aerofotogrametria, cadastro imobiliário multifinalitário e zoneamento urbano municipal.
              </p>
            </div>

            <a 
              href="https://www.maua.sp.gov.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="axis-card-btn"
              style={{ background: 'var(--maua-blue)', color: '#FFF', padding: '0.65rem 1.35rem', borderRadius: 'var(--radius-full)' }}
            >
              <span>Acessar Portal da Prefeitura</span>
              <ExternalLink size={14} />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};
