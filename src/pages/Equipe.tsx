import React from 'react';
import { Building, Laptop, BarChart2 } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  department: string;
  expertise: string;
}

export const Equipe: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Coordenação Geral do OPPES',
      role: 'Gestor Governamental & Coordenação Estratégica',
      department: 'Secretaria de Planejamento Urbano e CTI',
      expertise: 'Coordenação intersetorial de dados, desenho de políticas públicas e governança informacional.'
    },
    {
      name: 'Núcleo de Estatística & Análise de Dados',
      role: 'Especialistas em Estatística e Indicadores',
      department: 'OPPES Mauá / SEPLAN',
      expertise: 'Consolidação de microdados censitários, séries temporais do CAGED, demografia e projeções.'
    },
    {
      name: 'Núcleo de Geoprocessamento & SIG (GeoMauá)',
      role: 'Engenheiros Cartógrafos & Geógrafos',
      department: 'Coordenadoria de Tecnologia da Informação (CTI)',
      expertise: 'Cartografia digital, estruturação de camadas espaciais, Shapefile, KML e análise territorial.'
    },
    {
      name: 'Núcleo de Inteligência Econômica & Fiscal',
      role: 'Analistas Econômicos e Fiscais',
      department: 'Secretaria de Finanças / SEDET Mauá',
      expertise: 'Acompanhamento do Valor Adicionado Fiscal (VAF), execução orçamentária no TCE-SP e PIB.'
    },
    {
      name: 'Núcleo de Desenvolvimento de Sistemas & BI',
      role: 'Arquitetos de Software e Cientistas de Dados',
      department: 'CTI - Coordenadoria de Tecnologia da Informação',
      expertise: 'Desenvolvimento do portal, pipelines de dados automatizados, dashboards em BI e acessibilidade digital.'
    },
    {
      name: 'Apoio Socioassistencial & Saúde',
      role: 'Pesquisadores Sociais e Epidemiologistas',
      department: 'SASC & Secretaria Municipal de Saúde',
      expertise: 'Monitoramento do CadÚnico, Bolsa Família, IPVS e indicadores de atenção primária.'
    }
  ];

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #193DB8 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Corpo Técnico Multidisciplinar
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Equipe Técnica do Observatório de Mauá
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            O OPPES Mauá é composto por profissionais das áreas de Estatística, Geografia, Economia, Ciências Sociais e Tecnologia da Informação atuando de forma transversal na Prefeitura Municipal.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
              Trabalho Integrado Intersecretarial
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>
              O Observatório de Políticas Públicas, Econômico e Social (OPPES) tem sede operacional no <strong>Paço Municipal de Mauá</strong>, desenvolvendo suas principais atribuições sob a coordenação da <strong>Coordenadoria de Tecnologia da Informação (CTI)</strong> e da <strong>Secretaria de Planejamento Urbano</strong>, com cooperação permanente das Secretarias de Finanças, Saúde, Educação, Segurança Pública e Assistência Social.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {teamMembers.map((member, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border-subtle)', 
                  padding: '1.75rem', 
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '42px', 
                    height: '42px', 
                    borderRadius: 'var(--radius-md)', 
                    background: 'var(--maua-blue-subtle)', 
                    color: '#2352EE', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {idx % 2 === 0 ? <BarChart2 size={20} /> : <Laptop size={20} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: '#B5179E', fontWeight: 600 }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.75rem', fontWeight: 500 }}>
                  <Building size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  <span>{member.department}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0, flex: 1 }}>
                  {member.expertise}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
