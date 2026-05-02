import { t } from '../styles/typography';
import { s } from '../styles/spacing';

interface SectionTagProps {
  children: React.ReactNode;
  number?: string;
}

export default function SectionTag({ children, number }: SectionTagProps) {
  return (
    <div className={`flex items-center ${s.gapSm} ${s.mbSm}`}>
      {number && <span className={`${t.label} text-accent-secondary`}>{number}</span>}
      <div className="w-5 h-[1px] bg-accent-secondary/60" />
      <span className={`${t.label} text-accent-secondary`}>{children}</span>
    </div>
  );
}
