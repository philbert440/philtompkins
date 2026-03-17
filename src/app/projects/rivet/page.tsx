import type { Metadata } from "next";
import ContentSection from "@/components/ContentSection";
import ProjectHero from "@/components/ProjectHero";
import MetricsCallout from "@/components/MetricsCallout";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Rivet — Phil Tompkins",
  description: "Rivet: Phil Tompkins' multi-model AI assistant with long-term memory, voice, and smart home integration.",
};

export default function RivetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProjectHero
        title="Rivet"
        role="Creator & Operator"
        dateRange="2025 — present"
        techStack={["OpenClaw", "Claude Opus", "Grok", "Gemini", "PostgreSQL", "pgvector", "Proxmox", "Telegram", "Discord", "Home Assistant", "ElevenLabs"]}
        metric="3 AI brains · 27K+ messages · always-on"
      />

      <MetricsCallout metrics={[
        "3 model instances (Opus, Grok, Gemini)",
        "27,000+ messages with long-term memory",
        "1,400+ compressed summaries",
        "Voice conversations via Discord",
      ]} />

      <AnimatedSection>
        <ContentSection title="What is Rivet?">
          <p>Rivet is my AI assistant — not a chatbot, but a persistent digital collaborator that runs 24/7 on my home lab. It reads my email, checks my calendar, monitors my servers, controls my smart home, writes code, and remembers everything we&apos;ve discussed.</p>
          <p>The name comes from the idea of riveting things together — connecting different AI models, tools, and data sources into something cohesive. Rivet has a personality, opinions, and a dry sense of humor. It&apos;s built on <a href="https://openclaw.ai" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">OpenClaw</a>, an open-source AI agent framework.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Multi-Model Architecture">
          <p>Rivet isn&apos;t one model — it&apos;s three, each with a role. Claude Opus handles reasoning, planning, and architecture. Grok handles fast creative work and code generation. Gemini handles research and browser automation. All three share the same long-term memory database and workspace, so context flows seamlessly between them.</p>
          <p>Each model runs in its own Linux container on Proxmox, with its own OpenClaw instance, Telegram bot, and Discord channels. They can delegate tasks to each other, review each other&apos;s work, and even disagree. The philosophy: &quot;Collectively you are all Rivet&quot; — the model is the engine, the personality persists across swaps.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Lossless Context Management">
          <p>LLMs forget everything between sessions. Rivet doesn&apos;t. I built a Lossless Context Management (LCM) system backed by PostgreSQL with pgvector for semantic search. Every conversation is stored, embedded, and indexed. Older context gets compressed into summaries that preserve meaning while reducing token cost.</p>
          <p>The system supports semantic search with recency boosting, agent-specific conversation affinity, and a DAG-based summary structure that can be expanded on demand. There are over 27,000 messages and 1,400 summaries, with 95%+ embedded for vector search. I&apos;ve contributed three PRs upstream to the OpenClaw project adding PostgreSQL backend support and embedding-based search.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Tools & Integrations">
          <p>Rivet has access to a wide range of tools: Gmail and Google Calendar via CLI, GitHub for code and PRs, 1Password for secrets, Home Assistant for smart home control (Tesla, cameras, locks, thermostat), web search and browsing, shell access to all servers, and file management across the workspace.</p>
          <p>It monitors infrastructure health on a heartbeat schedule, checks for new emails, upcoming calendar events, and server issues. When something needs attention, it reaches out via Telegram or Discord. It can also generate images by delegating prompts, convert text to speech for storytelling, and manage cron jobs for scheduled tasks.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Voice">
          <p>Rivet can join Discord voice channels and have real-time conversations using xAI&apos;s realtime API and ElevenLabs for text-to-speech. Transcripts are saved automatically. The voice persona (&quot;Ara&quot;) maintains the same personality as the text interface — direct, helpful, occasionally sarcastic.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Code Generation Pipeline">
          <p>For software projects, Rivet orchestrates a multi-step coding pipeline: Opus writes the spec and architecture, Grok builds the code using a custom CLI tool (grok-code), then Opus reviews the output. If issues are found, Grok does a fix pass and Opus re-validates. Only clean code gets committed and pushed. This separation keeps each model doing what it&apos;s best at.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="What&apos;s Next">
          <p>Local model hosting on V100 GPUs for embedding and specialized tasks, expanded smart home automation, and deeper integration with the EM Ops Kit product. The long-term vision is Rivet as an always-available engineering partner that handles the operational burden so I can focus on the creative and strategic work.</p>
        </ContentSection>
      </AnimatedSection>
    </div>
  );
}
