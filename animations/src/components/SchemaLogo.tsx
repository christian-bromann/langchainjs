import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface SchemaLogoProps {
  name: "zod" | "valibot" | "arktype";
  isActive: boolean;
  enterFrame: number;
  style?: React.CSSProperties;
}

const logos: Record<string, { color: string; letter: string }> = {
  zod: { color: "#3068B7", letter: "Z" },
  valibot: { color: "#FFD700", letter: "V" },
  arktype: { color: "#FF6B6B", letter: "A" },
};

export const SchemaLogo: React.FC<SchemaLogoProps> = ({
  name,
  isActive,
  enterFrame,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logo = logos[name];

  const scale = spring({
    frame: frame - enterFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
    },
  });

  const activeScale = isActive ? 1.2 : 0.8;
  const activeOpacity = isActive ? 1 : 0.4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        transform: `scale(${scale * activeScale})`,
        opacity: activeOpacity,
        transition: "opacity 0.3s ease",
        ...style,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          backgroundColor: logo.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          fontWeight: "bold",
          color: name === "valibot" ? "#000" : "#fff",
          boxShadow: isActive
            ? `0 0 30px ${logo.color}80`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {logo.letter}
      </div>
      <span
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      >
        {name}
      </span>
    </div>
  );
};
