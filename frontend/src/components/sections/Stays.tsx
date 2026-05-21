import SectionHead from '../shared/SectionHead';
import ImagePlaceholder from '../shared/ImagePlaceholder';

const items = [
  { tag: 'Room block', name: 'The Beekman House',   rate: 'From $245 / night', dist: '8 min to venue',  desc: 'A converted 1820s inn with twelve rooms and a very good breakfast. Use code JJ2026 by Aug 15.' },
  { tag: 'Boutique',   name: 'Maplewood Lodge',     rate: 'From $310 / night', dist: '12 min to venue', desc: 'Larger property with a pool and full bar. Family rooms available. No code required.' },
  { tag: 'Budget',     name: 'Rhinebeck Motor Inn', rate: 'From $129 / night', dist: '5 min to venue',  desc: "Clean, simple, and an easy walk from the village. Limited rooms — book early." },
];

export default function Stays() {
  return (
    <section id="stay" className="block">
      <SectionHead
        eyebrow="Where to sleep"
        title="Accommodations"
        sub="Three nearby options, blocked or recommended for our guests."
      />
      <div className="stays-grid">
        {items.map(s => (
          <div key={s.name} className="stay-card">
            <ImagePlaceholder ratio="4x3" label={s.name.toLowerCase()} />
            <div className="stay-tag">{s.tag}</div>
            <h4>{s.name}</h4>
            <p>{s.desc}</p>
            <div className="stay-meta">
              <span>{s.dist}</span>
              <span className="stay-rate">{s.rate}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
