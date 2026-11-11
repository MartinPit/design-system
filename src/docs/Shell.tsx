import { useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../components/cx";
import { Icon } from "../icons/Icon";
import { foundationPages } from "./routes";
import type { DocsRoute } from "./routes";
import { componentGroups } from "./registry";
import { Orb } from "./Orb";
import pattern from "../styles/pattern.module.css";
import styles from "./Shell.module.css";

function isActive(route: DocsRoute, kind: DocsRoute["kind"], slug?: string) {
  if (route.kind !== kind) return false;
  if (kind === "foundations" || kind === "components") {
    return "slug" in route && route.slug === slug;
  }
  return true;
}

export function Shell({
  route,
  children,
}: {
  route: DocsRoute;
  children: ReactNode;
}) {
  const [openRoute, setOpenRoute] = useState<DocsRoute | null>(null);
  const navOpen = openRoute === route;

  return (
    <div className={styles.shell}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerPattern} aria-hidden="true">
          <div className={pattern.tile} />
        </div>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#/overview">
            <span className={styles.wordmark}>Tidal</span>
            <span className={styles.tagline}>
              A design system for a flashcards app
            </span>
          </a>

          <div className={styles.headerMeta}>
            <span className={styles.version}>v1.0</span>
            <a className={styles.indexLink} href="../">
              ← Design index
            </a>
            <span className={styles.cardChip}>
              <span className={styles.chipOrb} aria-hidden="true" />
              Seed card B
            </span>
          </div>

          <Orb size={96} className={styles.headerOrb} />
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Documentation">
          <div className={styles.sidebarPattern} aria-hidden="true">
            <div className={pattern.tile} />
          </div>
          <button
            type="button"
            className={styles.contentsToggle}
            aria-expanded={navOpen}
            aria-controls="docs-nav"
            onClick={() => setOpenRoute(navOpen ? null : route)}
          >
            <Icon name={navOpen ? "close" : "menu"} size={18} />
            <span className={styles.toggleLabel}>Contents</span>
          </button>

          <nav
            id="docs-nav"
            className={cx(styles.nav, navOpen && styles.navOpen)}
          >
            <a
              className={cx(
                styles.navLink,
                isActive(route, "overview") && styles.active,
              )}
              href="#/overview"
              aria-current={isActive(route, "overview") ? "page" : undefined}
            >
              Overview
            </a>

            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Foundations</p>
              <ul className={styles.navList}>
                {foundationPages.map((page) => {
                  const active = isActive(route, "foundations", page.slug);
                  return (
                    <li key={page.slug}>
                      <a
                        className={cx(
                          styles.navLink,
                          active && styles.active,
                        )}
                        href={`#/foundations/${page.slug}`}
                        aria-current={active ? "page" : undefined}
                      >
                        {page.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {componentGroups.map((group) => (
              <div className={styles.navGroup} key={group.id}>
                <p className={styles.navGroupLabel}>{group.label}</p>
                <ul className={styles.navList}>
                  {group.items.map((item) => {
                    const active = isActive(route, "components", item.id);
                    return (
                      <li key={item.id}>
                        <a
                          className={cx(
                            styles.navLink,
                            active && styles.active,
                          )}
                          href={`#/components/${item.id}`}
                          aria-current={active ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className={styles.navGroup}>
              <p className={styles.navGroupLabel}>Reference</p>
              <a
                className={cx(
                  styles.navLink,
                  isActive(route, "accessibility") && styles.active,
                )}
                href="#/accessibility"
                aria-current={
                  isActive(route, "accessibility") ? "page" : undefined
                }
              >
                Accessibility
              </a>
            </div>
          </nav>
        </aside>

        <main className={styles.main} id="main-content" tabIndex={-1}>
          <article className={styles.panel}>{children}</article>
        </main>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBlock}>
            <p className={styles.footerLabel}>Seed</p>
            <p className={styles.footerText}>
              Card B — an iridescent membership token with a seigaiha field and
              a glass orb.
            </p>
          </div>
          <div className={styles.footerBlock}>
            <p className={styles.footerLabel}>Licence</p>
            <p className={styles.footerText}>
              Documentation and code released under MIT.
            </p>
          </div>
          <div className={styles.footerBlock}>
            <p className={styles.footerLabel}>Built</p>
            <p className={styles.footerText}>2026 · Tidal v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
