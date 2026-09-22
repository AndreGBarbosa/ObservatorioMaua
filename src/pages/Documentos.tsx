import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  User, 
  Search, 
  CheckCircle,
  Eye
} from 'lucide-react';
import { mauaPublications } from '../data/mauaData';
import type { Publication } from '../data/mauaData';

export const Documentos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activeModalDoc, setActiveModalDoc] = useState<Publication | null>(null);

  const filteredPublications = mauaPublications.filter(pub => {
    const matchesCat = selectedCategory === 'todas' || pub.category === selectedCategory;
    const matchesYear = selectedYear === 'todos' || pub.year.toString() === selectedYear;
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pub.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesYear && matchesSearch;
  });

  const handleDownload = (doc: Publication) => {
    const textContent = `PREFEITURA DO MUNICÍPIO DE MAUÁ\nOPPES MAUÁ - OBSERVATÓRIO DE POLÍTICAS PÚBLICAS, ECONÔMICO E SOCIAL\n\n` +
      `TÍTULO: ${doc.title}\n` +
      `CATEGORIA: ${doc.category}\n` +
      `DATA: ${doc.date}\n` +
      `AUTOR: ${doc.author}\n` +
      `PÁGINAS: ${doc.pages}\n\n` +
      `RESUMO EXECUTIVO:\n${doc.summary}\n\n` +
      `Documento emitido oficialmente pelo portal do Observatório de Mauá em conformidade com as diretrizes de transparência pública.`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${doc.id}-${doc.category.toLowerCase().replace(/ /g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Download de "${doc.title.substring(0, 30)}..." iniciado!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #193DB8 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Acervo Técnico Governamental
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Documentos, Estudos e Publicações • OPPES Mauá
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Acesse os levantamentos analíticos, Sumários de Dados Socioeconômicos, Boletins de Conjuntura, Notas Técnicas e publicações temáticas do município de Mauá.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          {/* Barra de Filtros e Busca */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div className="grid-responsive-filters">
              
              {/* Busca Textual */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--bg-secondary)', padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <Search size={16} color="#64748B" />
                <input 
                  type="text" 
                  placeholder="Pesquisar por título, autor ou palavra-chave..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', width: '100%' }}
                />
              </div>

              {/* Filtro de Categoria */}
              <select 
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '0.6rem' }}
              >
                <option value="todas">Todas as Categorias</option>
                <option value="Boletim de Conjuntura">Boletins de Conjuntura</option>
                <option value="Sumário de Dados">Sumários de Dados</option>
                <option value="Nota Técnica">Notas Técnicas</option>
                <option value="Estudo Temático">Estudos Temáticos</option>
              </select>

              {/* Filtro de Ano */}
              <select 
                className="filter-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ padding: '0.6rem' }}
              >
                <option value="todos">Todos os Anos</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>

            </div>

            {downloadSuccess && (
              <div style={{ marginTop: '1rem', background: '#DCFCE7', color: '#166534', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={15} />
                <span>{downloadSuccess}</span>
              </div>
            )}
          </div>

          {/* Grid de Publicações */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {filteredPublications.map((pub: Publication) => (
              <div 
                key={pub.id}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border-subtle)', 
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="pub-category">{pub.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {pub.fileSize}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: '1.35', marginBottom: '0.75rem' }}>
                  {pub.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem', flex: 1 }}>
                  {pub.summary}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} />
                    <span>{pub.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={13} />
                    <span>{pub.author} • {pub.pages} páginas</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    className="access-btn"
                    style={{ background: 'var(--maua-blue)', color: '#FFF', flex: 1, justifyContent: 'center', padding: '0.55rem' }}
                    onClick={() => handleDownload(pub)}
                  >
                    <Download size={14} />
                    <span>Baixar Arquivo</span>
                  </button>
                  <button 
                    type="button" 
                    className="access-btn"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.55rem 0.85rem' }}
                    onClick={() => setActiveModalDoc(pub)}
                    title="Visualizar ficha técnica"
                  >
                    <Eye size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Modal de Pré-visualização do Documento */}
          {activeModalDoc && (
            <div 
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(4px)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                zIndex: 250, 
                padding: '1rem' 
              }}
              onClick={() => setActiveModalDoc(null)}
            >
              <div 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-xl)', 
                  maxWidth: '560px', 
                  width: '100%', 
                  padding: '2rem', 
                  boxShadow: 'var(--shadow-xl)' 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="pub-category">{activeModalDoc.category}</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.5rem 0', color: 'var(--text-main)' }}>
                  {activeModalDoc.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '1rem 0' }}>
                  {activeModalDoc.summary}
                </p>

                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  <div><strong>Autor:</strong> {activeModalDoc.author}</div>
                  <div><strong>Data de Publicação:</strong> {activeModalDoc.date}</div>
                  <div><strong>Extensão:</strong> {activeModalDoc.pages} páginas • {activeModalDoc.fileSize}</div>
                  <div><strong>Órgão:</strong> Prefeitura Municipal de Mauá / CTI / OPPES</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button 
                    type="button" 
                    className="access-btn" 
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-main)', border: '1px solid var(--border-medium)', padding: '0.5rem 1rem' }}
                    onClick={() => setActiveModalDoc(null)}
                  >
                    Fechar
                  </button>
                  <button 
                    type="button" 
                    className="access-btn" 
                    style={{ background: 'var(--maua-blue)', color: '#FFF', padding: '0.5rem 1.25rem' }}
                    onClick={() => {
                      handleDownload(activeModalDoc);
                      setActiveModalDoc(null);
                    }}
                  >
                    <Download size={14} />
                    <span>Baixar Documento</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};
