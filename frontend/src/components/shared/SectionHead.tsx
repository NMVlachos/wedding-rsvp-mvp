interface Props {
  eyebrow: string;
  title: string;
  italic?: string;
  sub?: string;
}

export default function SectionHead({ eyebrow, title, italic, sub }: Props) {
  return (
    <div className="section-head">
      <div className="eyebrow">{eyebrow}</div>
      <h2>
        {title}{italic && <> <span className="it">{italic}</span></>}
      </h2>
      <div className="section-rule">
        <span className="sr-line" />
        <span className="sr-diamond" />
        <span className="sr-line" />
      </div>
      {sub && <p className="sub">{sub}</p>}
    </div>
  );
}
