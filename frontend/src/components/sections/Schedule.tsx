import SectionHead from '../shared/SectionHead';

const rows = [
  { time: '3:30 pm',  title: 'Welcome',         desc: 'Arrival and pre-ceremony drinks on the lawn.',                    loc: 'The Garden'   },
  { time: '4:00 pm',  title: 'Ceremony',         desc: 'Vows beneath the old maple — please be seated by 3:50.',         loc: 'The Garden'   },
  { time: '4:45 pm',  title: 'Cocktail Hour',    desc: "Hors d'oeuvres, music, and a signal lawn game or two.",           loc: 'South Terrace' },
  { time: '6:00 pm',  title: 'Dinner & Toasts',  desc: 'A long table, family-style.',                                    loc: 'The Barn'     },
  { time: '8:00 pm',  title: 'Dancing',          desc: 'Until the lights go down and the candles burn low.',             loc: 'The Barn'     },
  { time: '11:00 pm', title: 'Send-off',         desc: 'Sparklers and a slow drive home.',                               loc: 'The Lane'     },
];

export default function Schedule() {
  return (
    <section id="schedule" className="block">
      <SectionHead
        eyebrow="The day of"
        title="The"
        italic="schedule"
        sub="A loose plan for September 19. Times approximate — the day will take its own shape."
      />
      <div className="schedule-grid">
        {rows.map(r => (
          <div key={r.title} className="sched-row">
            <div className="sched-time">{r.time}</div>
            <div className="sched-what">
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
            <div className="sched-loc">{r.loc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
