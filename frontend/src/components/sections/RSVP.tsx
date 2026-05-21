import { useState } from 'react';
import type { Guest } from '../../App';
import { getToken } from '../../lib/auth';

type Attending = 'yes' | 'no' | null;
type Diet = 'none' | 'vegetarian' | 'vegan';

interface Props {
  guest: Guest;
}

export default function RSVP({ guest }: Props) {
  const [attending, setAttending] = useState<Attending>(null);
  const [diet, setDiet] = useState<Diet>('none');
  const [song, setSong] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!attending) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE ?? ''}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          inviteCode: guest.code,
          firstName: guest.firstName,
          attending,
          diet: attending === 'yes' ? diet : null,
          song: attending === 'yes' ? song.trim() : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Failed to submit RSVP.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  const dietOptions: { id: Diet; ttl: string; desc: string }[] = [
    { id: 'none',       ttl: 'No restrictions', desc: 'All courses, please' },
    { id: 'vegetarian', ttl: 'Vegetarian',       desc: 'No meat or fish' },
    { id: 'vegan',      ttl: 'Vegan',            desc: 'Plant-based' },
  ];

  return (
    <section id="rsvp" className="rsvp-band">
      {/* Section header */}
      <div className="section-head">
        <div className="eyebrow">Kindly reply</div>
        <h2>
          <span style={{ color: '#fff' }}>R</span>
          <span className="it">S</span>
          <span style={{ color: '#fff' }}>V</span>
          <span className="it">P</span>
        </h2>
        <div className="section-rule">
          <span className="sr-line" />
          <span className="sr-diamond" />
          <span className="sr-line" />
        </div>
        <p className="sub">By August 15, 2026.</p>
      </div>

      {submitted ? (
        <div className="rsvp-form">
          <div className="rsvp-thanks">
            <div className="rsvp-check">✓</div>
            <h3>Thank you, <span className="it">{guest.firstName}</span></h3>
            <p>
              {attending === 'yes'
                ? "We can't wait to celebrate with you on September 19."
                : "We'll miss you — thank you for letting us know. We'll raise a glass in your honor."}
            </p>
            <button className="rsvp-edit-btn" onClick={() => setSubmitted(false)}>
              Edit response
            </button>
          </div>
        </div>
      ) : (
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-greeting">Hello, {guest.firstName} —</div>

          {/* Q1: Attending */}
          <div className="q">
            <div className="q-label">Will you join us?</div>
            <div className="choice-row">
              {([
                { val: 'yes' as const, ttl: 'Joyfully accepts',    desc: "I'll be there" },
                { val: 'no'  as const, ttl: 'Regretfully declines', desc: "Can't make it" },
              ]).map(opt => (
                <button
                  key={opt.val}
                  type="button"
                  className={`choice${attending === opt.val ? ' active' : ''}`}
                  onClick={() => setAttending(opt.val)}
                >
                  <span className="choice-radio" />
                  <div className="choice-col">
                    <span className="choice-ttl">{opt.ttl}</span>
                    <span className="choice-desc">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {attending === 'yes' && (
            <>
              {/* Q2: Diet */}
              <div className="q">
                <div className="q-label">Dietary preference</div>
                <div className="q-help">So we can plan the table accordingly.</div>
                <div className="choice-row">
                  {dietOptions.map(d => (
                    <button
                      key={d.id}
                      type="button"
                      className={`choice${diet === d.id ? ' active' : ''}`}
                      onClick={() => setDiet(d.id)}
                    >
                      <span className="choice-radio" />
                      <div className="choice-col">
                        <span className="choice-ttl">{d.ttl}</span>
                        <span className="choice-desc">{d.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3: Song */}
              <div className="q">
                <div className="q-label">Your favorite song</div>
                <div className="q-help">Something to fill the dance floor — we're building the playlist.</div>
                <input
                  className="rsvp-input"
                  type="text"
                  value={song}
                  maxLength={200}
                  placeholder="Artist — Title"
                  onChange={e => setSong(e.target.value)}
                />
              </div>
            </>
          )}

          {error && (
            <div className="login-error">{error}</div>
          )}

          <button
            type="submit"
            className="rsvp-submit"
            disabled={!attending || loading}
          >
            {loading ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      )}
    </section>
  );
}
