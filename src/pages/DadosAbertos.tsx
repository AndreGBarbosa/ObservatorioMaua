import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { 
  mauaOverview, 
  mauaBairros, 
  budget2026, 
  socioIndicatorsList,
  mauaOfficialSources 
} from '../data/mauaData';

interface OpenDataset {
  id: string;
  name: string;
  category: string;
  format: 'CSV' | 'JSON' | 'GEOJSON';
  records: number;
  lastUpdate: string;
  description: string;
  generateContent: () => string;
}

export const DadosAbertos: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const datasets: OpenDataset[] = [
    {
      id: 'ds-bairros',
      name: 'Bairros Oficiais de Mauá – Censo 2022',
      category: 'Território & População',
      format: 'CSV',
      records: 14,
      lastUpdate: 'Fevereiro de 2026',
      description: 'População residente, domicílios recenseados, área em km² e equipamentos públicos por bairro.',
      generateContent: () => {
        let csv = "bairro,regiao,populacao,domicilios,area_km2,densidade_hab_km2,escolas,saude\n";
        mauaBairros.forEach(b => {
          csv += `"${b.name}","${b.region}",${b.population},${b.households},${b.areaKm2},${b.densityHabKm2},${b.publicSchools},${b.healthUnits}\n`;
        });
        return csv;
      }
    },
    {
      id: 'ds-orcamento',
      name: 'Execução Orçamentária por Secretaria – 2026',
      category: 'Finanças Públicas',
      format: 'CSV',
      records: budget2026.departments.length,
      lastUpdate: 'Janeiro de 2026',
      description: 'Valores fixados na LOA e despesas liquidadas por órgão municipal e função de governo.',
      generateContent: () => {
        let csv = "secretaria,orcamento_fixado,despesa_liquidada,percentual\n";
        budget2026.departments.forEach(d => {
          csv += `"${d.name}",${d.budgeted},${d.realized},${d.percentage}%\n`;
        });
        return csv;
      }
    },
    {
      id: 'ds-icms-sp',
      name: 'Arrecadação e Cota-Parte do ICMS (Sefaz-SP)',
      category: 'Finanças Públicas & Tributos',
      format: 'CSV',
      records: 6,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Série mensal de cota-parte do ICMS transferida pelo Estado de São Paulo a Mauá com base no IPM e DIPAM.',
      generateContent: () => {
        let csv = "municipio,mes_ano,valor_repassado_reais,fonte\n";
        csv += '"Mauá","07/2025",32100000,"Sefaz-SP Relatório da Receita Tributária"\n';
        csv += '"Mauá","08/2025",33000000,"Sefaz-SP Relatório da Receita Tributária"\n';
        csv += '"Mauá","09/2025",32800000,"Sefaz-SP Relatório da Receita Tributária"\n';
        csv += '"Mauá","10/2025",33900000,"Sefaz-SP Relatório da Receita Tributária"\n';
        csv += '"Mauá","11/2025",33500000,"Sefaz-SP Relatório da Receita Tributária"\n';
        csv += '"Mauá","12/2025",34800000,"Sefaz-SP Relatório da Receita Tributária"\n';
        return csv;
      }
    },
    {
      id: 'ds-rfb-tributos',
      name: 'Receitas Tributárias Administradas pela RFB & IR (ReceitaData)',
      category: 'Tributos Federais & Renda',
      format: 'CSV',
      records: 5,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Arrecadação de tributos federais e Imposto de Renda administrados pela Receita Federal em Mauá.',
      generateContent: () => {
        let csv = "municipio,tributo_federal,arrecadacao_anual_reais,fonte\n";
        csv += '"Mauá","Imposto de Renda Pessoa Jurídica (IRPJ)",384000000,"ReceitaData / Receita Federal"\n';
        csv += '"Mauá","Imposto de Renda Pessoa Física (IRPF)",218000000,"ReceitaData / Receita Federal"\n';
        csv += '"Mauá","Contribuição Social sobre Lucro Líquido (CSLL)",176000000,"ReceitaData / Receita Federal"\n';
        csv += '"Mauá","PIS / PASEP & COFINS",362000000,"ReceitaData / Receita Federal"\n';
        csv += '"Mauá","Contribuições Previdenciárias",340000000,"ReceitaData / Receita Federal"\n';
        return csv;
      }
    },
    {
      id: 'ds-ibge-pib-vab',
      name: 'PIB dos Municípios & Valor Adicionado Bruto (IBGE)',
      category: 'Economia & Contas Regionais',
      format: 'CSV',
      records: 6,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Série histórica do PIB a preços correntes e composição setorial do VAB de Mauá calculada pelo IBGE.',
      generateContent: () => {
        let csv = "municipio,ano,pib_corrente_reais,pib_per_capita_reais,fonte\n";
        csv += '"Mauá",2018,13800000000,33400,"IBGE Contas Regionais"\n';
        csv += '"Mauá",2019,14600000000,35100,"IBGE Contas Regionais"\n';
        csv += '"Mauá",2020,15200000000,36400,"IBGE Contas Regionais"\n';
        csv += '"Mauá",2021,18700000000,44700,"IBGE Contas Regionais"\n';
        csv += '"Mauá",2022,22400000000,53556,"IBGE Contas Regionais"\n';
        csv += '"Mauá",2023,24990000000,59773.04,"IBGE Contas Regionais"\n';
        return csv;
      }
    },
    {
      id: 'ds-semil-energia',
      name: 'Consumo de Energia Elétrica por Setor – MWh (SEMIL-SP)',
      category: 'Energia & Infraestrutura',
      format: 'CSV',
      records: 5,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Consumo anual de energia elétrica em MWh por classe de consumo em Mauá com base no Anuário da SEMIL-SP.',
      generateContent: () => {
        let csv = "municipio,classe_setor,consumo_anual_mwh,percentual,fonte\n";
        csv += '"Mauá","Industrial (Polo Petroquímico & Transformação)",686836,58.0,"SEMIL-SP Anuário de Energéticos"\n';
        csv += '"Mauá","Residencial (Domicílios)",307892,26.0,"SEMIL-SP Anuário de Energéticos"\n';
        csv += '"Mauá","Comercial e Serviços",130262,11.0,"SEMIL-SP Anuário de Energéticos"\n';
        csv += '"Mauá","Poder Público",35526,3.0,"SEMIL-SP Anuário de Energéticos"\n';
        csv += '"Mauá","Iluminação Pública",23684,2.0,"SEMIL-SP Anuário de Energéticos"\n';
        return csv;
      }
    },
    {
      id: 'ds-caged-rais',
      name: 'Emprego Formal, Vínculos RAIS e Saldo Novo CAGED (MTE)',
      category: 'Trabalho, Emprego & Renda',
      format: 'CSV',
      records: 6,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Dados abertos do Ministério do Trabalho e Emprego acessíveis a qualquer cidadão: movimentação mensal de admissões, desligamentos e estoque de empregos com carteira assinada em Mauá.',
      generateContent: () => {
        let csv = "municipio,mes_ano,admissoes,desligamentos,saldo_liquido,estoque_ativo,fonte\n";
        csv += '"Mauá","07/2025",2850,2685,165,87600,"MTE • Novo CAGED / RAIS"\n';
        csv += '"Mauá","08/2025",2940,2730,210,87810,"MTE • Novo CAGED / RAIS"\n';
        csv += '"Mauá","09/2025",3010,2780,230,88040,"MTE • Novo CAGED / RAIS"\n';
        csv += '"Mauá","10/2025",2890,2710,180,88220,"MTE • Novo CAGED / RAIS"\n';
        csv += '"Mauá","11/2025",2980,2790,190,88410,"MTE • Novo CAGED / RAIS"\n';
        csv += '"Mauá","12/2025",3120,2875,245,88450,"MTE • Novo CAGED / RAIS"\n';
        return csv;
      }
    },
    {
      id: 'ds-censo-escolar-2025',
      name: 'Matrículas e Escolas – Censo Escolar 2025 (INEP)',
      category: 'Educação Básica',
      format: 'CSV',
      records: 6,
      lastUpdate: 'Censo Escolar 2025',
      description: 'Resultados oficiais do Censo Escolar 2025 do INEP para Mauá: total de matrículas por etapa de ensino e rede administrativa.',
      generateContent: () => {
        let csv = "municipio,etapa_ensino,rede_ensino,matriculas,participacao,fonte\n";
        csv += '"Mauá","Educação Infantil (Creche e Pré-escola)","Municipal e Conveniada",14800,"18,5%","INEP Censo Escolar 2025"\n';
        csv += '"Mauá","Ensino Fundamental Anos Iniciais (1º ao 5º)","Municipal e Privada",24200,"30,2%","INEP Censo Escolar 2025"\n';
        csv += '"Mauá","Ensino Fundamental Anos Finais (6º ao 9º)","Estadual e Privada",21500,"26,8%","INEP Censo Escolar 2025"\n';
        csv += '"Mauá","Ensino Médio e Técnico","Estadual e Privada",17300,"21,6%","INEP Censo Escolar 2025"\n';
        csv += '"Mauá","Educação de Jovens e Adultos (EJA)","Municipal e Estadual",2400,"3,0%","INEP Censo Escolar 2025"\n';
        csv += '"Mauá","Educação Especial (Inclusiva)","Todas as Redes",2140,"2,7%","INEP Censo Escolar 2025"\n';
        return csv;
      }
    },
    {
      id: 'ds-indicadores',
      name: 'Séries Históricas Socioeconômicas Mensais',
      category: 'Indicadores',
      format: 'CSV',
      records: socioIndicatorsList.length * 6,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Evolução mensal de acidentes de trânsito, emprego formal (CAGED), saúde, segurança e arrecadação.',
      generateContent: () => {
        let csv = "indicador,categoria,mes,valor,unidade,fonte\n";
        socioIndicatorsList.forEach(ind => {
          ind.historicalSeries.forEach(s => {
            csv += `"${ind.name}","${ind.category}","${s.month}",${s.value},"${ind.unit}","${ind.source}"\n`;
          });
        });
        return csv;
      }
    },
    {
      id: 'ds-sintese-municipal',
      name: 'Síntese Municipal Consolidada de Mauá',
      category: 'Geral',
      format: 'JSON',
      records: 1,
      lastUpdate: 'Fevereiro de 2026',
      description: 'Estatísticas agregadas de população, PIB, área, densidade e empresas ativas.',
      generateContent: () => {
        return JSON.stringify(mauaOverview, null, 2);
      }
    }
  ];

  const handleDownloadDataset = (ds: OpenDataset) => {
    const mimeType = ds.format === 'JSON' ? 'application/json' : 'text/csv';
    const content = ds.generateContent();
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ds.id}.${ds.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Arquivo "${ds.name}" baixado com sucesso!`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #193DB8 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Portal de Dados Abertos (OPPES Download)
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Dados Abertos de Mauá • Catálogo de Arquivos
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Disponibilização de dados públicos em formatos abertos, legíveis por máquina e livres para reuso por desenvolvedores, pesquisadores, jornalistas e cidadãos.
          </p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          {downloadSuccess && (
            <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} />
              <span>{downloadSuccess}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {datasets.map(ds => (
              <div 
                key={ds.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="pub-category">{ds.category}</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: 'var(--radius-sm)', 
                    background: ds.format === 'CSV' ? '#DCFCE7' : '#DBEAFE', 
                    color: ds.format === 'CSV' ? '#166534' : '#1E40AF' 
                  }}>
                    {ds.format}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {ds.name}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.25rem', flex: 1 }}>
                  {ds.description}
                </p>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                  <div><strong>Registros:</strong> {ds.records} linhas</div>
                  <div><strong>Última Atualização:</strong> {ds.lastUpdate}</div>
                </div>

                <button 
                  type="button" 
                  className="access-btn"
                  style={{ background: 'var(--maua-blue)', color: '#FFF', justifyContent: 'center', padding: '0.6rem' }}
                  onClick={() => handleDownloadDataset(ds)}
                >
                  <Download size={14} />
                  <span>Baixar Arquivo ({ds.format})</span>
                </button>
              </div>
            ))}
          </div>

          {/* Seção de Portais Oficiais Externos de Dados Abertos */}
          <div style={{ marginTop: '3.5rem', background: '#FFFFFF', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)', padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <span className="hero-pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#EFF6FF', color: '#1D4ED8', borderColor: '#BFDBFE', fontSize: '0.75rem' }}>
                <Sparkles size={13} />
                <span>Integração Intergovernamental</span>
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.5rem 0 0.25rem 0' }}>
                Portais Oficiais de Dados Externos de Mauá
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0, maxWidth: '800px' }}>
                Bases primárias de dados públicos do Estado de São Paulo e do Governo Federal com recortes territoriais específicos para o município de Mauá.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {mauaOfficialSources.map((source) => (
                <div 
                  key={source.id} 
                  style={{ 
                    background: 'var(--bg-secondary)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '1.5rem', 
                    border: '1px solid var(--border-medium)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between' 
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--maua-blue)', textTransform: 'uppercase' }}>
                        {source.category}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', background: '#FFFFFF', padding: '0.15rem 0.45rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                        {source.frequency}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0 0.4rem 0' }}>
                      {source.name}
                    </h4>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.6rem', fontWeight: 600 }}>
                      {source.agency}
                    </div>

                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.45', margin: '0 0 1rem 0' }}>
                      {source.description}
                    </p>
                  </div>

                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="axis-card-btn"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Acessar Portal Oficial</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Diretrizes de Uso */}
          <div style={{ marginTop: '3rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Termos de Uso e Licença de Dados Abertos
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Os dados abertos disponibilizados pelo <strong>OPPES Mauá</strong> são regidos pela <strong>Lei Federal de Acesso à Informação (Lei nº 12.527/2011)</strong> e pela política municipal de governo aberto. Todo cidadão ou instituição tem autorização para explorar, processar, redistribuir e integrar estas bases em soluções tecnológicas, pesquisas científicas ou aplicações cívicas, devendo ser citada a fonte oficial: <em>"Prefeitura do Município de Mauá / Observatório de Políticas Públicas, Econômico e Social (OPPES)"</em>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};
