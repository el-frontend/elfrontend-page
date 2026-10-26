"use client";

import { useMemo, useState } from "react";
import { ArcadeProvider } from "../context/arcade-context";
import { CrtOverlay } from "../components/crt-overlay";
import { KonamiBanner } from "../components/konami-banner";
import { WalkingSprite } from "../components/walking-sprite";
import { Nav } from "../components/sections/nav";
import { StatusBar } from "../components/sections/status-bar";
import { ArcadeFooter } from "../components/sections/footer";
import { BlogHeader } from "./sections/blog-header";
import { FeaturedPost } from "./sections/featured-post";
import { BlogToolbar } from "./sections/blog-toolbar";
import { BlogGrid } from "./sections/blog-grid";
import type { BlogPost, BlogStats } from "./types";

type Props = { posts: BlogPost[]; stats: BlogStats };

export function BlogShell({ posts, stats }: Props) {
  return (
    <ArcadeProvider>
      <BlogShellInner posts={posts} stats={stats} />
    </ArcadeProvider>
  );
}

function BlogShellInner({ posts, stats }: Props) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("ALL");

  const featured = posts[0];
  const rest = posts.slice(1);

  const filtered = useMemo(() => {
    let list = rest.slice();
    if (tag !== "ALL" && tag !== "TODO") {
      const tu = tag.toUpperCase();
      list = list.filter((p) => {
        const pt = p.tag.toUpperCase();
        if (pt === tu) return true;
        if ((tu === "TEORÍA" && pt === "THEORY") || (tu === "PROCESO" && pt === "PROCESS")) {
          return true;
        }
        return false;
      });
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q),
      );
    }
    return list;
  }, [rest, tag, query]);

  return (
    <>
      <CrtOverlay />
      <KonamiBanner />
      <StatusBar />
      <Nav />
      <BlogHeader stats={stats} />
      {featured && <FeaturedPost post={featured} />}
      <BlogToolbar
        query={query}
        setQuery={setQuery}
        tag={tag}
        setTag={setTag}
        count={filtered.length}
      />
      <BlogGrid posts={filtered} />
      <ArcadeFooter />
      <WalkingSprite />
    </>
  );
}
