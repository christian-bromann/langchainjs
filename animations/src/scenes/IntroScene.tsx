import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const versionOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* LangGraph Logo/Icon */}
      <div
        style={{
          fontSize: 80,
          marginBottom: 30,
          transform: `scale(${logoScale})`,
        }}
      >
        🦜🕸️
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          marginBottom: 20,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 40}px)`,
          background: "linear-gradient(135deg, #fff 0%, #888 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        StateSchema
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 32,
          color: "#666",
          margin: 0,
          marginBottom: 30,
          opacity: subtitleOpacity,
        }}
      >
        A new way to define agent state
      </p>

      {/* Version badge */}
      <div
        style={{
          backgroundColor: "#22c55e20",
          border: "1px solid #22c55e40",
          color: "#22c55e",
          padding: "10px 24px",
          borderRadius: 30,
          fontSize: 20,
          fontWeight: 600,
          opacity: versionOpacity,
        }}
      >
        LangGraph.js v1.1
      </div>
    </AbsoluteFill>
  );
};
