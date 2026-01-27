import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { CodeBlock } from "./components/CodeBlock";

/**
 * Short Twitter-optimized animation (15-20 seconds)
 * Perfect for autoplay in feed
 */

const beforeCode = `// Before: Custom API
const State = Annotation.Root({
  count: Annotation<number>({
    reducer: (a, b) => a + b,
    default: () => 0,
  }),
});`;

const afterCode = `// After: Use Zod directly
const State = new StateSchema({
  count: z.number().default(0),
});`;

const IntroShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 150 } });
  const opacity = interpolate(frame, [0, 15], [0, 1], {
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
      <div style={{ fontSize: 60, marginBottom: 20, transform: `scale(${scale})` }}>
        🦜🕸️
      </div>
      <h1
        style={{
          fontSize: 64,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
          opacity,
        }}
      >
        StateSchema
      </h1>
      <p
        style={{
          fontSize: 28,
          color: "#22c55e",
          marginTop: 16,
          opacity: interpolate(frame, [20, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        LangGraph.js v1.1
      </p>
    </AbsoluteFill>
  );
};

const BeforeAfterShort: React.FC = () => {
  const frame = useCurrentFrame();

  const beforeOpacity = interpolate(frame, [0, 15, 70, 85], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const afterOpacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showAfter = frame >= 75;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
        padding: 60,
      }}
    >
      {/* Before */}
      {!showAfter && (
        <div style={{ width: "85%", opacity: beforeOpacity }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              BEFORE
            </div>
          </div>
          <CodeBlock code={beforeCode} animateIn={false} />
        </div>
      )}

      {/* After */}
      {showAfter && (
        <div style={{ width: "85%", opacity: afterOpacity }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                backgroundColor: "#22c55e",
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 16,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              AFTER
            </div>
          </div>
          <CodeBlock code={afterCode} animateIn={false} />
        </div>
      )}
    </AbsoluteFill>
  );
};

const SchemaLogos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const schemas = [
    { name: "Zod", color: "#3068B7", letter: "Z" },
    { name: "Valibot", color: "#FFD700", letter: "V" },
    { name: "ArkType", color: "#FF6B6B", letter: "A" },
  ];

  const activeIndex = Math.floor(frame / 25) % 3;

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
      <h2
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 40,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Use any schema library
      </h2>

      <div style={{ display: "flex", gap: 50 }}>
        {schemas.map((schema, i) => {
          const isActive = i === activeIndex;
          const scale = spring({
            frame: frame - i * 5,
            fps,
            config: { damping: 12, stiffness: 200 },
          });

          return (
            <div
              key={schema.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
                transform: `scale(${scale * (isActive ? 1.2 : 0.85)})`,
                opacity: isActive ? 1 : 0.4,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  backgroundColor: schema.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                  fontWeight: "bold",
                  color: schema.name === "Valibot" ? "#000" : "#fff",
                  boxShadow: isActive
                    ? `0 0 40px ${schema.color}80`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {schema.letter}
              </div>
              <span style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
                {schema.name}
              </span>
            </div>
          );
        })}
      </div>

      <p
        style={{
          fontSize: 24,
          color: "#22c55e",
          marginTop: 40,
          opacity: interpolate(frame, [30, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Standard Schema compliant
      </p>
    </AbsoluteFill>
  );
};

const OutroShort: React.FC = () => {
  const frame = useCurrentFrame();

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
      <h1
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: "#fff",
          marginBottom: 30,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Available Now
      </h1>

      <div
        style={{
          backgroundColor: "#1E1E1E",
          padding: "16px 32px",
          borderRadius: 12,
          opacity: interpolate(frame, [15, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <code
          style={{
            color: "#22c55e",
            fontSize: 22,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          npm i @langchain/langgraph@latest
        </code>
      </div>
    </AbsoluteFill>
  );
};

// Short composition: ~15 seconds at 30fps = 450 frames
export const TwitterShortAnimation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence from={0} durationInFrames={60}>
        <IntroShort />
      </Sequence>

      <Sequence from={60} durationInFrames={150}>
        <BeforeAfterShort />
      </Sequence>

      <Sequence from={210} durationInFrames={120}>
        <SchemaLogos />
      </Sequence>

      <Sequence from={330} durationInFrames={75}>
        <OutroShort />
      </Sequence>
    </AbsoluteFill>
  );
};

export const TWITTER_SHORT_DURATION = 405; // ~13.5 seconds
