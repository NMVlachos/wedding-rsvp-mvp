import ImagePlaceholder from '../shared/ImagePlaceholder';

export default function Hero() {
  return (
    <section id="home" className="block" style={{ paddingTop: 60 }}>
      <div className="hero">
        <div className="eyebrow">Together with their families</div>
        <h1 className="couple-big">John<span className="amp">&amp;</span>Jane</h1>
        <div className="section-rule">
          <span className="sr-line" />
          <span className="sr-diamond" />
          <span className="sr-line" />
        </div>
        <div className="hero-meta">
          <span>Saturday</span>
          <span className="meta-dot" />
          <span>September 19, 2026</span>
          <span className="meta-dot" />
          <span>Hudson Valley, NY</span>
        </div>
      </div>
      <div className="hero-image">
        <ImagePlaceholder ratio="16x9" label="Engagement photo · 16 : 9" />
      </div>
    </section>
  );
}
