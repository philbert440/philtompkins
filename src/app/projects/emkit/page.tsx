import type { Metadata } from "next";
import ContentSection from "@/components/ContentSection";
import ProjectHero from "@/components/ProjectHero";
import MetricsCallout from "@/components/MetricsCallout";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "EM Ops Kit — Phil Tompkins",
  description: "EM Ops Kit: SaaS platform for engineering managers with AI-powered team health, sprints, incidents, and product maps.",
};

export default function EmkitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProjectHero
        title="EM Ops Kit"
        role="Creator & Solo Developer"
        dateRange="2025 — present"
        techStack={["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "NextAuth", "Stripe", "Tailwind CSS", "Recharts", "xAI Grok", "GitHub Actions", "Playwright"]}
        metric="10+ modules · AI-powered · launching soon"
      />

      <MetricsCallout metrics={[
        "10+ management modules",
        "50+ API endpoints",
        "35+ Playwright smoke tests",
        "AI features across 6 workflows",
      ]} />

      <AnimatedSection>
        <ContentSection title="The Problem">
          <p>Engineering managers juggle an absurd number of tools. Team rosters in a spreadsheet, 1:1 notes in a doc, sprint data in Jira, incident history in Slack threads, performance reviews in whatever HR picked this year. None of it talks to each other, and none of it is designed for the actual job of managing engineers.</p>
          <p>EM Ops Kit is a single platform purpose-built for engineering managers. Everything they need — team health, 1:1s, sprints, incidents, performance reviews, DORA metrics, product maps — in one place, with AI that actually understands the context.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="What&apos;s Built">
          <p>The full SaaS is built and running. Over 10 modules cover the core workflows: team roster with health scores and flight risk detection, structured 1:1s with AI-generated talking points, sprint tracking, incident management, performance reviews with AI-drafted narratives, action items, weekly reports (AI-generated from your week&apos;s data), CS escalation tracking, product health dashboards, DORA metrics, and interactive product maps with an SVG canvas.</p>
          <p>There&apos;s also a landing page, blog with SEO content, a demo mode, pricing with Stripe integration, waitlist, terms of service, and a global search (Cmd+K). Authentication supports email and Google OAuth.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="AI Features">
          <p>Six workflows have AI assistance powered by xAI&apos;s Grok model: talking point generation for 1:1s (based on recent sprint data and action items), weekly report drafts, action item extraction from meeting notes, team pulse analysis, performance review narratives, and flight risk detection.</p>
          <p>The next big feature is AI Image Import for product maps — take a screenshot of a whiteboard or architecture diagram, and Grok Vision converts it into a structured, interactive map with nodes and connections that link to your incidents, sprints, and DORA data. That cross-linking is the moat.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Architecture">
          <p>Next.js 16 with the App Router, server components where possible, and Drizzle ORM for type-safe database access against PostgreSQL. Authentication via NextAuth with credential and Google OAuth providers. Stripe handles billing with webhook-based subscription management.</p>
          <p>The codebase follows Domain-Driven Design principles with clear boundaries between modules. CI/CD runs on a self-hosted GitHub Actions runner (a dedicated Proxmox container) with Playwright smoke tests covering 35+ routes. Deployments go through a pull-request pipeline: build, test, SSH deploy to production, PM2 restart.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Product Maps">
          <p>The standout feature is Product Maps — interactive SVG canvases where engineering managers can map out their product architecture, service dependencies, team ownership, and system health. Each node can link to incidents, sprint data, and DORA metrics, giving a visual overview of where things stand.</p>
          <p>The roadmap includes real-time collaboration (leveraging CRDT experience from my Shipcode days), so multiple people can edit the same map simultaneously. Maps live inside EM Ops Kit rather than being a separate tool, which means the cross-linking to operational data is native.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Business Model">
          <p>No free tier. 14-day trial with a card upfront. Pro at $80/year covers a manager plus 5 team members and 1 product map. Max at $150/year unlocks unlimited team members, real-time collaboration, and all AI features. Enterprise pricing is coming later for per-seat licensing.</p>
          <p>First 1,000 users lock in their price forever — an OG pricing guarantee to reward early adopters. The target is $80k ARR at 1,000 users.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="What&apos;s Next">
          <p>Final QA pass, then launch. Post-launch priorities: sidebar navigation redesign, AI Image Import for product maps, real-time collaboration, and team member accounts with their own logins (manager pays, sensitive data behind permission walls). The AI assistant (Rivet) handles most of the development work using a multi-model pipeline — architecture in Opus, code generation in Grok, validation back in Opus.</p>
        </ContentSection>
      </AnimatedSection>
    </div>
  );
}
