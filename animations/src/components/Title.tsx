import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface TitleProps {
  text: string;
  subtitle?: string;
  enterFrame?: number;
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({
  text,
  subtitle,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(
    frame,
    [enterFrame, enterFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleY = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const subtitleOpacity = interpolate(
    frame,
    [enterFrame + 15, enterFrame + 35],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        ...style,
      }}
    >
      <h1
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: "#fff",
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
          textAlign: "center",
        }}
      >
        {text}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 28,
            color: "#888",
            margin: 0,
            opacity: subtitleOpacity,
            textAlign: "center",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
