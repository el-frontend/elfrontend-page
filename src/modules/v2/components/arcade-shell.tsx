"use client";

import { ArcadeProvider } from "../context/arcade-context";
import { AboutSection } from "./sections/about";
import { BlogSection, type ArcadeBlogPost } from "./sections/blog";
import { ContactSection } from "./sections/contact";
import { ArcadeFooter } from "./sections/footer";
import { HeroSection } from "./sections/hero";
import { Nav } from "./sections/nav";
import { ProjectsSection } from "./sections/projects";
import { SkillsSection } from "./sections/skills";
import { StatsStrip } from "./sections/stats-strip";
import { StatusBar } from "./sections/status-bar";
import { TalksSection } from "./sections/talks";
import { TerminalSection } from "./sections/terminal";
import { VideosSection, type ArcadeVideo } from "./sections/videos";
import { CrtOverlay } from "./crt-overlay";
import { KonamiBanner } from "./konami-banner";
import { WalkingSprite } from "./walking-sprite";

type Props = {
  videos: ArcadeVideo[];
  posts: ArcadeBlogPost[];
};

export function ArcadeShell({ videos, posts }: Props) {
  return (
    <ArcadeProvider>
      <CrtOverlay />
      <KonamiBanner />
      <StatusBar />
      <Nav />
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TalksSection />
      <VideosSection videos={videos} />
      <BlogSection posts={posts} />
      <TerminalSection />
      <ContactSection />
      <ArcadeFooter />
      <WalkingSprite />
    </ArcadeProvider>
  );
}
