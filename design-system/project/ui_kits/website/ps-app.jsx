/* PriyoShop homepage — assembler */
const { Footer } = window.PriyoShopDesignSystem_0fb1f5;
const { useState } = React;

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(window.__t); window.__t = setTimeout(() => el.classList.remove('show'), 1900);
}

function App() {
  const [active, setActive] = useState('About');
  const join = () => toast('Thanks! Our team will reach out shortly.');
  const nav = (label) => { setActive(label); toast(label + ' \u2014 coming up'); };

  return (
    <div>
      <PSHero active={active} onNav={nav} onJoin={join} onStory={toast} />
      <PSEcosystem onLearn={() => toast('Exploring our ecosystem\u2026')} />
      <PSDistribution onLearn={() => toast('Learn more about distribution')} />
      <PSDataDriven onLearn={() => toast('Smart infrastructure')} />
      <PSBrands />
      <PSFinance onLearn={() => toast('Embedded finance')} />
      <PSImpact />
      <PSMedia />
      <PSBlogs />
      <PSJourney />
      <PSCareer onJoin={join} />
      <PSAppPromo />
      <PSFinalCTA onJoin={join} />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
