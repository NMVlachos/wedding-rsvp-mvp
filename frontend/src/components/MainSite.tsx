import { useState, useEffect, useCallback } from 'react';
import type { Guest } from '../App';
import Navbar, { SECTIONS } from './Navbar';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import Schedule from './sections/Schedule';
import Venue from './sections/Venue';
import Stays from './sections/Stays';
import DressCode from './sections/DressCode';
import Registry from './sections/Registry';
import RSVP from './sections/RSVP';
import AdminDashboard from './AdminDashboard';
import Footer from './Footer';

interface Props {
  guest: Guest;
  onLogout: () => void;
}

export default function MainSite({ guest, onLogout }: Props) {
  const [active, setActive] = useState('home');

  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector('.nav') as HTMLElement | null;
    const offset = (nav?.offsetHeight ?? 60) + 8;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const ids = SECTIONS.map(s => s.id);

    function onScroll() {
      const navH = ((document.querySelector('.nav') as HTMLElement | null)?.offsetHeight ?? 60) + 20;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - navH <= 0) current = id;
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Navbar active={active} onJump={jump} onLogout={onLogout} />
      {guest.role === 'admin' && <AdminDashboard />}
      <Hero />
      <OurStory />
      <Schedule />
      <Venue />
      <Stays />
      <DressCode />
      <Registry />
      <RSVP guest={guest} />
      <Footer />
    </>
  );
}
