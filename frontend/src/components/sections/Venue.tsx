import SectionHead from '../shared/SectionHead';
import ImagePlaceholder from '../shared/ImagePlaceholder';

const travel = [
  { key: 'By Car',   val: '~2 hr from NYC. Free on-site parking. Overnight cars permitted until noon Sunday.' },
  { key: 'By Train', val: 'Amtrak Empire Service to Rhinecliff (RHI). Shuttles will run to/from the venue.' },
  { key: 'By Air',   val: 'Closest airports: ALB (60 min), HPN (90 min), JFK / LGA / EWR (2 hr+).' },
];

export default function Venue() {
  return (
    <section id="venue" className="block">
      <SectionHead eyebrow="Where to find us" title="The" italic="venue" />
      <div className="venue-grid">
        <div>
          <ImagePlaceholder ratio="1x1" label="Venue exterior · 1 : 1" />
        </div>
        <div className="venue-info">
          <h3>Hollow Maple Farm</h3>
          <div className="venue-addr">412 Old Mill Road, Rhinebeck, NY</div>
          <p>A working orchard turned wedding farm, about 100 miles north of Manhattan. Ceremony and reception are on the same grounds; please wear shoes friendly to grass.</p>
          <div className="travel-list">
            {travel.map(t => (
              <div key={t.key} className="travel-item">
                <div className="travel-key">{t.key}</div>
                <div className="travel-val">{t.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
