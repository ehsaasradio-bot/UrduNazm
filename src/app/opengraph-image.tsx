import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "UrduNazm — Explore the finest Urdu poetry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1e 50%, #0a1628 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Aurora blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,212,191,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #c8a96e, transparent)",
          }}
        />

        {/* Urdu calligraphy watermark */}
        <div
          style={{
            position: "absolute",
            fontSize: "160px",
            color: "rgba(200,169,110,0.05)",
            fontFamily: "serif",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          اردو نظم
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          {/* Logo / site name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
              fontFamily: "sans-serif",
            }}
          >
            UrduNazm
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #c8a96e, transparent)",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "sans-serif",
              letterSpacing: "0.5px",
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Explore the finest Urdu poetry — ghazals, nazms, and more
          </div>

          {/* Urdu subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "rgba(200,169,110,0.8)",
              fontFamily: "serif",
              marginTop: "8px",
            }}
          >
            غزل • نظم • رباعی
          </div>
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #c8a96e, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
