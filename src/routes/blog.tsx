import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, BackToTop } from "@/components/portfolio/shell";
import {
  AnimatedBackdrop,
  MouseGlow,
  ScrollProgress,
} from "@/components/portfolio/effects";
import { Blog } from "@/components/portfolio/sections";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog · Aslah Khan KT — Notes from the QA trenches" },
      {
        name: "description",
        content:
          "Essays on regression testing, API best practices, Selenium tips, Jira workflows and SQL for testers by QA engineer Aslah Khan KT.",
      },
      { property: "og:title", content: "Blog · Aslah Khan KT" },
      { property: "og:description", content: "Notes from the QA trenches." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackdrop />
      <MouseGlow />
      <ScrollProgress />
      <Nav />
      <div className="pt-28">
        <Blog />
      </div>
      <Footer />
      <BackToTop />
    </main>
  );
}