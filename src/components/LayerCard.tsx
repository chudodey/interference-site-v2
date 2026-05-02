import { t } from '../styles/typography';
import { s } from '../styles/spacing';

import type { ReactNode } from 'react';

interface LayerCardProps {
  number: string;
  title: string;
  description: ReactNode;
}

export default function LayerCard({ number, title, description }: LayerCardProps) {
  return (
    <div
      className={`${s.cardLg} border border-border bg-surface hover:border-accent-primary/40 transition-colors duration-300`}
    >
      <span className={`${t.number} text-accent-primary/40 ${s.mbSm} block`}>{number}</span>
      <h3 className={`${t.highlight} uppercase tracking-wide text-text-primary ${s.mbSm}`}>
        {title}
      </h3>
      <p className={`${t.caption} text-text-muted`}>{description}</p>
    </div>
  );
}
