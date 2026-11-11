import { useState, type ReactNode } from "react";
import { cx } from "../lib/cx";
import {
  foundationPages,
  routes,
  type Route,
} from "./routes";
import { componentGroups, components } from "./registry";
import { Monogram, Redactions } from "./ui";
import styles from "./Shell.module.css";

function activeHref(route: Route): string {
  if (route.kind === "foundation") return routes.foundation(route.slug);
  if (route.kind === "component") return routes.component(route.id);
  if (route.kind === "accessibility") return routes.accessibility;
  return routes.overview;
}

function NavLink({
  href,
  index,
  name,
  current,
  onNavigate,
}: {
  href: string;
  index: string;
  name: string;
  current: boolean;
  onNavigate: () => void;
}) {
  return (
    <li>
      <a
        href={href}
        className={cx(styles.navLink, current && styles.navLinkActive)}
        aria-current={current ? "page" : undefined}
        onClick={onNavigate}
      >
        <span className={styles.navIndex} aria-hidden="true">
          {index}
        </span>
        <span>{name}</span>
      </a>
    </li>
  );
}

export function Shell({
  route,
  children,
}: {
  route: Route;
  children: ReactNode;
}) {
  const [openFor, setOpenFor] = useState<string | null>(null);
  const current = activeHref(route);
  const railOpen = openFor === current;
  const close = () => setOpenFor(null);

  return (
    <div className={styles.shell}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a
            href={routes.overview}
            className={styles.brand}
            aria-label="Arcana, overview"
          >
            <Monogram letter="A" size="sm" />
            <span className={styles.brandText}>
              <span className={styles.wordmark}>Arcana</span>
              <span className={styles.brandMeta}>Design system / v1.0</span>
            </span>
          </a>

          <p className={styles.tagline}>A design system for a flashcards app</p>

          <div className={styles.headerRight}>
            <span className={styles.seed}>
              <span>Seed</span>
              <span className={styles.seedName}>Card A</span>
              <Redactions count={3} />
            </span>
            <a className={styles.indexLink} href="../">
              <span aria-hidden="true">←</span> Design index
            </a>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside
          className={styles.sidebar}
          data-open={railOpen ? "true" : undefined}
        >
          <button
            type="button"
            className={styles.railToggle}
            aria-expanded={railOpen}
            aria-controls="docs-nav"
            onClick={() => setOpenFor(railOpen ? null : current)}
          >
            <span className={styles.railGlyph} aria-hidden="true">
              {railOpen ? "×" : "≡"}
            </span>
            <span className={styles.railLabel}>Contents</span>
          </button>

          <nav id="docs-nav" className={styles.nav} aria-label="Documentation">
            <ul className={styles.navList}>
              <NavLink
                href={routes.overview}
                index="00"
                name="Overview"
                current={current === routes.overview}
                onNavigate={close}
              />
            </ul>

            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Foundations</p>
              <ul className={styles.navList}>
                {foundationPages.map((page, position) => {
                  const href = routes.foundation(page.slug);
                  return (
                    <NavLink
                      key={page.slug}
                      href={href}
                      index={String(position + 1).padStart(2, "0")}
                      name={page.name}
                      current={current === href}
                      onNavigate={close}
                    />
                  );
                })}
              </ul>
            </div>

            {componentGroups.map((group) => (
              <div key={group.name} className={styles.navGroup}>
                <p className={styles.navGroupLabel}>{group.name}</p>
                <ul className={styles.navList}>
                  {group.items.map((item) => {
                    const href = routes.component(item.id);
                    const position = components.findIndex(
                      (candidate) => candidate.id === item.id,
                    );
                    return (
                      <NavLink
                        key={item.id}
                        href={href}
                        index={String(position + 8).padStart(2, "0")}
                        name={item.name}
                        current={current === href}
                        onNavigate={close}
                      />
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className={cx(styles.navGroup, styles.navGroupEnd)}>
              <ul className={styles.navList}>
                <NavLink
                  href={routes.accessibility}
                  index="21"
                  name="Accessibility"
                  current={current === routes.accessibility}
                  onNavigate={close}
                />
              </ul>
            </div>
          </nav>

          <div className={styles.sidebarFoot} aria-hidden="true">
            <span>ARC</span>
            <span>Nov 2026</span>
          </div>
        </aside>

        <main id="main" className={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerLabel}>Seed card</p>
            <p>Card A — the cream archive card. Redrawn, not reproduced.</p>
          </div>
          <div>
            <p className={styles.footerLabel}>Licence</p>
            <p>
              Internal reference. Typefaces under the SIL Open Font License.
            </p>
          </div>
          <div>
            <p className={styles.footerLabel}>Build</p>
            <p>Built 2026 · v1.0 · Phase A</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
