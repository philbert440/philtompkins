import type { Metadata } from "next";
import ContentSection from "@/components/ContentSection";
import ProjectHero from "@/components/ProjectHero";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Philbot & Portfolio Site — Phil Tompkins",
  description: "Phil Tompkins' portfolio site with an AI chat assistant powered by RAG and Grok.",
};

export default function PhilbotPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProjectHero
        title="Philbot & This Portfolio Site"
        role="Creator"
        dateRange="2025 — present"
        techStack={["Next.js 16", "React 19", "Tailwind CSS 4", "Framer Motion", "xAI Grok", "OpenAI Embeddings", "MDX"]}
        metric="AI chat assistant · RAG-powered · conversational contact form"
      />

      <AnimatedSection>
        <ContentSection title="The Site">
          <p>This portfolio site is built with Next.js 16, React 19, and Tailwind CSS 4. It uses the App Router with server components for fast initial loads and Framer Motion for smooth animations. The dark theme with emerald accents and Fira Code monospace font gives it a developer-native feel.</p>
          <p>Pages cover projects, a blog, an about section, and a contact page. The whole thing runs on a production VPS behind Caddy with automatic HTTPS.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Ask Philbot">
          <p>The floating chat widget in the bottom-right corner is Philbot — an AI assistant that can answer questions about my background, experience, and projects. It uses Retrieval-Augmented Generation (RAG) to pull relevant context before responding.</p>
          <p>Under the hood: the site content is chunked and embedded using OpenAI&apos;s embedding model, stored as a JSON file. When someone asks a question, their query is embedded and compared against the stored chunks using cosine similarity. The top 5 most relevant chunks are injected into the system prompt, and xAI&apos;s Grok 4.1 Fast model generates a streaming response grounded in real content.</p>
          <p>Rate limits keep things sane: 10 chat messages per minute per IP, with a 500-character input cap.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Conversational Contact Form">
          <p>Philbot can also collect contact information conversationally. If someone wants to get in touch, the AI naturally asks for their name, preferred contact method (email, phone, text, Twitter, Discord, LinkedIn — whatever works), and what they want to discuss. Once confirmed, it submits the information server-side.</p>
          <p>There&apos;s also a traditional form accessible via the envelope icon in the chat header, with the same flexible contact method support. Both paths write to the same data store, and my AI assistant (Rivet) monitors for new submissions and notifies me.</p>
          <p>The function calling integration uses xAI&apos;s tool calling API — the model decides when to invoke the contact submission tool based on conversation context, with server-side validation and a separate rate limit (3 submissions per hour per IP).</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Technical Details">
          <p>The RAG pipeline embeds 22 content chunks covering career history, projects, skills, and personal context. Cosine similarity search runs entirely server-side — no vector database needed for this scale, just a JSON file and some math. The streaming response uses the Web Streams API to pipe tokens to the client in real-time.</p>
          <p>Security: all inputs are sanitized and length-limited, email validation runs server-side when email is the contact method, and unknown tool calls are explicitly rejected. The contact form endpoint persists submissions to a JSON file on disk, which is polled by Rivet on a heartbeat schedule.</p>
        </ContentSection>
      </AnimatedSection>
    </div>
  );
}
