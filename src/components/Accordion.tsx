import { useState } from 'react';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

import type { ReactNode } from 'react';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={s.stack}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`border transition-colors duration-300 ${
              isOpen
                ? 'border-accent-primary/40 bg-accent-primary/5'
                : 'border-border bg-bg-secondary'
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className={`w-full flex items-center justify-between ${s.gapMd} ${s.cardSm} text-left`}
            >
              <span className={`${t.navLinkLarge} text-text-primary`}>{item.title}</span>
              <span
                className={`${t.h3} text-accent-primary transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`${s.accordionPadding}`}>
                <div className={`${t.caption} text-text-muted`}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
