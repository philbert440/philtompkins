import type { Metadata } from "next";
import ContentSection from "@/components/ContentSection";
import ProjectHero from "@/components/ProjectHero";
import MetricsCallout from "@/components/MetricsCallout";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Home Lab — Phil Tompkins",
  description: "Phil Tompkins' home lab: HP ProLiant servers, Proxmox, GPU compute, monitoring, and smart home.",
};

export default function HomelabPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProjectHero
        title="Home Lab"
        role="Builder & Operator"
        dateRange="2025 — present"
        techStack={["Proxmox", "HP ProLiant", "NVIDIA V100", "Grafana", "ClickHouse", "OpenTelemetry", "WireGuard", "Home Assistant", "Frigate", "Docker", "OpenWrt"]}
        metric="4 servers · 88 CPU cores · 800GB RAM · 64GB VRAM"
      />

      <MetricsCallout metrics={[
        "2x DL380 G7 (24 cores each, 144GB RAM)",
        "1x DL380 G9 (44 cores, 384GB RAM, 2x V100 32GB)",
        "1x Mini PC (Home Assistant + Frigate)",
        "Full observability stack",
      ]} />

      <AnimatedSection>
        <ContentSection title="Why a Home Lab?">
          <p>Cloud is great — until you&apos;re running AI workloads 24/7 and the bill becomes your biggest expense. I built a home lab to run Rivet (my AI assistant), experiment with local LLMs, host my own monitoring, and automate my home. The goal is self-sufficiency: own the hardware, own the data, control the costs.</p>
          <p>The entire stack was built for under $3,000 using enterprise-surplus HP ProLiant servers. That buys a lot of compute when you&apos;re patient with eBay.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="The Servers">
          <p><strong>pve1 &amp; pve2 (DL380 G7):</strong> These two identical servers form a Proxmox cluster. Each has dual Xeon processors, 144GB of RAM, and mirrored SSDs. They host all the Linux containers that run Rivet&apos;s AI instances, the PostgreSQL database, CI/CD runner, and monitoring stack. pve2 got upgraded to X5690 processors (12 cores, 3.47 GHz) — pve1 is next in line.</p>
          <p><strong>pve3 (DL380 G9):</strong> The GPU server. Dual E5-2699 v4 processors (44 cores total), 384GB of RAM, and two NVIDIA V100 32GB GPUs. This machine is for local LLM inference, embedding generation, and anything that needs serious compute. It was acquired for free after a cosmetic damage refund — the GPUs and upgrades cost around $2,800 total.</p>
          <p><strong>Mini PC:</strong> A small Intel box running Home Assistant and Frigate (NVR with AI object detection via a Google Coral TPU). Handles all the smart home logic and camera processing.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Networking">
          <p>An OpenWrt router (Linksys WRT3200ACM) handles routing, DNS, and firewall. WireGuard VPN connects the home network to the production server and mobile devices. Everything is on a flat 10.4.20.0/24 subnet with static IPs for servers and DHCP for clients. Internal DNS gives human-readable names like rivet.home, grafana.home, and cam-driveway.home.</p>
          <p>The production server (philtompkins.com) connects back over WireGuard so monitoring can scrape its metrics. DDNS keeps the VPN endpoint reachable as the home IP changes.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Monitoring & Observability">
          <p>A dedicated container runs the full observability stack: Grafana for dashboards, ClickHouse for metrics storage, and an OpenTelemetry Collector that scrapes every host. Node exporters on all machines feed CPU, memory, disk, and network data. iLO health exporters pull hardware sensor data from the G7 servers — fan speeds, temperatures, power draw.</p>
          <p>Logs ship to Loki for centralized searching. Alerts fire to Discord when things go wrong. The whole stack runs on about 4GB of RAM.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="Smart Home">
          <p>Home Assistant orchestrates everything: Tesla vehicle charging (via Fleet API with a self-hosted auth proxy), ecobee thermostat, Frigate-powered cameras with person and vehicle detection, an Eufy smart lock, and a Bambu Lab 3D printer. Seven automations handle things like smart charging schedules, welcome-home routines, and battery monitoring.</p>
          <p>Frigate runs on the mini PC with a Google Coral USB TPU for real-time object detection. Two cameras (driveway and front door) stream 24/7 with motion-triggered recording and Discord notifications when a person or car is detected.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="GPU Compute">
          <p>The two V100 32GB GPUs in the G9 server are destined for local LLM inference — running models like Qwen 2.5 for code generation, Nomic Embed for vector embeddings, and BGE for reranking. The V100s are FP16/FP32 only (no INT8/INT4 tensor core tricks), but 64GB of combined VRAM can fit a 70B parameter model comfortably.</p>
          <p>The GPUs are seated and detected by the driver, awaiting a 240V PDU for full power validation. The plan is to offload embedding generation from cloud APIs to local inference, cutting ongoing costs.</p>
        </ContentSection>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <ContentSection title="What&apos;s Next">
          <p>CPU upgrade for pve1 (X5690 processors arriving soon), 240V PDU installation for GPU power, local LLM hosting, and eventually a Tesla Solar Roof to offset the power draw. The long-term dream: a DL380 G11a with H200 GPUs, but that&apos;s a few product launches away.</p>
        </ContentSection>
      </AnimatedSection>
    </div>
  );
}
