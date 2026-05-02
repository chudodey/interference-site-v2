import PartnerLogos from '../components/PartnerLogos';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { s } from '../styles/spacing';

export default function PartnersStrip() {
  const revealRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={revealRef} className={`${s.sectionCompact} reveal`}>
      <div className={`max-w-5xl mx-auto ${s.container}`}>
        <PartnerLogos />
      </div>
    </section>
  );
}
