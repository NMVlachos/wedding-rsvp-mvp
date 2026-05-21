import SectionHead from '../shared/SectionHead';

const items = [
  { mark: 'i',   name: 'Our Home',        desc: 'A small list at Crate & Barrel — kitchen things, mostly.' },
  { mark: 'ii',  name: 'Honeymoon Fund',  desc: "We're saving for two weeks in southern Italy." },
  { mark: 'iii', name: 'A Local Cause',   desc: "If you'd rather, give in our names to the Hudson Valley Food Bank." },
];

export default function Registry() {
  return (
    <section id="registry" className="block tight">
      <SectionHead
        eyebrow="With gratitude"
        title="The"
        italic="registry"
        sub="Your presence is the only present we need. If you'd like to do more, a few gentle options."
      />
      <div className="registry-grid">
        {items.map(r => (
          <div key={r.name} className="reg-card">
            <div className="reg-mark">{r.mark}</div>
            <h4>{r.name}</h4>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
