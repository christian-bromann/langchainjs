import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { CodeBlock } from "../components/CodeBlock";
import { Title } from "../components/Title";

const beforeCode = `const State = Annotation.Root({
  count: Annotation<number>({
    reducer: (a, b) => a + b,
    default: () => 0,
  }),
  messages: Annotation<Message[]>({
    reducer: messagesReducer,
  }),
});`;

const afterCode = `const State = new StateSchema({
  count: z.number().default(0),
  messages: MessagesValue,
});

// Full type inference everywhere`;

export const BeforeAfterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing
  const beforeEnds = 80;
  const afterStarts = 90;

  const beforeOpacity = interpolate(
    frame,
    [beforeEnds - 20, beforeEnds],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const beforeX = interpolate(frame, [beforeEnds - 20, beforeEnds], [0, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const afterOpacity = interpolate(
    frame,
    [afterStarts, afterStarts + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const afterX = interpolate(frame, [afterStarts, afterStarts + 20], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showBefore = frame < beforeEnds + 10;
  const showAfter = frame >= afterStarts - 10;

  // Labels
  const labelOpacity = (start: number) =>
    interpolate(frame, [start, start + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Before Code */}
      {showBefore && (
        <div
          style={{
            position: "absolute",
            opacity: beforeOpacity,
            transform: `translateX(${beforeX}px)`,
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              opacity: labelOpacity(10),
            }}
          >
            <div
              style={{
                backgroundColor: "#ef4444",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              BEFORE
            </div>
            <span style={{ color: "#666", fontSize: 20 }}>
              Annotation.Root API
            </span>
          </div>
          <CodeBlock code={beforeCode} startFrame={15} />
        </div>
      )}

      {/* After Code */}
      {showAfter && (
        <div
          style={{
            position: "absolute",
            opacity: afterOpacity,
            transform: `translateX(${afterX}px)`,
            width: "80%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              opacity: labelOpacity(afterStarts + 5),
            }}
          >
            <div
              style={{
                backgroundColor: "#22c55e",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: 20,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              AFTER
            </div>
            <span style={{ color: "#666", fontSize: 20 }}>
              StateSchema + Zod
            </span>
          </div>
          <CodeBlock code={afterCode} startFrame={afterStarts + 10} />
        </div>
      )}

      {/* Checkmark animation */}
      {frame > afterStarts + 50 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            display: "flex",
            gap: 40,
            opacity: interpolate(
              frame,
              [afterStarts + 50, afterStarts + 65],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          {["Less code", "Full types", "Use Zod"].map((text, i) => (
            <div
              key={text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#22c55e",
                fontSize: 22,
                fontWeight: 500,
                opacity: interpolate(
                  frame,
                  [afterStarts + 55 + i * 10, afterStarts + 65 + i * 10],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              <span style={{ fontSize: 24 }}>✓</span>
              {text}
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
