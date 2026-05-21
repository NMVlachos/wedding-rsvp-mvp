import { useState, useEffect } from 'react';
import { getToken } from '../lib/auth';

interface RsvpRow {
  id: number;
  invite_code: string;
  first_name: string;
  attending: 'yes' | 'no';
  diet: 'none' | 'vegetarian' | 'vegan' | null;
  song: string | null;
  updated_at: string;
}

export default function AdminDashboard() {
  const [rows, setRows] = useState<RsvpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE ?? ''}/api/rsvp`, {
      headers: { 'Authorization': `Bearer ${getToken()}` },
    })
      .then(r => r.ok ? r.json() : r.json().then((d: { error?: string }) => Promise.reject(d.error ?? 'Failed to load.')))
      .then((data: RsvpRow[]) => setRows(data))
      .catch(err => setError(typeof err === 'string' ? err : 'Failed to load RSVPs.'))
      .finally(() => setLoading(false));
  }, []);

  const attending = rows.filter(r => r.attending === 'yes').length;
  const declined  = rows.filter(r => r.attending === 'no').length;

  return (
    <section id="admin" className="admin-band">
      <div className="admin-inner">
      <div className="section-head">
        <div className="admin-eyebrow-row">
          <div className="eyebrow">RSVP Responses</div>
          <span className="admin-only-badge">Admin Only</span>
        </div>
        <h2>Guest <span className="it">Responses</span></h2>
        <div className="section-rule">
          <span className="sr-line" />
          <span className="sr-diamond" />
          <span className="sr-line" />
        </div>
      </div>

      {loading && <p className="admin-loading">Loading…</p>}
      {error   && <div className="login-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="admin-stats">
            <div className="admin-stat">
              <span className="admin-stat-n">{rows.length}</span>
              <span className="admin-stat-l">Total RSVPs</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-n">{attending}</span>
              <span className="admin-stat-l">Attending</span>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-n">{declined}</span>
              <span className="admin-stat-l">Declined</span>
            </div>
          </div>

          {rows.length === 0 ? (
            <p className="admin-empty">No RSVPs submitted yet.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Attending</th>
                    <th>Diet</th>
                    <th>Song</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id}>
                      <td>{r.first_name}</td>
                      <td>
                        <span className={`admin-badge ${r.attending}`}>
                          {r.attending === 'yes' ? 'Attending' : 'Declined'}
                        </span>
                      </td>
                      <td>{r.diet ?? '—'}</td>
                      <td className="admin-song">{r.song ?? '—'}</td>
                      <td className="admin-date">
                        {new Date(r.updated_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      </div>
    </section>
  );
}
