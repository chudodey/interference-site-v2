import { t } from '../styles/typography';
import { s } from '../styles/spacing';

import type { ReactNode } from 'react';

interface TeamCardProps {
  name: ReactNode;
  role: string;
  description: ReactNode;
}

export default function TeamCard({ name, role, description }: TeamCardProps) {
  return (
    <div
      className={`${s.card} border border-border bg-bg-secondary hover:border-accent-primary/40 transition-colors duration-300`}
    >
      <h3 className={`${t.highlight} text-text-primary ${s.mbSm}`}>{name}</h3>
      <span className={`${t.badge} text-accent-primary ${s.mbSm} block`}>{role}</span>
      <p className={`${t.caption} text-text-muted`}>{description}</p>
    </div>
  );
}
