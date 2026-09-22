import React from 'react';
import { TrendingUp, TrendingDown, Minus, Database } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  neutral?: boolean;
  footerText?: string;
  linkUrl?: string;
  linkText?: string;
  icon: React.ReactNode;
  colorScheme?: 'blue' | 'magenta' | 'emerald' | 'cyan';
  source?: string;
  sourceYear?: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  neutral = false,
  footerText,
  linkUrl,
  linkText,
  icon,
  colorScheme = 'blue',
  source,
  sourceYear
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className={`stat-icon-wrapper ${colorScheme}`}>
          {icon}
        </div>

        {change && (
          <span className={`stat-badge ${neutral ? 'neutral' : (isPositive ? 'positive' : '')}`}>
            {!neutral && (isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />)}
            {neutral && <Minus size={12} />}
            <span>{change}</span>
          </span>
        )}
      </div>

      <div className="stat-number">{value}</div>
      <div className="stat-title">{title}</div>

      {(source || sourceYear) && (
        <div className="stat-source-tag">
          <Database size={11} />
          {source && <span>Fonte: {source}</span>}
          {source && sourceYear && <span>•</span>}
          {sourceYear && <strong>Ano: {sourceYear}</strong>}
        </div>
      )}

      {footerText && (
        <div className="stat-footer-text">
          <span>{footerText}</span>
          {linkUrl && (
            <a 
              href={linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '0.4rem', color: 'var(--maua-blue)', textDecoration: 'none', fontWeight: 600 }}
              title={linkText || "Acessar fonte oficial"}
            >
              <span>{linkText || "(Acessar ↗)"}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

