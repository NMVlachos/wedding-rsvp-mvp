import { useState } from 'react';
import type { Guest } from '../App';
import { setToken, decodeToken } from '../lib/auth';

interface Props {
  onLogin: (guest: Guest) => void;
}

export default function Login({ onLogin }: Props) {
  const [firstName, setFirstName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !code.trim()) {
      setError('Please enter your first name and invite code.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? ''}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), inviteCode: code.trim() }),
      });

      const data = await res.json().catch(() => ({})) as { token?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? 'Sign in failed.');
      }
      if (!data.token) {
        throw new Error('Sign in failed.');
      }

      setToken(data.token);
      const guest = decodeToken();
      if (!guest) throw new Error('Sign in failed.');
      onLogin(guest);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="ornament">
          <span className="orn-line" />
          <span className="orn-dot" />
          <span className="orn-line" />
        </div>

        <div className="welcome">You are warmly invited</div>
        <h1 className="couple">John<span className="amp">&amp;</span>Jane</h1>
        <div className="when">are getting married</div>
        <div className="where">Saturday · September 19, 2026</div>

        <div className="divider-row">
          <span className="dr-rule" />
          <span className="dr-label">Guest sign-in</span>
          <span className="dr-rule" />
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              maxLength={100}
              autoComplete="given-name"
              placeholder="As it appears on your invitation"
              onChange={e => { setFirstName(e.target.value); setError(''); }}
            />
          </div>

          <div className="field">
            <label htmlFor="code">Invite code</label>
            <input
              id="code"
              type="text"
              value={code}
              maxLength={4}
              autoCapitalize="characters"
              placeholder="4-letter code from your invitation"
              onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="btn full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="hint">
          Lost your code? Email us at <em>hello@johnandjane.wedding</em>
        </div>
      </div>
    </div>
  );
}
