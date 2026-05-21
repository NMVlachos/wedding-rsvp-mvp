export const SECTIONS = [
  { id: 'home',     label: 'Home' },
  { id: 'story',    label: 'Our Story' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'venue',    label: 'Venue' },
  { id: 'stay',     label: 'Stays' },
  { id: 'dress',    label: 'Dress Code' },
  { id: 'registry', label: 'Registry' },
  { id: 'rsvp',     label: 'RSVP' },
] as const;

interface Props {
  active: string;
  onJump: (id: string) => void;
  onLogout: () => void;
}

export default function Navbar({ active, onJump, onLogout }: Props) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          J<span className="amp"> &amp; </span>J
        </div>
        <nav className="nav-links">
          {SECTIONS.filter(s => s.id !== 'rsvp').map(s => (
            <button
              key={s.id}
              className={`nav-link${active === s.id ? ' active' : ''}`}
              onClick={() => onJump(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {s.label}
            </button>
          ))}
          <button className="nav-rsvp" onClick={() => onJump('rsvp')}>RSVP</button>
          <button className="nav-logout" onClick={onLogout}>Sign out</button>
        </nav>
      </div>
    </header>
  );
}
