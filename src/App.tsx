export default function App() {
  return (
    <main style={{ padding: "5rem 1.5rem", maxWidth: "60ch", margin: "0 auto" }}>
      <p
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "var(--text-2xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
          margin: 0,
        }}
      >
        A design system for a flashcards app
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"opsz" 72, "wght" 560',
          fontSize: "var(--text-wordmark)",
          lineHeight: 0.95,
          margin: ".75rem 0 1rem",
        }}
      >
        Tidal
      </h1>
      <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
        Scaffold ready. The documentation page is built by the implementation ticket.
      </p>
    </main>
  );
}
