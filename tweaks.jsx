/* Tweaks panel for Agustina Gondear landing.
   Drives CSS variables + data-attributes on <html>; the vanilla page reacts. */
const { useEffect } = React;

const GG_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1d4ed8",
  "font": "inter",
  "hero": "rings"
}/*EDITMODE-END*/;

const FONT_OPTS = [
  { value: "inter", label: "Inter" },
  { value: "grotesk", label: "Hanken" },
  { value: "geist", label: "Schibsted" }
];
const HERO_OPTS = [
  { value: "rings", label: "Órbita" },
  { value: "orb", label: "Glow" }
];

function GondearTweaks() {
  const [t, setTweak] = useTweaks(GG_DEFAULTS);
  const root = document.documentElement;

  useEffect(() => { root.style.setProperty("--accent", t.accent); }, [t.accent]);
  useEffect(() => { root.setAttribute("data-font", t.font); }, [t.font]);
  useEffect(() => { root.setAttribute("data-hero", t.hero); }, [t.hero]);

  return (
    <TweaksPanel>
      <TweakSection label="Color de acento" />
      <TweakColor
        label="Azul"
        value={t.accent}
        options={["#0066FF", "#0A84FF", "#1D4ED8", "#2563EB"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakSection label="Tipografía" />
      <TweakRadio
        label="Familia"
        value={t.font}
        options={FONT_OPTS}
        onChange={(v) => setTweak("font", v)}
      />
      <TweakSection label="Visual del hero" />
      <TweakRadio
        label="Estilo"
        value={t.hero}
        options={HERO_OPTS}
        onChange={(v) => setTweak("hero", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<GondearTweaks />);
