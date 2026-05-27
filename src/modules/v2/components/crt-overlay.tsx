// Renders the four CRT layers. Visibility is toggled via the
// `.crt-on` / `.crt-off` class on `.arcade-root` (set by ArcadeProvider).
export function CrtOverlay() {
  return (
    <>
      <div className="crt-scan" aria-hidden />
      <div className="crt-vignette" aria-hidden />
      <div className="crt-glow" aria-hidden />
      <div className="crt-flicker" aria-hidden />
    </>
  );
}
