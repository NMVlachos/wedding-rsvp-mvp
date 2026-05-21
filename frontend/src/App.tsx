import { useState } from 'react';
import Login from './components/Login';
import MainSite from './components/MainSite';
import { decodeToken, clearToken } from './lib/auth';

export interface Guest {
  firstName: string;
  lastName: string;
  code: string;
  role: 'admin' | 'guest';
}

export default function App() {
  const [guest, setGuest] = useState<Guest | null>(() => decodeToken());

  function handleLogout() {
    clearToken();
    setGuest(null);
  }

  return guest
    ? <MainSite guest={guest} onLogout={handleLogout} />
    : <Login onLogin={setGuest} />;
}
