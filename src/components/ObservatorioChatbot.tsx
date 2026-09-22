import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ExternalLink, 
  ArrowRight, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  BarChart2
} from 'lucide-react';
import { 
  type ChatMessage, 
  INITIAL_PROMPTS, 
  processChatbotQuery 
} from '../services/chatbotService';

export const ObservatorioChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mensagem inicial de boas-vindas
  useEffect(() => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome-msg',
      sender: 'bot',
      text: `Olá! Sou o **Assistente Virtual do OPPES Mauá** 🤖\n\nEstou preparado para responder suas perguntas sobre todos os indicadores do município, como dados do **IBGE Cidades (418 mil hab)**, repasses de **ICMS da Sefaz-SP**, **Censo Escolar 2025 do INEP**, **empregos CAGED/RAIS**, **consumo elétrico SEMIL-SP**, **Orçamento 2026** e os **14 bairros oficiais de Mauá**.\n\nComo posso te ajudar hoje?`,
      timestamp: new Date(),
      suggestions: [
        'Qual a população e área de Mauá no IBGE?',
        'Quanto Mauá arrecada de ICMS?',
        'Quais os dados do Censo Escolar 2025 do INEP?',
        'Qual o orçamento de 2026?',
        'Como estão os empregos no CAGED/RAIS?'
      ]
    };
    setMessages([welcomeMsg]);
  }, []);

  // Escuta evento global disparado pela Navbar ou outros componentes
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    window.addEventListener('open-oppes-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-oppes-chatbot', handleOpenChat);
  }, []);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Foca no input ao abrir
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    // Mensagem do usuário
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulação de resposta com processamento NLU
    setTimeout(() => {
      const botResponse = processChatbotQuery(query);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    const resetMsg: ChatMessage = {
      id: `reset-${Date.now()}`,
      sender: 'bot',
      text: `Conversa reiniciada! 🔄 Em que posso te ajudar sobre os dados e estatísticas do Observatório de Mauá?`,
      timestamp: new Date(),
      suggestions: [
        'Qual a população de Mauá pelo IBGE?',
        'Quanto é o orçamento de 2026?',
        'Qual o repasse de ICMS de Mauá?',
        'Dados do Censo Escolar 2025 do INEP'
      ]
    };
    setMessages([resetMsg]);
  };

  const handleLinkClick = (url: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
      // Mantém o chat aberto em telas grandes, ou minimiza se mobile
      if (window.innerWidth < 768) {
        setIsMinimized(true);
      }
    }
  };

  // Formatação simples de Markdown no texto da mensagem
  const renderFormattedText = (text: string) => {
    // Quebra por linhas
    const lines = text.split('\n');
    return (
      <div className="chatbot-text-content">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} style={{ height: '6px' }} />;
          }

          // Processa negrito **texto**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} style={{ color: '#0F172A', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          // Se for linha de lista (• ou -)
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
              <div key={idx} className="chatbot-list-item">
                <span className="chatbot-bullet">•</span>
                <span className="chatbot-list-text">{renderedLine}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="chatbot-paragraph">
              {renderedLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Botão Flutuante (FAB) */}
      {!isOpen && (
        <div className="chatbot-fab-container">
          <div className="chatbot-fab-tooltip">
            <span>Dúvidas sobre os dados de Mauá? Fale com a IA!</span>
          </div>
          <button
            type="button"
            className="chatbot-fab-button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            aria-label="Abrir Assistente Virtual do Observatório de Mauá"
          >
            <div className="chatbot-fab-icon-wrap">
              <Bot size={26} color="#FFFFFF" />
            </div>
            <span className="chatbot-fab-label">Assistente OPPES</span>
            <span className="chatbot-fab-pulse"></span>
          </button>
        </div>
      )}

      {/* Janela de Chat Aberta */}
      {isOpen && (
        <div className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}>
          {/* Header do Chat */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} color="#FFFFFF" />
              </div>
              <div className="chatbot-header-titles">
                <div className="chatbot-title-row">
                  <h4>Assistente OPPES Mauá</h4>
                  <span className="chatbot-status-tag">Online</span>
                </div>
                <p>Plantão de Dados Oficiais da Prefeitura</p>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button 
                type="button"
                className="chatbot-header-btn" 
                onClick={handleResetChat}
                title="Reiniciar conversa"
                aria-label="Reiniciar conversa"
              >
                <RotateCcw size={15} />
              </button>
              <button 
                type="button"
                className="chatbot-header-btn" 
                onClick={() => setIsMinimized(prev => !prev)}
                title={isMinimized ? "Expandir janela" : "Minimizar janela"}
                aria-label={isMinimized ? "Expandir janela" : "Minimizar janela"}
              >
                {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
              </button>
              <button 
                type="button"
                className="chatbot-header-btn" 
                onClick={() => setIsOpen(false)}
                title="Fechar assistente"
                aria-label="Fechar assistente"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Conteúdo do Chat (oculto quando minimizado) */}
          {!isMinimized && (
            <>
              {/* Barra de Sugestões Iniciais Rápida no Topo */}
              <div className="chatbot-quick-bar">
                <div className="chatbot-quick-scroll">
                  {INITIAL_PROMPTS.slice(0, 4).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="chatbot-quick-pill"
                      onClick={() => handleSendMessage(item.query)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Área de Mensagens com Rolagem */}
              <div className="chatbot-messages-area">
                {messages.map((msg) => (
                  <div key={msg.id} className={`chatbot-message-row ${msg.sender}`}>
                    {msg.sender === 'bot' && (
                      <div className="chatbot-msg-avatar">
                        <Bot size={16} color="#FFFFFF" />
                      </div>
                    )}

                    <div className="chatbot-bubble">
                      {/* Texto formatado */}
                      {renderFormattedText(msg.text)}

                      {/* Grade de KPIs (se houver) */}
                      {msg.kpis && msg.kpis.length > 0 && (
                        <div className="chatbot-kpis-grid">
                          {msg.kpis.map((kpi, kIdx) => (
                            <div key={kIdx} className="chatbot-kpi-card">
                              <span className="chatbot-kpi-label">{kpi.label}</span>
                              <span className="chatbot-kpi-value">{kpi.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Links Internos e Oficiais */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="chatbot-links-container">
                          <div className="chatbot-links-title">
                            <ArrowRight size={13} />
                            <span>Fontes & Acessos Rápidos:</span>
                          </div>
                          <div className="chatbot-links-list">
                            {msg.links.map((lnk, lIdx) => (
                              <button
                                key={lIdx}
                                type="button"
                                className={`chatbot-link-btn ${lnk.isExternal ? 'external' : 'internal'}`}
                                onClick={() => handleLinkClick(lnk.url, lnk.isExternal)}
                              >
                                <span>{lnk.label}</span>
                                {lnk.isExternal ? <ExternalLink size={12} /> : <BarChart2 size={12} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chips de Sugestões de Perguntas Subsequentes */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="chatbot-suggestions-wrap">
                          <div className="chatbot-suggestions-title">
                            <Sparkles size={12} />
                            <span>Perguntas sugeridas:</span>
                          </div>
                          <div className="chatbot-suggestions-list">
                            {msg.suggestions.map((sug, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                className="chatbot-suggestion-chip"
                                onClick={() => handleSendMessage(sug)}
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span className="chatbot-msg-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="chatbot-msg-avatar user">
                        <User size={16} color="#FFFFFF" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Indicador de Digitação */}
                {isTyping && (
                  <div className="chatbot-message-row bot">
                    <div className="chatbot-msg-avatar">
                      <Bot size={16} color="#FFFFFF" />
                    </div>
                    <div className="chatbot-bubble typing">
                      <div className="chatbot-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="chatbot-typing-text">Consultando base do OPPES...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Rodapé / Input de Digitação */}
              <div className="chatbot-footer">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="chatbot-input-form"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    className="chatbot-input"
                    placeholder="Pergunte sobre população, ICMS, Censo 2025, bairros..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="submit"
                    className="chatbot-send-btn"
                    disabled={!inputMessage.trim()}
                    aria-label="Enviar mensagem"
                  >
                    <Send size={16} />
                  </button>
                </form>
                <div className="chatbot-footnote">
                  <span>Base de dados auditada: IBGE • Sefaz-SP • INEP • MTE • SEMIL</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
