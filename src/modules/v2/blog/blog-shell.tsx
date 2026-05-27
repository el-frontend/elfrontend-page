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
import { Newsletter } from "./sections/newsletter";
import type { BlogPost } from "./types";

export function BlogShell({ posts }: { posts: BlogPost[] }) {
  return (
    <ArcadeProvider>
      <BlogShellInner posts={posts} />
    </ArcadeProvider>
  );
}

function BlogShellInner({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("ALL");
  const [sort, setSort] = useState<"newest" | "popular">("newest");

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
    if (sort === "popular") {
      list = list.slice().sort((a, b) => b.likes - a.likes);
    }
    return list;
  }, [rest, tag, query, sort]);

  return (
    <>
      <CrtOverlay />
      <KonamiBanner />
      <StatusBar />
      <Nav />
      <BlogHeader />
      {featured && <FeaturedPost post={featured} />}
      <BlogToolbar
        query={query}
        setQuery={setQuery}
        tag={tag}
        setTag={setTag}
        sort={sort}
        setSort={setSort}
        count={filtered.length}
      />
      <BlogGrid posts={filtered} />
      <Newsletter />
      <ArcadeFooter />
      <WalkingSprite />
    </>
  );
}
