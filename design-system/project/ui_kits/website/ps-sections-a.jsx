/* PriyoShop homepage — sections A: Hero (nav + hero + stats), Ecosystem, Distribution */
const { NavBar, Button, Badge, Icon, PlayIcon } = window.PriyoShopDesignSystem_0fb1f5;
const IMG = './img/';

function Hero({ onJoin, onStory, active, onNav }) {
  return (
    <header className="hero">
      <div className="hero-grid"></div>
      <div className="navwrap" style={{ position: 'relative', padding: 0 }}>
        <div className="container" style={{ paddingTop: 22 }}>
          <NavBar active={active} onNavigate={onNav} onCta={onJoin}
            onSecondary={() => onStory('Call us at 09610989922')} />
        </div>
      </div>
      <div className="hero-inner">
        <div className="container">
          <div className="hero-copy">
            <h1 className="display h-hero">
              Bangladesh's<br /><span className="red">Leading Distribution Partner</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560 }}>
              We connect five million MSMEs to leading brands through a tech-driven distribution platform.
            </p>
            <div className="btn-row">
              <Button size="lg" onClick={onJoin} iconRight={<Icon name="arrow-right" />}>Join Us</Button>
              <Button size="lg" variant="ghost" onClick={() => onStory('▶ Playing PriyoShop story…')} iconRight={<PlayIcon />}>Watch Our Story</Button>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat">
              <span className="stat-ico">👑</span>
              <div><div className="stat-val">296</div><div className="stat-lbl">Brands</div></div>
            </div>
            <div className="stat">
              <span className="stat-ico">🛍️</span>
              <div><div className="stat-val">200K+</div><div className="stat-lbl">MSMEs</div></div>
            </div>
            <div className="stat">
              <span className="stat-ico">📍</span>
              <div><div className="stat-val">1428</div><div className="stat-lbl">Route Coverage</div></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 90 }}></div>
    </header>
  );
}

function Ecosystem({ onLearn }) {
  return (
    <section className="sec">
      <div className="container">
        <div className="head-center" style={{ marginBottom: 56 }}>
          <span className="eyebrow" style={{ color: '#000' }}>Ecosystem at a Glance</span>
          <h2 className="display h1">Our Business &amp; Ecosystem</h2>
          <p className="lead" style={{ maxWidth: 600 }}>Empowering MSMEs through technology and seamless supply chains.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="eco-card">
            <div className="eco-panel" style={{ background: 'var(--ps-green-tint)' }}>
              <div>
                <h3 className="eco-title">Retail Business</h3>
                <p className="lead">B2B platform empowering millions of MSMEs with faster restocking and smart supply chain.</p>
              </div>
              <Button variant="ghost" onClick={onLearn} iconRight={<Icon name="arrow-right" />} style={{ paddingLeft: 0, alignSelf: 'flex-start' }}>Learn More</Button>
            </div>
            <div className="eco-media" style={{ backgroundImage: `url(${IMG}8515c6b788a5b8a4.png)` }}></div>
          </div>
          <div className="eco-card">
            <div className="eco-media" style={{ backgroundImage: `url(${IMG}9e6bc096956accf7.png)` }}></div>
            <div className="eco-panel" style={{ background: 'var(--ps-periwinkle)' }}>
              <div>
                <h3 className="eco-title">Smart Distribution</h3>
                <p className="lead">Partnering with leading brands to streamline and simplify last-mile distribution across Bangladesh.</p>
              </div>
              <Button variant="ghost" onClick={onLearn} iconRight={<Icon name="arrow-right" />} style={{ paddingLeft: 0, alignSelf: 'flex-start' }}>Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Distribution({ onLearn }) {
  const items = [
    { n: '01', t: 'Digitalisation', d: 'Helping MSMEs manage sourcing and inventory with a fully digital platform.' },
    { n: '02', t: 'Sales Booster' },
    { n: '03', t: 'Time Saver' },
    { n: '04', t: 'Price Transparency' },
  ];
  const strip = [
    { v: '120+', l: 'Total Operational Hub' },
    { v: '48+', l: 'Total District Coverage' },
    { v: '2500+', l: 'Total People Employed' },
  ];
  return (
    <section className="dark">
      <div className="container sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <h2 className="display h1">Distribution</h2>
              <p className="lead">Grow Your Retail Business with the Best FMCG Wholesale Distributor. MSMEs' one-stop platform for bulk FMCG supplies — connect with top brands, access quality products, and get fast delivery right to the retail doorstep.</p>
            </div>
            <Button tone="light" variant="outlined" onClick={onLearn}>Learn More</Button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="dist-split">
            <div className="accordion">
              {items.map((it, i) => (
                <div key={it.n} className={'acc-item' + (i ? ' muted' : '')}>
                  <span className="acc-num">{it.n}</span>
                  <div>
                    <h4 className="acc-t">{it.t}</h4>
                    {it.d && <p className="acc-d">{it.d}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="photo" style={{ height: 230, backgroundImage: `url(${IMG}6a559c2d6457bb77.png)` }}></div>
              <div className="photo" style={{ height: 230, backgroundImage: `url(${IMG}9e6bc096956accf7.png)` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 96 }}>
        <div className="head-center" style={{ marginBottom: 48 }}>
          <h2 className="display h2">Last mile distribution in Bangladesh</h2>
          <p className="lead" style={{ maxWidth: 720 }}>Revolutionizing B2B distribution by integrating advanced technology solutions to streamline operations, enhance supply chain visibility, and improve customer engagement.</p>
        </div>
        <div className="stat-strip">
          {strip.map((s, i) => (
            <div className="b" key={s.l} style={{ borderLeft: i ? '1px solid #2a2a2a' : 'none' }}>
              <span className="v red">{s.v}</span>
              <span className="l">{s.l}</span>
            </div>
          ))}
        </div>
        <div className="head-center" style={{ marginTop: 96 }}>
          <h2 className="display h1" style={{ maxWidth: 760 }}>One B2B Platform for All<br />Your Retail Business Needs</h2>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PSHero: Hero, PSEcosystem: Ecosystem, PSDistribution: Distribution });
