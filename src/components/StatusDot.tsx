import { t } from '../styles/typography';
import { s } from '../styles/spacing';

interface StatusDotProps {
  color?: 'rose' | 'mauve' | 'purple' | 'red';
  label?: string;
}

export default function StatusDot({ color = 'rose', label }: StatusDotProps) {
  const colors = {
    rose: 'bg-accent-primary shadow-[0_0_0_0_rgba(194,101,157,0.5)]',
    mauve: 'bg-accent-secondary shadow-[0_0_0_0_rgba(141,78,121,0.5)]',
    purple: 'bg-accent-tertiary shadow-[0_0_0_0_rgba(103,57,104,0.5)]',
    red: 'bg-peach shadow-[0_0_0_0_rgba(210,170,152,0.5)]',
  };

  return (
    <div className={`flex items-center ${s.gapSm}`}>
      <span className={`relative flex h-[5px] w-[5px]`}>
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colors[color]}`}
        />
        <span className={`relative inline-flex rounded-full h-[5px] w-[5px] ${colors[color]}`} />
      </span>
      {label && <span className={`${t.label} text-text-muted`}>{label}</span>}
    </div>
  );
}
