import SectionTag from '../components/SectionTag';
import TeamCard from '../components/TeamCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { teamMembers, performers, venueInfo, partners, organizers } from '../data/content';
import { t } from '../styles/typography';
import { s } from '../styles/spacing';

const BASE = import.meta.env.BASE_URL;

export default function Authors() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} id="authors" className={`${s.section} bg-bg-primary reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <SectionTag number="06">Авторы</SectionTag>

        <h2 className={`${t.h2} ${s.mbSm}`}>
          <span className="text-peach">Творческая</span>{' '}
          <span className="text-text-primary">группа</span>
        </h2>

        <p className={`${t.bodySecondary} text-text-muted ${s.mbLg} max-w-xl`}>
          Спектакль создан командой, для которой границы между наукой, технологией и искусством
          стёрты намеренно.
        </p>

        {/* Team grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${s.gapMd} ${s.mbLg}`}>
          {teamMembers.map((member) => (
            <TeamCard
              key={member.name + member.role}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>

        {/* Performers */}
        <div className={`${s.card} border border-border bg-bg-secondary ${s.mbLg}`}>
          <span className={`${t.badge} text-accent-primary mb-2 block`}>Исполнители</span>
          <p className={`${t.bodyPrimary} text-text-primary`}>{performers}</p>
        </div>

        {/* Venue & Festival */}
        <div
          className={`${s.cardLg} border border-accent-primary/30 bg-accent-primary/5 ${s.mbLg}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className={`${t.badge} text-accent-primary mb-2 block`}>Площадка</span>
              <h3 className={`${t.highlight} text-text-primary mb-1`}>{venueInfo.name}</h3>
              <p className={`${t.caption} text-text-muted`}>{venueInfo.address}</p>
            </div>
            <div>
              <span className={`${t.badge} text-accent-primary mb-2 block`}>Фестиваль</span>
              <h3 className={`${t.highlight} text-text-primary mb-1`}>{venueInfo.festival}</h3>
              <p className={`${t.caption} text-text-muted`}>{venueInfo.festivalDates}</p>
              <p className={`${t.caption} text-text-muted mt-2`}>
                Художественный руководитель: {venueInfo.artisticDirector}
                <br />
                Координатор: {venueInfo.coordinator}
              </p>
            </div>
          </div>
        </div>

        {/* Organizers */}
        <div className={s.mbLg}>
          <h3 className={`${t.badge} text-text-muted mb-6`}>Организаторы</h3>
          <div className={`flex flex-wrap ${s.gapSm}`}>
            {organizers.map((org) => (
              <a
                key={org.shortName}
                href={org.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 border border-border bg-bg-secondary hover:border-accent-primary/40 transition-colors min-w-[180px]"
              >
                {org.logo && (
                  <img
                    src={`${BASE}${org.logo.slice(1)}`}
                    alt={org.shortName}
                    loading="lazy"
                    className="h-8 md:h-10 w-auto object-contain shrink-0"
                  />
                )}
                <div>
                  <span className={`${t.highlight} text-text-primary block`}>{org.shortName}</span>
                  <span className={`${t.label} text-text-muted mt-1 block`}>{org.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <h3 className={`${t.badge} text-text-muted ${s.mbSm}`}>Партнёры</h3>
          <div className={`flex flex-wrap ${s.gapSm}`}>
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 border border-border bg-bg-secondary hover:border-accent-secondary/40 transition-colors min-w-[180px]"
              >
                {partner.logo && (
                  <img
                    src={`${BASE}${partner.logo.slice(1)}`}
                    alt={partner.name}
                    loading="lazy"
                    className="h-8 md:h-10 w-auto object-contain shrink-0"
                  />
                )}
                <div>
                  <span className={`${t.highlight} text-text-primary block`}>{partner.name}</span>
                  {partner.note && (
                    <span className={`${t.label} text-text-muted mt-1 block`}>{partner.note}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
