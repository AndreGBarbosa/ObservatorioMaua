import React from 'react';
import { Compass, Award } from 'lucide-react';

export const HistoriaMaua: React.FC = () => {
  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #10277A 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Memória, Identidade & Território
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            História & Perfil Geográfico de Mauá
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Da histórica Estação Pilar à capital da porcelana e maior polo petroquímico do Grande ABC: a trajetória de trabalho, orgulho e desenvolvimento de Mauá.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div className="grid-responsive-sidebar" style={{ alignItems: 'flex-start' }}>
            
            {/* Texto Histórico */}
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
              
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                Origem e o Legado do Visconde de Mauá
              </h2>
              
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.25rem', fontSize: '1rem' }}>
                As primeiras referências históricas à região do atual município de Mauá remontam ao século XVIII, como ponto de passagem de tropeiros entre o planalto paulista e o litoral de Santos pelo antigo Caminho do Mar. O vilarejo original denominava-se <strong>Cassaquera</strong> e, posteriormente, <strong>Pilar</strong>.
              </p>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1rem' }}>
                Em 1867, com a inauguração da histórica ferrovia <strong>São Paulo Railway (Santos-Jundiaí)</strong>, a primeira ferrovia paulista, foi instalada a Estação do Pilar. Em 1926, por solicitação da comunidade local e da companhia inglesa, a estação e o vilarejo foram rebatizados como <strong>Mauá</strong>, em solene homenagem a <strong>Irineu Evangelista de Sousa</strong> (1813–1889), o Barão e Visconde de Mauá, pioneiro da modernização industrial, navegação a vapor e transportes ferroviários no Brasil.
              </p>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '2rem 0 1rem' }}>
                A Capital da Louça e Porcelana
              </h3>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1rem' }}>
                A partir da década de 1930, a abundância de jazidas de argila de excepcional qualidade e a facilidade do transporte ferroviário transformaram Mauá no maior polo cerâmico do país. Instalaram-se gigantes industriais como a <strong>Porcelana Schmidt</strong>, a <strong>Cerâmica Matarazzo</strong> e a <strong>Cerâmica Mauá</strong>, conferindo à cidade o título histórico de <em>"Capital da Louça e da Porcelana"</em>, atraindo levas de operários e imigrantes italianos, japoneses, espanhóis e migrantes de todas as regiões brasileiras.
              </p>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '2rem 0 1rem' }}>
                O Polo Petroquímico de Capuava e a Emancipação
              </h3>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem', fontSize: '1rem' }}>
                Em 1954, ocorreu um marco decisivo: a fundação da <strong>Refinaria de Capuava (RECAP)</strong>, projeto pioneiro que deu origem ao <strong>Polo Petroquímico do Grande ABC</strong>, até hoje um dos pilares da indústria de transformação paulista e nacional. No mesmo ano emblemático, após expressivo plebiscito popular, Mauá conquistou sua emancipação político-administrativa de Santo André em <strong>8 de dezembro de 1954</strong>.
              </p>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: '2rem 0 1rem' }}>
                Aspectos Geográficos e Ambientais
              </h3>

              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, fontSize: '1rem' }}>
                Mauá ocupa uma área territorial de <strong>61,9 km²</strong> no topo da escarpa da Serra do Mar. Possui como elemento de orgulho ecológico a nascente do <strong>Rio Tamanduateí</strong>, localizada no <strong>Parque Natural Municipal Gruta Santa Luzia</strong>, e integra a bacia hidrográfica da <strong>Represa Billings</strong>, com expressivas áreas de proteção ambiental (APA dos Mananciais) e o exuberante <strong>Parque Ecológico Guapituba</strong>.
              </p>

            </div>

            {/* Sidebar com Fatos e Cronologia */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={18} color="#2352EE" />
                  <span>Símbolos Municipais</span>
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div><strong>Lema:</strong> <em>"Malo Mori Quam Foedari"</em> / "Trabalho, Orgulho e Desenvolvimento"</div>
                  <div><strong>Padroeira:</strong> Imaculada Conceição (8 de dezembro)</div>
                  <div><strong>Aniversário:</strong> 8 de Dezembro (Emancipação 1954)</div>
                  <div><strong>Gentílico:</strong> Mauaense</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Compass size={18} color="#B5179E" />
                  <span>Linha do Tempo</span>
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8125rem' }}>
                  <div style={{ borderLeft: '2px solid #2352EE', paddingLeft: '0.75rem' }}>
                    <strong style={{ color: '#2352EE' }}>1867</strong>
                    <div style={{ color: '#64748B' }}>Inauguração da Estação Pilar na Ferrovia Santos-Jundiaí.</div>
                  </div>
                  <div style={{ borderLeft: '2px solid #B5179E', paddingLeft: '0.75rem' }}>
                    <strong style={{ color: '#B5179E' }}>1926</strong>
                    <div style={{ color: '#64748B' }}>A vila passa a se chamar oficialmente Mauá.</div>
                  </div>
                  <div style={{ borderLeft: '2px solid #0284C7', paddingLeft: '0.75rem' }}>
                    <strong style={{ color: '#0284C7' }}>1937</strong>
                    <div style={{ color: '#64748B' }}>Início do ciclo das indústrias de porcelana e louça.</div>
                  </div>
                  <div style={{ borderLeft: '2px solid #10B981', paddingLeft: '0.75rem' }}>
                    <strong style={{ color: '#10B981' }}>1954</strong>
                    <div style={{ color: '#64748B' }}>Início da Refinaria Recap e Emancipação Política.</div>
                  </div>
                  <div style={{ borderLeft: '2px solid #F59E0B', paddingLeft: '0.75rem' }}>
                    <strong style={{ color: '#F59E0B' }}>2022 / 2026</strong>
                    <div style={{ color: '#64748B' }}>Censo aponta 418.261 moradores e consolidação como polo de serviços e tecnologia.</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
