import { s } from '../styles/spacing';

export default function Divider() {
  return (
    <div className={`relative h-[1px] w-full ${s.divider}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-tertiary/40 to-transparent" />
    </div>
  );
}
