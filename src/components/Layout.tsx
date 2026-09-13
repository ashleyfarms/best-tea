import { Link, NavLink, Outlet } from 'react-router-dom';
import { AdSlot } from './AdSlot';
import { HelpPalLink } from './HelpPalLink';

export function Layout() {
  return (
    <div className="app-shell">
      <div className="confetti confetti--tl" aria-hidden="true" />
      <div className="confetti confetti--tr" aria-hidden="true" />
      <div className="confetti confetti--bl" aria-hidden="true" />
      <div className="confetti confetti--br" aria-hidden="true" />

      <header className="site-header">
        <div className="site-header__bunting" aria-hidden="true" />
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="Best Tea home">
            <span className="brand__mark" aria-hidden="true">
              <img
                src="/poss-jonah-logo.png"
                alt=""
                className="brand__logo"
              />
            </span>
            <span className="brand__text">
              <span className="brand__name">Best Tea</span>
              <span className="brand__by">with Poss Jonah</span>
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            <NavLink to="/cities" className="nav__link">
              Cities
            </NavLink>
            <NavLink to="/nominate" className="nav__link">
              Nominate
            </NavLink>
            <NavLink to="/about" className="nav__link">
              About
            </NavLink>
          </nav>
        </div>
        <div className="site-header__scallop" aria-hidden="true" />
      </header>

      {/* Header ad lives below sticky nav so it doesn't kill the vibe */}
      <div className="ad-band">
        <AdSlot slot="header" />
      </div>

      <main className="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p className="site-footer__tag">
          Poss Jonah&apos;s guide to the best iced tea in the South.
          Positivity only — no worst lists, no paywalls.
        </p>
        <HelpPalLink />
        <p className="site-footer__fine">
          © {new Date().getFullYear()} Best Tea · Help-Pal
        </p>
      </footer>
    </div>
  );
}
