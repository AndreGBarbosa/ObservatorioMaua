import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export const FaleConosco: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instituicao: '',
    tipo: 'solicitacao-dados',
    assunto: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        instituicao: '',
        tipo: 'solicitacao-dados',
        assunto: '',
        mensagem: ''
      });
    }, 4000);
  };

  return (
    <div className="main-content">
      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #10277A 100%)', color: '#FFFFFF', padding: '3.5rem 0 2.5rem' }}>
        <div className="container">
          <span className="section-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#93C5FD' }}>
            Atendimento ao Cidadão & Transparência
          </span>
          <h1 className="hero-title" style={{ fontSize: '2.4rem', marginBottom: '0.75rem' }}>
            Fale Conosco • Solicitação de Informações
          </h1>
          <p style={{ color: '#CBD5E1', maxWidth: '750px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Entre em contato com a equipe técnica do OPPES Mauá para tirar dúvidas, enviar sugestões metodológicas ou solicitar bases de dados específicas conforme a Lei de Acesso à Informação.
          </p>
        </div>
      </section>

      <section style={{ padding: '3rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          
          <div className="grid-responsive-form">
            
            {/* Informações Oficiais e Contatos */}
            <div>
              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                  Canais Oficiais do Município
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.875rem' }}>
                  
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="stat-icon-wrapper blue" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <strong>Paço Municipal de Mauá</strong>
                      <div style={{ color: 'var(--text-muted)' }}>Av. João Ramalho, 205 – Vila Noêmia, Mauá - SP</div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.78rem' }}>CEP: 09371-520</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="stat-icon-wrapper magenta" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <strong>Telefones de Atendimento</strong>
                      <div style={{ color: 'var(--text-muted)' }}>PABX Geral: (11) 4512-7500</div>
                      <div style={{ color: 'var(--text-muted)' }}>Atendimento ao Munícipe: (11) 4512-7661</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="stat-icon-wrapper emerald" style={{ width: '38px', height: '38px', flexShrink: 0 }}>
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <strong>Ouvidoria Geral do Município</strong>
                      <div style={{ color: 'var(--text-muted)' }}>Telefone: (11) 4512-7847</div>
                      <div style={{ color: 'var(--text-light)', fontSize: '0.78rem' }}>Atendimento de segunda a sexta, das 8h às 17h</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Box e-SIC */}
              <div style={{ background: 'var(--maua-blue-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(35,82,238,0.2)', padding: '1.75rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E3A8A', marginBottom: '0.5rem' }}>
                  Serviço de Informação ao Cidadão (e-SIC)
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: '1.5', marginBottom: '1rem' }}>
                  Para requerimentos formais de documentos públicos amparados pela Lei nº 12.527/2011, utilize também a plataforma centralizada do e-SIC Mauá.
                </p>
                <a 
                  href="https://transparencia.maua.sp.gov.br/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="axis-card-btn"
                  style={{ color: '#2352EE', fontWeight: 700 }}
                >
                  <span>Acessar e-SIC Transparência</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Formulário de Envio */}
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Envie sua Mensagem ao OPPES
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
                Preencha o formulário abaixo. Nossa equipe técnica responderá no prazo de até 48 horas úteis.
              </p>

              {formSubmitted ? (
                <div style={{ background: '#DCFCE7', color: '#166534', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center' }}>
                  <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Mensagem Enviada com Sucesso!
                  </h4>
                  <p style={{ fontSize: '0.875rem', margin: 0 }}>
                    Agradecemos o seu contato. O protocolo de solicitação foi registrado e encaminhado à Coordenadoria de Tecnologia da Informação.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div className="grid-responsive-2col" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                        Nome Completo *
                      </label>
                      <input 
                        type="text" 
                        required 
                        className="filter-select" 
                        style={{ width: '100%', padding: '0.6rem' }}
                        value={formData.nome}
                        onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        placeholder="Ex: Ana Silva"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                        E-mail de Contato *
                      </label>
                      <input 
                        type="email" 
                        required 
                        className="filter-select" 
                        style={{ width: '100%', padding: '0.6rem' }}
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="grid-responsive-2col" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                        Instituição / Universidade
                      </label>
                      <input 
                        type="text" 
                        className="filter-select" 
                        style={{ width: '100%', padding: '0.6rem' }}
                        value={formData.instituicao}
                        onChange={e => setFormData({ ...formData, instituicao: e.target.value })}
                        placeholder="Ex: USP, UFABC, Cidadão autônomo"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                        Tipo de Solicitação *
                      </label>
                      <select 
                        className="filter-select" 
                        style={{ width: '100%', padding: '0.6rem' }}
                        value={formData.tipo}
                        onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                      >
                        <option value="solicitacao-dados">Solicitação de Base de Dados</option>
                        <option value="duvida-metodologica">Dúvida sobre Indicadores</option>
                        <option value="sugestao">Sugestão de Novo Painel</option>
                        <option value="outro">Outros Assuntos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                      Assunto *
                    </label>
                    <input 
                      type="text" 
                      required 
                      className="filter-select" 
                      style={{ width: '100%', padding: '0.6rem' }}
                      value={formData.assunto}
                      onChange={e => setFormData({ ...formData, assunto: e.target.value })}
                      placeholder="Resumo do pedido ou dúvida"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '0.35rem' }}>
                      Mensagem / Detalhamento da Solicitação *
                    </label>
                    <textarea 
                      rows={5} 
                      required 
                      className="filter-select" 
                      style={{ width: '100%', padding: '0.6rem', resize: 'vertical' }}
                      value={formData.mensagem}
                      onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Descreva em detalhes quais dados ou informações você necessita..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="access-btn"
                    style={{ background: 'var(--maua-blue)', color: '#FFF', padding: '0.75rem 1.5rem', justifyContent: 'center', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
                  >
                    <Send size={16} />
                    <span>Enviar Solicitação ao OPPES</span>
                  </button>

                </form>
              )}

            </div>

          </div>

          {/* Seção FAQ - Perguntas Frequentes */}
          <div style={{ marginTop: '3.5rem', background: '#FFFFFF', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <HelpCircle size={22} color="#B5179E" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Perguntas Frequentes (FAQ)
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2352EE', marginBottom: '0.35rem' }}>
                  Com que frequência os dados são atualizados?
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  As séries socioeconômicas (emprego, arrecadação, trânsito) são atualizadas mensalmente. Dados censitários e do PIB seguem o cronograma oficial de divulgação do IBGE e da Fundação SEADE.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2352EE', marginBottom: '0.35rem' }}>
                  Posso utilizar os dados em teses ou projetos privados?
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Sim. Todos os dados abertos do OPPES Mauá são de livre reuso público, exigindo-se apenas a citação formal da fonte oficial da Prefeitura de Mauá.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2352EE', marginBottom: '0.35rem' }}>
                  Como posso obter arquivos geoespaciais em formato Shapefile?
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Na aba <strong>Mauá em Mapas</strong> ou <strong>Dados Abertos</strong>, estão disponíveis arquivos GeoJSON, KML e tabelas tabulares para download imediato.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
