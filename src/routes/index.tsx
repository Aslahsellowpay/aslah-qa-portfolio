import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, BackToTop } from "@/components/portfolio/shell";
import {
  AnimatedBackdrop,
  MouseGlow,
  ScrollProgress,
} from "@/components/portfolio/effects";
import {
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Certifications,
  Achievements,
  Tools,
  Testimonials,
  Blog,
  GitHubSection,
  Services,
  FAQ,
  Contact,
} from "@/components/portfolio/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aslah Khan KT",
          jobTitle: "Software QA Engineer",
          email: "mailto:aslahkhanofficial@gmail.com",
          telephone: "+971505820667",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          knowsAbout: [
            "Manual Testing",
            "Automation Testing",
            "API Testing",
            "Selenium",
            "Java",
            "SQL",
            "FinTech Testing",
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackdrop />
      <MouseGlow />
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Achievements />
      <Tools />
      <Services />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
