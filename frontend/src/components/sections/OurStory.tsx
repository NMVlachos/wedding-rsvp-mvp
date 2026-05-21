import SectionHead from '../shared/SectionHead';
import ImagePlaceholder from '../shared/ImagePlaceholder';

export default function OurStory() {
  return (
    <section id="story" className="block">
      <SectionHead eyebrow="Chapter One" title="Our" italic="story" />
      <div className="story-grid">
        <div>
          <ImagePlaceholder ratio="3x4" label="Couple portrait · 3 : 4" />
        </div>
        <div className="story-copy">
          <p>We met on a rainy Tuesday in a tiny café in Brooklyn. Jane was reading the same book John had just finished — the one with the dog-eared corners and coffee stains. Conversation followed; so did dinner.</p>
          <p>Seven years, three apartments, and one very opinionated cat later, John proposed on a quiet ridge above the Hudson, just as the maples were turning. Jane said yes before he finished the sentence.</p>
          <p>We are so glad you'll be there as we say the rest of it.</p>
          <div className="story-sig">— John &amp; Jane</div>
        </div>
      </div>
    </section>
  );
}
