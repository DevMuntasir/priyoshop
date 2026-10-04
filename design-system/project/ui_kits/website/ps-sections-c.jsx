/* PriyoShop homepage — sections C: Media & News, Blogs, Journey, Career, App, Final CTA */
const { Button: BtnC, Badge: BadgeC, Icon: IconC, StoreButton } = window.PriyoShopDesignSystem_0fb1f5;
const IMGC = './img/';

function Media() {
  const news = [
    { src: 'The Daily Star', ttl: 'PriyoShop among the top startups transforming retail in Bangladesh', date: '12 Jun 2026', img: '21648b3bb3569848' },
    { src: 'The Business Standard', ttl: 'How 200,000 corner shops are digitising their supply chain with PriyoShop', date: '03 May 2026', img: 'cefc34ad1c908698' },
    { src: 'Tech in Asia', ttl: 'B2B commerce platform PriyoShop expands last-mile distribution nationwide', date: '21 Apr 2026', img: '6a559c2d6457bb77' },
  ];
  return (
    <section className="sec">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="eyebrow" style={{ color: '#000' }}>In the Press</span>
            <h2 className="display h1">Media &amp; News</h2>
          </div>
          <BtnC variant="outlined" iconRight={<IconC name="arrow-right" />}>View All</BtnC>
        </div>
        <div className="grid-3">
          {news.map((n) => (
            <a key={n.ttl} className="mcard" href="#" onClick={(e) => e.preventDefault()}>
              <div className="img" style={{ backgroundImage: `url(${IMGC}${n.img}.png)` }}></div>
              <div className="body">
                <span className="src">{n.src}</span>
                <h3 className="ttl">{n.ttl}</h3>
                <span className="date">{n.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blogs() {
  const blogs = [
    { tag: 'Retail Tips', ttl: 'Five ways smart restocking boosts a corner shop\u2019s monthly margin', date: '08 Jun 2026', img: '9e6bc096956accf7' },
    { tag: 'Distribution', ttl: 'What last-mile logistics looks like across 48 districts', date: '29 May 2026', img: 'c2d4905853e85101' },
    { tag: 'Finance', ttl: 'Working capital, explained: stocking more without the cash-flow gap', date: '14 May 2026', img: '6a559c2d6457bb77' },
  ];
  return (
    <section className="sec-sm">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 44 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="eyebrow" style={{ color: '#000' }}>Insights</span>
            <h2 className="display h1">Read our Blogs</h2>
          </div>
          <BtnC variant="ghost" iconRight={<IconC name="arrow-right" />}>Read All Blogs</BtnC>
        </div>
        <div className="grid-3">
          {blogs.map((b) => (
            <a key={b.ttl} className="mcard" href="#" onClick={(e) => e.preventDefault()}>
              <div className="img" style={{ backgroundImage: `url(${IMGC}${b.img}.png)` }}></div>
              <div className="body">
                <span className="src">{b.tag}</span>
                <h3 className="ttl">{b.ttl}</h3>
                <span className="date">{b.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    { yr: '2019', d: 'PriyoShop founded with a vision to digitise retail in Bangladesh.', img: '21648b3bb3569848' },
    { yr: '2021', d: 'Launched the B2B commerce platform for MSMEs.', img: '6a559c2d6457bb77' },
    { yr: '2022', d: 'Raised Series A, expanded distribution network.', img: 'cefc34ad1c908698' },
    { yr: '2024', d: 'Reached 100+ operational hubs across 48 districts.', img: '9e6bc096956accf7' },
    { yr: '2026', d: 'Serving 200K+ MSMEs with embedded finance.', img: 'c2d4905853e85101' },
  ];
  return (
    <section className="dark">
      <div className="container sec">
        <div className="head-center" style={{ marginBottom: 48 }}>
          <span className="eyebrow" style={{ color: '#fff' }}>Our Story</span>
          <h2 className="display h1" style={{ color: '#fff' }}>The PriyoShop Journey</h2>
        </div>
        <div className="timeline">
          {steps.map((s) => (
            <div className="tl" key={s.yr}>
              <span className="yr">{s.yr}</span>
              <div className="img" style={{ backgroundImage: `url(${IMGC}${s.img}.png)` }}></div>
              <p className="d" style={{ color: 'rgba(255,255,255,.6)' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Career({ onJoin }) {
  return (
    <section className="sec">
      <div className="container">
        <div className="career">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="eyebrow" style={{ color: '#000' }}>Careers</span>
            <h2 className="display h1">Build the Future of<br />Retail With Us</h2>
            <p className="lead">Join a team of 2,500+ people transforming how Bangladesh's retail economy works — from technology and operations to finance and field sales.</p>
            <BtnC size="lg" onClick={onJoin} iconRight={<IconC name="arrow-right" />} style={{ alignSelf: 'flex-start' }}>See Open Roles</BtnC>
          </div>
          <div className="career-collage">
            <div className="c tall" style={{ backgroundImage: `url(${IMGC}6a559c2d6457bb77.png)` }}></div>
            <div className="c" style={{ backgroundImage: `url(${IMGC}9e6bc096956accf7.png)` }}></div>
            <div className="c" style={{ backgroundImage: `url(${IMGC}cefc34ad1c908698.png)` }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppPromo() {
  return (
    <section className="sec-sm">
      <div className="container">
        <div className="app-band">
          <div className="copy">
            <BadgeC tone="brand" variant="soft" style={{ alignSelf: 'flex-start', background: 'rgba(238,47,71,.18)' }}>One app, every order</BadgeC>
            <h2 className="display h2" style={{ color: '#fff' }}>Your whole shop's<br />sourcing, in one app</h2>
            <p style={{ color: 'rgba(255,255,255,.72)', fontSize: 18, lineHeight: 1.55, margin: 0, maxWidth: 440 }}>
              Browse thousands of SKUs, compare prices, place an order in seconds and track delivery to your door.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
              <StoreButton store="apple" theme="light" href="#" />
              <StoreButton store="google" theme="light" href="#" />
            </div>
          </div>
          <div className="art">
            <img src={`${IMGC}c2d4905853e85101.png`} alt="PriyoShop mobile app" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onJoin }) {
  return (
    <section className="sec">
      <div className="container">
        <div style={{ borderRadius: 40, padding: '80px 40px', textAlign: 'center',
          background: 'linear-gradient(164.08deg, #FFFCFA 20.36%, #FFE4D1 61.73%, #C5A8FF 103.10%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <h2 className="display h1" style={{ maxWidth: 720 }}>Grow your business with PriyoShop</h2>
          <p className="lead" style={{ maxWidth: 540 }}>Whether you run a corner shop or a national brand, our platform helps you reach further and sell more.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <BtnC size="lg" onClick={onJoin} iconRight={<IconC name="arrow-right" />}>Join Us Today</BtnC>
            <BtnC size="lg" variant="outlined">Talk to Sales</BtnC>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PSMedia: Media, PSBlogs: Blogs, PSJourney: Journey, PSCareer: Career, PSAppPromo: AppPromo, PSFinalCTA: FinalCTA });
