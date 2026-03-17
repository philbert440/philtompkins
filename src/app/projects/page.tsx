import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects — Phil Tompkins",
  description: "A comprehensive list of projects and companies Phil Tompkins has worked on.",
};

const sections = [
  {
    heading: "Current",
    projects: [
      {
        title: "Tenable",
        description: "Web App Security and PCI product engineering team lead.",
        href: "/projects",
        tags: ["Security", "PCI", "Leadership"],
        dateRange: "2024 — now",
      },
      {
        title: "EM Ops Kit",
        description:
          "SaaS platform for engineering managers — team health, 1:1s, sprints, incidents, DORA metrics, product maps, and AI-powered insights.",
        href: "/projects/emkit",
        tags: ["Next.js", "PostgreSQL", "Stripe", "AI"],
        dateRange: "2025 — now",
      },
      {
        title: "Rivet",
        description:
          "AI assistant system running on a home lab — multi-model orchestration, long-term memory, voice, and smart home integration.",
        href: "/projects/rivet",
        tags: ["OpenClaw", "LLM", "Proxmox", "PostgreSQL"],
        dateRange: "2025 — now",
      },
      {
        title: "Home Lab",
        description:
          "Self-hosted infrastructure on HP ProLiant servers — Proxmox, monitoring, GPU compute, and home automation.",
        href: "/projects/homelab",
        tags: ["Proxmox", "Grafana", "V100", "Home Assistant"],
        dateRange: "2025 — now",
      },
    ],
  },
  {
    heading: "Shipcode / Branding Brand",
    projects: [
      {
        title: "Shipcode",
        description:
          "Led a team of 9 engineers to design and build a real-time, collaborative app builder from the ground up.",
        href: "/projects/shipcode",
        tags: ["Next.js", "Angular", "AWS", "Real-time", "CI/CD"],
        dateRange: "2021 — 2024",
      },
    ],
  },
  {
    heading: "Adapify",
    projects: [
      {
        title: "Adapify Inc",
        description:
          "Co-founded startup building SaaS platforms across sports, soil testing, water/air quality, and community networks.",
        href: "/projects/adapify",
        tags: ["Startup", "SaaS", "AI", "Payments"],
        dateRange: "2016 — 2021",
      },
    ],
  },
  {
    heading: "Microsoft",
    projects: [
      {
        title: "Microsoft",
        description:
          "Enterprise cloud migrations, incident response, and large-scale deployments for Netflix, 3M, Nielsen, and more.",
        href: "/projects/microsoft",
        tags: ["Azure", "Office 365", "Cloud", "Enterprise"],
        dateRange: "2013 — 2016",
      },
    ],
  },
  {
    heading: "Other Projects",
    projects: [
      {
        title: "Pheon Technologies Group",
        description:
          "Built multi-touch devices using FTIR technology and contributed to the NUI open source community.",
        href: "/projects/pheon-tech",
        tags: ["Hardware", "Multi-touch", "Open Source"],
        dateRange: "2009 — 2011",
      },
      {
        title: "Philbot & This Portfolio Site",
        description:
          "Portfolio site with an AI chat assistant powered by RAG embeddings and Grok, plus a conversational contact form.",
        href: "/projects/philbot",
        tags: ["Next.js", "xAI Grok", "RAG", "OpenAI Embeddings"],
        dateRange: "2025 — now",
      },
      {
        title: "Early Career",
        description:
          "1901 Group, Genworth Financial, Phil-Tech, Phil's MTG Cards, and early jobs.",
        href: "/projects/early-career",
        tags: ["Startup", "Support", "Consulting"],
        dateRange: "2004 — 2013",
      },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-muted mb-12 max-w-2xl">
        A comprehensive list of all of the projects I&apos;ve worked on over the years going back in
        time as you scroll down.
      </p>

      {sections.map((s) => (
        <section key={s.heading} className="mb-12">
          <h2 className="text-xl font-bold text-emerald mb-6">{s.heading}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
