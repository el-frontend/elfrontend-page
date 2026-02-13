"use client";

import { cn } from "@/lib/utils";
import React from "react";

type MermaidProps = {
  chart: string;
  className?: string;
};

const Mermaid: React.FC<MermaidProps> = ({ chart, className }) => {
  const [svg, setSvg] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [scale, setScale] = React.useState(1);
  const id = React.useId();

  const minScale = 0.5;
  const maxScale = 3;

  const clampScale = React.useCallback((value: number) => {
    return Math.min(maxScale, Math.max(minScale, value));
  }, []);

  const zoomIn = React.useCallback(() => {
    setScale((current) => clampScale(current + 0.2));
  }, [clampScale]);

  const zoomOut = React.useCallback(() => {
    setScale((current) => clampScale(current - 0.2));
  }, [clampScale]);

  const resetZoom = React.useCallback(() => {
    setScale(1);
  }, []);

  const onWheelZoom = React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      const step = event.deltaY < 0 ? 0.1 : -0.1;
      setScale((current) => clampScale(current + step));
    },
    [clampScale],
  );

  React.useEffect(() => {
    let isMounted = true;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
        });

        const { svg } = await mermaid.render(
          `mermaid-${id.replaceAll(":", "")}`,
          chart,
        );

        if (!isMounted) return;
        setSvg(svg);
        setError(null);
      } catch {
        if (!isMounted) return;
        setError("Failed to render Mermaid diagram.");
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  React.useEffect(() => {
    setScale(1);
  }, [chart]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (error) {
    return (
      <pre className={cn("mb-4 mt-6 overflow-x-auto rounded-lg border p-4 text-sm", className)}>
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className={cn("my-6 rounded-lg border p-4 text-sm text-muted-foreground", className)}>
        Rendering diagram...
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={cn("my-6 w-full rounded-lg border p-4 text-left", className)}
        onClick={() => {
          setScale(1);
          setIsOpen(true);
        }}
        aria-label="Open mermaid diagram in fullscreen"
      >
        <div className="overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 md:p-8" role="dialog" aria-modal="true">
          <div className="mx-auto flex h-full max-w-7xl flex-col rounded-lg border bg-background">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-sm text-muted-foreground">Esc para cerrar</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs font-medium"
                  onClick={zoomOut}
                  aria-label="Zoom out mermaid diagram"
                >
                  -
                </button>
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs font-medium"
                  onClick={resetZoom}
                  aria-label="Reset mermaid diagram zoom"
                >
                  {Math.round(scale * 100)}%
                </button>
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs font-medium"
                  onClick={zoomIn}
                  aria-label="Zoom in mermaid diagram"
                >
                  +
                </button>
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs font-medium"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close mermaid fullscreen view"
                >
                  Cerrar
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4" onWheel={onWheelZoom}>
              <div className="flex h-full min-h-full w-full min-w-full items-center justify-center">
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "center",
                    width: "100%",
                    height: "100%",
                  }}
                  className="flex h-full w-full items-center justify-center [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mermaid;