import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { SchemaLogo } from "../components/SchemaLogo";
import { CodeBlock } from "../components/CodeBlock";

const codeTemplates = {
  zod: `import { z } from "zod";

const State = new StateSchema({
  messages: MessagesValue,
  count: z.number().default(0),
});`,
  valibot: `import * as v from "valibot";

const State = new StateSchema({
  messages: MessagesValue,
  count: v.number(),
});`,
  arktype: `import { type } from "arktype";

const State = new StateSchema({
  messages: MessagesValue,
  count: type("number"),
});`,
};

export const SchemaSwapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cycle through schemas
  const cycleDuration = 60; // frames per schema
  const schemas: Array<"zod" | "valibot" | "arktype"> = [
    "zod",
    "valibot",
    "arktype",
  ];
  const currentIndex = Math.floor(frame / cycleDuration) % schemas.length;
  const activeSchema = schemas[currentIndex];

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Code block fade
  const cycleFrame = frame % cycleDuration;
  const codeOpacity = interpolate(
    cycleFrame,
    [0, 15, cycleDuration - 15, cycleDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
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
          One API. Any Schema Library.
        </h2>
        <p style={{ fontSize: 24, color: "#666", margin: 0 }}>
          Standard Schema compliant
        </p>
      </div>

      {/* Schema logos */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          marginBottom: 50,
        }}
      >
        {schemas.map((schema, i) => (
          <SchemaLogo
            key={schema}
            name={schema}
            isActive={schema === activeSchema}
            enterFrame={10 + i * 8}
          />
        ))}
      </div>

      {/* Code block */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          opacity: codeOpacity,
        }}
      >
        <CodeBlock
          code={codeTemplates[activeSchema]}
          animateIn={false}
          style={{ width: "70%" }}
        />
      </div>

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [40, 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p style={{ fontSize: 22, color: "#888", margin: 0 }}>
          Switch libraries anytime.{" "}
          <span style={{ color: "#22c55e" }}>Your code stays the same.</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
