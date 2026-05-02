import { t } from '../styles/typography';
import { s } from '../styles/spacing';

interface QuantumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  href?: string;
  external?: boolean;
  className?: string;
}

export default function QuantumButton({
  children,
  variant = 'primary',
  onClick,
  href,
  external = false,
  className = '',
}: QuantumButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-6 py-3 md:px-8 md:py-3
    ${s.gapSm}
    ${t.button}
    transition-all duration-300
    min-h-[48px] min-w-[160px]
    whitespace-nowrap
  `;

  const variants = {
    primary: `
      text-accent-primary border border-accent-primary bg-transparent
      hover:bg-accent-primary/10 hover:shadow-glow-accent
    `,
    secondary: `
      text-accent-secondary border border-accent-secondary bg-transparent
      hover:bg-accent-secondary/10 hover:shadow-glow-secondary
    `,
    ghost: `
      text-text-muted border border-border bg-transparent
      hover:border-accent-secondary hover:text-text-primary
    `,
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combined}
      >
        {children}
        {external && <span className="shrink-0">↗</span>}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combined}>
      {children}
    </button>
  );
}
