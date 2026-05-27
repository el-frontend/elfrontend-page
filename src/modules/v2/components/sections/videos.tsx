"use client";

import Image from "next/image";
import { useArcade } from "../../context/arcade-context";
import { PxArrow } from "../sprites/pixel";

export type ArcadeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  href: string;
  meta: string;
  isNew?: boolean;
};

export function VideosSection({ videos }: { videos: ArcadeVideo[] }) {
  const { copy, accentColor } = useArcade();

  return (
    <section id="videos" style={{ padding: "72px 32px" }}>
      <div className="container">
        <div className="sec-head">
          <div>
            <div className="sec-stage">
              <PxArrow scale={2} color="var(--hot-yellow)" /> {copy.stages.videos}
            </div>
            <h2 className="sec-title">
              {copy.videosTitle} <em style={{ color: accentColor }}>{copy.videosTitleEm}</em>
            </h2>
          </div>
          <a
            className="px-link pixel-text"
            href="https://youtube.com/@ElFrontend"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 10, letterSpacing: "0.2em" }}
          >
            {copy.videoCta} <PxArrow scale={2} />
          </a>
        </div>

        {videos.length === 0 ? (
          <div
            className="pixel-text"
            style={{
              textAlign: "center",
              padding: "40px 16px",
              border: "3px dashed var(--dim-2)",
              fontSize: 12,
              color: "var(--dim)",
              letterSpacing: "0.15em",
            }}
          >
            NO VIDEOS LOADED · CHECK BACK SOON
          </div>
        ) : (
          <div
            className="grid-4"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}
          >
            {videos.map((v, i) => (
              <a
                key={v.id}
                href={v.href}
                target="_blank"
                rel="noreferrer"
                className="pcard"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/10",
                    overflow: "hidden",
                    background: "#000",
                    borderBottom: "3px solid var(--ink)",
                  }}
                >
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(max-width: 880px) 100vw, 320px"
                    style={{
                      objectFit: "cover",
                      filter: "saturate(1.15) contrast(1.05)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0 1px, transparent 1px 3px)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        background: "var(--ink)",
                        border: "3px solid #000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PxArrow scale={3} color="#000" />
                    </div>
                  </div>
                  {v.isNew && (
                    <div
                      style={{
                        position: "absolute",
                        top: 6,
                        left: 6,
                        background: "var(--hot-red)",
                        color: "#000",
                        padding: "3px 7px",
                        fontFamily: "var(--font-pixel)",
                        fontSize: 8,
                        border: "2px solid #000",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {copy.videosNew}
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: "var(--hot-yellow)",
                      color: "#000",
                      padding: "3px 7px",
                      fontFamily: "var(--font-pixel)",
                      fontSize: 8,
                      border: "2px solid #000",
                    }}
                  >
                    #{(i + 1).toString().padStart(2, "0")}
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 14px 16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-pixel-body)",
                      fontSize: 20,
                      lineHeight: 1.25,
                      color: "var(--ink)",
                      flex: 1,
                    }}
                  >
                    {v.title}
                  </div>
                  <div
                    className="pixel-text"
                    style={{
                      fontSize: 8,
                      color: "var(--dim)",
                      letterSpacing: "0.15em",
                      marginTop: 10,
                    }}
                  >
                    {v.meta.toUpperCase()}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
