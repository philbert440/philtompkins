import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "EM Ops Kit — SaaS for engineering managers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, color: "#e5e7eb", letterSpacing: "-0.02em" }}>
            EM Ops Kit
          </div>
          <div style={{ fontSize: 32, color: "#10b981" }}>
            The engineering manager&apos;s command center
          </div>
          <div style={{ width: 120, height: 4, background: "#10b981", borderRadius: 2, marginTop: 16 }} />
        </div>
        <div style={{ position: "absolute", bottom: 32, right: 40, fontSize: 20, color: "#6b7280" }}>
          philtompkins.com
        </div>
      </div>
    ),
    { ...size }
  );
}
