import { t } from '../styles/typography';

const ORGANIZERS = [
  {
    src: '/partners/MINKULT_KO.svg',
    href: 'https://vk.com/min_kult_ko',
    alt: 'Министерство культуры Калужской области',
    h: 'h-16 md:h-20',
    offset: '-mt-2 md:-mt-3',
  },
  {
    src: '/partners/IKC.svg',
    href: 'https://www.icc40.ru/',
    alt: 'Инновационный культурный центр',
    h: 'h-14 md:h-16',
    offset: '',
  },
  {
    src: '/partners/TSIALKOV.svg',
    href: 'https://t-fest.online/',
    alt: 'Циолковский Фест',
    h: 'h-10 md:h-12 max-w-[200px]',
    offset: '',
  },
  {
    src: '/partners/ODA.svg',
    href: 'https://odadream.art/',
    alt: 'ODA.dream',
    h: 'h-12 md:h-14',
    offset: '',
  },
];

const PARTNERS = [
  {
    src: '/partners/NEIRY.svg',
    href: 'https://neiry.ru',
    alt: 'Neiry',
    h: 'h-8 md:h-10',
    offset: '',
  },
  {
    src: '/partners/TSHR.svg',
    href: 'https://tcxp.ru/',
    alt: 'ТСХР',
    h: 'h-10 md:h-12 max-w-[140px]',
    offset: '',
  },
];

const BASE = import.meta.env.BASE_URL;

interface LogoItem {
  src: string;
  href: string;
  alt: string;
  h: string;
  offset: string;
}

function LogoRow({ items }: { items: LogoItem[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {items.map((item) => (
        <a
          key={item.src}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`opacity-70 hover:opacity-100 transition-opacity ${item.offset}`}
        >
          <img
            src={`${BASE}${item.src.slice(1)}`}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            className={`${item.h} w-auto object-contain`}
          />
        </a>
      ))}
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12 w-full">
      {/* Организаторы */}
      <div className="flex flex-col items-center gap-3">
        <span className={`${t.label} text-text-muted`}>Организаторы</span>
        <LogoRow items={ORGANIZERS} />
      </div>

      {/* Партнёры */}
      <div className="flex flex-col items-center gap-3">
        <span className={`${t.label} text-text-muted`}>Партнёры</span>
        <LogoRow items={PARTNERS} />
      </div>
    </div>
  );
}
