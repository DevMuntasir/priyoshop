/* PriyoShop homepage — sections B: Data-Driven, Brands, Embedded Finance + Partners, Impact */
const { Button: BtnB, Badge: BadgeB, Icon: IconB } = window.PriyoShopDesignSystem_0fb1f5;
const IMGB = './img/';

function DataDriven({ onLearn }) {
  const shots = ['6a559c2d6457bb77', '9e6bc096956accf7', 'cefc34ad1c908698'];
  return (
    <section className="sec">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 48 }}>
          <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow" style={{ color: '#000' }}>Smart Infrastructure</span>
            <h2 className="display h1">Data-Driven Retail Infrastructure</h2>
            <p className="lead">PriyoShop combines commerce, logistics, embedded finance, and data intelligence to build a smarter retail ecosystem for Bangladesh.</p>
          </div>
          <BtnB variant="outlined" onClick={onLearn}>Learn More</BtnB>
        </div>
        <div className="grid-3">
          {shots.map((s) => (
            <div key={s} className="photo" style={{ height: 300, backgroundImage: `url(${IMGB}${s}.png)` }}></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="sec-sm">
      <div className="container">
        <div className="head-center" style={{ marginBottom: 40 }}>
          <h2 className="display h2">Trusted by 40+ Brands</h2>
          <p className="lead">Connecting the country's biggest FMCG names to every corner shop.</p>
        </div>
        <div className="brand-wall">
          <img src={`${IMGB}b4d1091a2b39581c.png`} alt="Brands that trust PriyoShop — PRAN, Nestlé, Unilever, Coca-Cola, P&G, Square and more" />
        </div>
      </div>
    </section>
  );
}

function Finance({ onLearn }) {
  const partners = ['4831a0904d1ab12d', '3873dea73b1936b5', 'b9c7282e14709a7d'];
  return (
    <section className="sec">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
        <div className="finance">
          <div className="finance-copy">
            <BadgeB tone="gold" variant="solid" style={{ alignSelf: 'flex-start' }}>Embedded Finance</BadgeB>
            <h2 className="display h2" style={{ color: '#fff' }}>Unlock Growth &amp; Smart Retail Finance</h2>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 18, lineHeight: 1.5, margin: 0, maxWidth: 420 }}>
              Buy-now-pay-later and working-capital tools that let retailers stock more and grow without cash-flow gaps.
            </p>
            <BtnB tone="light" onClick={onLearn} style={{ alignSelf: 'flex-start' }}>Learn More</BtnB>
          </div>
          <img className="finance-img" src={`${IMGB}c2d4905853e85101.png`} alt="Shop owner using the PriyoShop app" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
          <h3 className="display h2" style={{ fontSize: 28 }}>Strategic Partners</h3>
          <div className="logo-row">
            {partners.map((p) => <img key={p} className="lg" src={`${IMGB}${p}.png`} alt="Strategic partner" />)}
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--ps-ink-700)' }}>Mastercard</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  // SDG goal crops from the 17-goal sprite (6 cols x 3 rows)
  const sdg = [
    { x: '0%', y: '0%' },    // 1 No Poverty
    { x: '80%', y: '0%' },   // 5 Gender Equality
    { x: '20%', y: '50%' },  // 8 Decent Work
    { x: '60%', y: '50%' },  // 10 Reduced Inequalities
    { x: '80%', y: '100%' }, // 17 Partnerships
  ];
  const opp = [
    { v: '5M', l: 'MSMEs' },
    { v: '$200B', l: 'Annual GMV by MSMEs' },
    { v: '$2.8B', l: 'Financial Gap' },
  ];
  const awards = [
    { c: 'Champion at South Asia University', img: '21648b3bb3569848' },
    { c: 'Microsoft for Startups', img: 'cefc34ad1c908698' },
    { c: 'UNDP Featured PriyoShop', img: '6a559c2d6457bb77' },
    { c: 'Google for Startups', img: '9e6bc096956accf7' },
  ];
  return (
    <section className="dark">
      {/* Drive Changes / SDG */}
      <div className="container sec">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="dist-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <BadgeB tone="brand" variant="soft" style={{ alignSelf: 'flex-start', background: 'rgba(238,47,71,.18)' }}>Sustainable Impact</BadgeB>
            <h2 className="display h1" style={{ color: '#fff' }}>Drive Changes<br /><span className="red">Empower Women</span><br />Shaping the Future</h2>
            <p className="lead">Aligning our growth with the UN Sustainable Development Goals — building an inclusive retail economy for Bangladesh.</p>
          </div>
          <div className="sdg-row" style={{ justifyContent: 'flex-end' }}>
            {sdg.map((g, i) => (
              <div key={i} className="sdg" style={{ backgroundPosition: `${g.x} ${g.y}` }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="container" style={{ paddingBottom: 96 }}>
        <div className="head-center" style={{ marginBottom: 40 }}>
          <h2 className="display h1" style={{ color: '#fff' }}>Opportunities in Bangladesh</h2>
          <p className="lead">A vast, underserved retail market ready for digital transformation.</p>
        </div>
        <div className="opp-wrap">
          <div className="opp-row">
            {opp.map((o, i) => (
              <div className="opp" key={o.l} style={{ borderLeft: i ? '1px solid rgba(0,0,0,.1)' : 'none' }}>
                <span className="v">{o.v}</span>
                <span className="l">{o.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="container" style={{ paddingBottom: 96 }}>
        <div className="head-center" style={{ marginBottom: 40, flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
          <img src={`${IMGB}feed24ee6e7574a3.png`} alt="" style={{ width: 56, height: 56 }} />
          <h2 className="display h2" style={{ color: '#fff' }}>Awards &amp; Recognition Moments</h2>
        </div>
        <div className="grid-4">
          {awards.map((a) => (
            <div key={a.c} className="award" style={{ background: '#111', boxShadow: 'inset 0 0 0 1px #2a2a2a' }}>
              <div className="img" style={{ backgroundImage: `url(${IMGB}${a.img}.png)` }}></div>
              <div className="cap" style={{ color: '#fff' }}>{a.c}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PSDataDriven: DataDriven, PSBrands: Brands, PSFinance: Finance, PSImpact: Impact });
