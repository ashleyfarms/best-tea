export function Privacy() {
  return (
    <div className="page privacy">
      <header className="page-head">
        <h1>Privacy Policy</h1>
        <p className="lede">How Best Tea with Poss Jonah handles your information.</p>
        <p className="privacy-updated">Last updated: September 13, 2026</p>
      </header>

      <div className="prose">
        <h2>What this site is</h2>
        <p>
          Best Tea is a free, community-driven guide hosted by Poss Jonah. Visitors
          nominate and vote for iced tea spots they love — positivity only, no worst
          lists, no paywalls.
        </p>

        <h2>Information we collect</h2>
        <p>We keep things light. Depending on how you use the site, we may process:</p>
        <ul>
          <li>
            <strong>Nominations</strong> — restaurant or spot names, city, and any
            comments you submit when you nominate.
          </li>
          <li>
            <strong>Votes</strong> — which spots you upvote so rankings stay fair.
          </li>
          <li>
            <strong>Basic tech logs</strong> — standard server or hosting logs (for
            example IP address, browser type, and timestamps) that help keep the
            site running and secure.
          </li>
          <li>
            <strong>localStorage</strong> — a simple vote-lock flag stored in your
            browser so you do not accidentally vote twice from the same device. That
            data stays on your device unless you clear site data.
          </li>
        </ul>
        <p>
          We do not ask for account sign-up, home address, or unnecessary personal
          details to use Best Tea.
        </p>

        <h2>Advertising and third parties</h2>
        <p>
          When Google AdSense is enabled, Google may use cookies or similar
          identifiers to show ads and measure performance. That activity is governed
          by Google&apos;s policies, not solely by Best Tea. Learn more at{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>

        <h2>How we use information</h2>
        <p>
          We use the information above to run rankings, show community nominations,
          improve reliability, and (when ads are on) support the free site. We do <strong>not sell</strong> personal data.
        </p>

        <h2>Community content</h2>
        <p>
          Nominations and comments should stay kind and positivity-only. We may
          remove content that is abusive, spammy, or off-topic so the guide stays
          welcoming.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy or Best Tea? Contact the site owner via{' '}
          <a
            href="https://help-pal-apps.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            help-pal-apps.com
          </a>{' '}
          or through the Help-Pal / Poss Jonah links on this site.
        </p>
      </div>
    </div>
  );
}
