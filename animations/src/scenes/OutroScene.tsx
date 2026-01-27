import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    "Standard Schema support",
    "ReducedValue & UntrackedValue",
    "GraphNode type utilities",
    "Mix any schema library",
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 80,
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          marginBottom: 50,
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        Upgrade Today
      </h1>

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 50,
        }}
      >
        {features.map((feature, i) => {
          const featureOpacity = interpolate(
            frame,
            [20 + i * 12, 35 + i * 12],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const featureX = interpolate(
            frame,
            [20 + i * 12, 35 + i * 12],
            [-30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: featureOpacity,
                transform: `translateX(${featureX}px)`,
              }}
            >
              <span style={{ color: "#22c55e", fontSize: 24 }}>✓</span>
              <span style={{ color: "#fff", fontSize: 24 }}>{feature}</span>
            </div>
          );
        })}
      </div>

      {/* Install command */}
      <div
        style={{
          backgroundColor: "#1E1E1E",
          padding: "20px 40px",
          borderRadius: 12,
          marginBottom: 40,
          opacity: interpolate(frame, [70, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <code
          style={{
            color: "#22c55e",
            fontSize: 24,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          npm i @langchain/langgraph@latest
        </code>
      </div>

      {/* URL */}
      <p
        style={{
          color: "#666",
          fontSize: 20,
          margin: 0,
          opacity: interpolate(frame, [85, 100], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        langchain-ai.github.io/langgraphjs
      </p>
    </AbsoluteFill>
  );
};
