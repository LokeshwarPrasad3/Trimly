import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.35), transparent 30%), linear-gradient(135deg, #eff6ff 0%, #f8fafc 52%, #ffffff 100%)",
        color: "#0f172a",
        fontFamily: "sans-serif",
        padding: "56px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderRadius: "36px",
          border: "1px solid rgba(148, 163, 184, 0.22)",
          background: "rgba(255, 255, 255, 0.88)",
          boxShadow: "0 30px 80px -45px rgba(15, 23, 42, 0.35)",
          padding: "52px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "74px",
                width: "74px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #38bdf8 0%, #6366f1 55%, #a855f7 100%)",
                color: "#ffffff",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
                fontWeight: 700,
              }}
            >
              T
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 600, color: "#0369a1" }}>
                Trimly
              </div>
              <div style={{ fontSize: 18, color: "#475569" }}>
                Modern URL shortener
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                fontSize: "62px",
                fontWeight: 800,
                lineHeight: 1.04,
                letterSpacing: "-0.04em",
              }}
            >
              Shorten links, share faster, track what performs.
            </div>
            <div
              style={{
                fontSize: "28px",
                lineHeight: 1.35,
                color: "#475569",
              }}
            >
              Create clean short URLs, manage them from one workspace, and keep
              guest and logged-in flows simple.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "18px",
            }}
          >
            {[
              "Guest links",
              "Analytics dashboard",
              "Clean branded sharing",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  background: "#e0f2fe",
                  color: "#0c4a6e",
                  fontSize: "20px",
                  fontWeight: 600,
                  padding: "14px 22px",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    size
  );
}
