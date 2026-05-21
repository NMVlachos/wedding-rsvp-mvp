const swatches = [
  { color: '#7a8a72', label: 'sage' },
  { color: '#d8c9a8', label: 'oat' },
  { color: '#c8a984', label: 'fawn' },
  { color: '#8a6a5a', label: 'clay' },
  { color: '#3d3a36', label: 'ink' },
];

export default function DressCode() {
  return (
    <section id="dress" className="dress-band">
      <div className="dress-inner">
        <div>
          <div className="eyebrow" style={{ display: 'inline-block', marginBottom: 18 }}>A note on attire</div>
          <h3>Garden <span className="it">formal</span></h3>
          <p>Cocktail dresses, suits, jumpsuits — anything you'd wear to a dressy garden party. Block heels recommended; the ceremony is on grass. Cooler in the evening — a wrap or jacket is wise.</p>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-faint)', fontSize: 15 }}>
            Suggested palette below — for inspiration, not obligation.
          </p>
        </div>
        <div>
          <div className="palette">
            {swatches.map(s => (
              <div key={s.label} className="swatch" style={{ background: s.color }}>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
