import { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';

interface InlineMathProps {
  tex: string;
  className?: string;
}

export default function InlineMath({ tex, className = '' }: InlineMathProps) {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    import('katex').then((katexMod) => {
      if (cancelled) return;
      const rendered = katexMod.default.renderToString(tex, {
        throwOnError: false,
        displayMode: false,
      });
      setHtml(rendered);
    });
    return () => {
      cancelled = true;
    };
  }, [tex]);

  return <span className={`inline-math ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
