import type { Metadata } from "next";
import ContentSection from "@/components/ContentSection";
import ProjectHero from "@/components/ProjectHero";
import MetricsCallout from "@/components/MetricsCallout";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Shipcode / Branding Brand — Phil Tompkins",
  description: "Phil Tompkins' work at Branding Brand building Shipcode from the ground up.",
};

export default function ShipcodePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProjectHero
        title="Shipcode / Branding Brand"
        role="Senior Engineering Manager → Director of Engineering"
        dateRange="2021 — 2025"
        techStack={["Next.js", "Angular", "NestJS", "AWS", "GCP", "Azure", "Kafka", "Postgres", "CosmoDB", "WebRTC", "Knative", "Karpenter", "OpenTelemetry", "Prometheus", "GitHub Actions", "Nx", "Pulumi"]}
        metric="99.9% uptime · ~40x faster release cadence"
      />

      <MetricsCallout metrics={[
        "99.9% uptime",
        "~40x faster release cadence",
        "9 engineers",
        "Global real-time collab (AU/NZ/SG/US)",
      ]} />

      <p className="text-muted mb-12 text-sm italic">
        Unfortunately, I am under an NDA so I can&apos;t discuss everything in detail but I will try to give a general overview of the work I did there and the impact it had on the company.
      </p>
      <p className="text-muted mb-12 leading-relaxed">
        At Branding Brand I led the team that built <a href="https://shipcode.com" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Shipcode</a> from the ground up.
      </p>

      <AnimatedSection>
        <ContentSection title="The Integrations Team and Flagship">
          <p>When I started at Branding Brand in 2021, I joined the R&amp;D department as the Senior Engineering Manager leading the integrations team. The team was comprised of 4-6 engineers.</p>
          <p>I was initially appointed as a Senior Engineering Manager at Branding Brand, tasked with leading a team responsible for developing integrations with external services for Flagship, the company&apos;s primary product at the time. Within my first six months, I observed significant challenges, including the dissolution of the R&amp;D team and the departure of the product manager and several key engineers. Upon closer examination, it became evident that the product, as originally presented, relied heavily on non-functional demoware and lacked a robust architectural foundation. Recognizing the need for a strategic overhaul, I spearheaded an initiative to rebuild the product from first principles, prioritizing maintainability and flexibility.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="The Product Team and Shipcode">
          <p>At Branding Brand I Led a team of 9 engineers to design and build a real-time, collaborative app builder, integrating with any backend, achieving 99.9% uptime and real-time alerting and performance monitoring. Implemented CI/CD pipelines and developer tooling, enabling local builds and on-demand QA cloud environments for each pull request, and staging and production. Spearheaded the company&apos;s shift from an agency to a product-focused model, aligning technology with strategic goals and driving adoption by multiple global enterprise clients.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="From 0 to 1">
          <p>I assembled a core team of three of the company&apos;s top engineers, and together, we embarked on a comprehensive rewrite of the codebase. This effort focused on delivering a scalable, reliable product that aligned with the vision articulated by the CEO and CTO, transforming conceptual goals into a tangible, high-quality solution.</p>
          <p>There is a lot to add here, Domain Driven Design, CQRS Architecture, Event Drive Microservices, Angular, Nest, Next, Azure, AWS, GCP, CosmoDB, Postgres, Nest, Next, WebRTC, we were moving quickly and able to rip out anything that didn&apos;t serve us and put in its place somethings that did.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Scaling Globally">
          <p>The first customer onboarded to Shipcode was a fitness fashion brand from Australia that had stores in Australia New Zealand Singapore and the US. We needed to still be able to handle low latency real time collaboration between opposite sides of the world.</p>
          <p>We architected the system with regional edge deployments and intelligent request routing. WebRTC connections for real-time collaboration were optimized with TURN server placement across regions. Data consistency across geographies was handled through our event-driven architecture — Kafka topics with carefully designed partition strategies ensured ordering guarantees while maintaining throughput. The result was sub-200ms collaboration latency even between Sydney and New York.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Real Time Collaboration">
          <p>I led the Shipcode engineering team, collaborating with the Design and Sales teams to define requirements for a microservice managing user cursor position, user selection, and simultaneous multi-user change merging. I worked with engineers to prioritize delivery and deployment, ensuring efficient implementation.</p>
          <p>The technical challenge was conflict resolution — multiple users editing the same component tree simultaneously. We implemented operational transformation inspired by collaborative text editors, adapted for a structured component model. Each change was decomposed into atomic operations that could be composed, transformed, and replayed. The cursor and selection system was built as a separate lightweight WebSocket service to avoid loading the main collaboration channel with high-frequency positional updates.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Documentation & AI">
          <p>My team at Shipcode also leveraged comprehensive documentation to train an AI assistant within Shipcode, enabling it to manipulate data effectively for user interactions. The training process utilized pre-existing, well-structured documentation to empower the AI to modify specific data properties dynamically and extract specific components as needed, delivering tailored responses and functional changes. This approach yielded impressive results, enhancing user experience and enabling them to just talk to an AI assistant in natural language to make changes to their site or app.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Monitoring, Stability, & Security">
          <p>I implemented real-time threat detection using Falco to monitor runtime security for containers and hosts in our AWS EKS cluster. Following external penetration testing, I refined Falco rules to reduce false positives and align with our threat model. I performed system hardening, including least privilege principles, network policies, and pod security standards, and documented these steps, mapping them to SOC2 controls (e.g., CC6.1, CC6.6) and PCI DSS requirements (e.g., Requirement 6).</p>
          <p>I conducted load testing and configured autoscaling for Knative microservices, enabling scale-to-zero to optimize costs and implementing autoscaling with panic scaling to handle load spikes. Karpenter was used for efficient EKS node scaling. I set up logging, tracing, and monitoring for services and Kafka topics using OpenTelemetry, Prometheus, and SigNoz to provide logs and alerting. Additionally, I migrated microservices from a shared RDS instance to individual Aurora PostgreSQL instances for improved isolation and performance.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Development, Testing, Deployment, and CI/CD">
          <p>I enjoyed implementing GitHub Actions workflows for pull requests (PRs), enabling developers to add a label to deploy the full stack to a shared development EKS cluster. The workflow built only the components affected by changes in the monorepo, using the latest from the main branch for the rest. This allowed each PR to be tested independently before approval and merging. Another workflow then tested the merged changes against production configuration and sanitized production data. I also automated the release process, enabling the team to perform multiple weekly production releases. This improved release cadence and reduced the time from feature request or bug identification to solution delivery by approximately 40 times.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Developer Tooling Overhaul">
          <p>We invested heavily in developer experience. Nx was introduced for monorepo management — dependency graph analysis, affected-only builds, and computation caching dramatically reduced CI times. Pulumi replaced our ad-hoc infrastructure scripts with real TypeScript infrastructure-as-code, letting engineers provision and tear down environments programmatically. Local development went from &quot;good luck&quot; to a single command that spun up the full stack with hot reload. The compound effect of these changes was that engineers spent more time building features and less time fighting tooling.</p>
        </ContentSection>
      </AnimatedSection>
    </div>
  );
}
