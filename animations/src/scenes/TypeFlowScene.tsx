import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { CodeBlock } from "../components/CodeBlock";

const stateSchemaCode = `const State = new StateSchema({
  messages: MessagesValue,
  count: z.number().default(0),
});`;

const graphNodeCode = `const myNode: GraphNode<typeof State> = 
  (state) => {
    // state.count is number ✓
    // state.messages is Message[] ✓
    return { count: state.count + 1 };
  };`;

export const TypeFlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow animation
  const arrowProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const showArrow = frame > 50;
  const showGraphNode = frame > 70;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#fff",
            margin: 0,
            marginBottom: 12,
          }}
        >
          Types Flow Everywhere
        </h2>
        <p style={{ fontSize: 24, color: "#666", margin: 0 }}>
          Define once, infer everywhere
        </p>
      </div>

      {/* Code blocks with arrow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          width: "100%",
        }}
      >
        {/* StateSchema definition */}
        <div style={{ width: "70%" }}>
          <div
            style={{
              color: "#888",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: 500,
            }}
          >
            1. Define your state
          </div>
          <CodeBlock code={stateSchemaCode} startFrame={20} />
        </div>

        {/* Arrow */}
        {showArrow && (
          <div
            style={{
              fontSize: 40,
              color: "#22c55e",
              opacity: arrowProgress,
              transform: `scale(${arrowProgress})`,
            }}
          >
            ↓
          </div>
        )}

        {/* GraphNode usage */}
        {showGraphNode && (
          <div style={{ width: "70%" }}>
            <div
              style={{
                color: "#888",
                fontSize: 16,
                marginBottom: 10,
                fontWeight: 500,
                opacity: interpolate(frame, [75, 90], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              2. Use anywhere with full types
            </div>
            <CodeBlock code={graphNodeCode} startFrame={80} />
          </div>
        )}
      </div>

      {/* Type inference callout */}
      {frame > 120 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: "#22c55e20",
            border: "1px solid #22c55e40",
            padding: "16px 32px",
            borderRadius: 12,
            opacity: interpolate(frame, [120, 140], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span style={{ fontSize: 28 }}>🎯</span>
          <span style={{ color: "#22c55e", fontSize: 20, fontWeight: 500 }}>
            No manual type annotations needed
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
