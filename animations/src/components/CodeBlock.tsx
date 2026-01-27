import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface CodeBlockProps {
  code: string;
  startFrame?: number;
  animateIn?: boolean;
  animateOut?: boolean;
  outStartFrame?: number;
  style?: React.CSSProperties;
}

// Simple syntax highlighting for TypeScript
const highlightCode = (code: string): React.ReactNode[] => {
  const keywords = /\b(const|import|from|new|return|typeof|interface|type|async|await|function|export)\b/g;
  const strings = /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  const types = /\b(StateSchema|ReducedValue|GraphNode|Annotation|MessagesValue|z)\b/g;
  const properties = /(\w+)(?=\s*:)/g;

  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    let highlighted = line
      .replace(comments, '<span style="color: #6A9955;">$1</span>')
      .replace(strings, '<span style="color: #CE9178;">$1$2$1</span>')
      .replace(keywords, '<span style="color: #569CD6;">$1</span>')
      .replace(types, '<span style="color: #4EC9B0;">$1</span>')
      .replace(/(\d+)/g, '<span style="color: #B5CEA8;">$1</span>');

    return (
      <div
        key={lineIndex}
        style={{ minHeight: "1.5em" }}
        dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }}
      />
    );
  });
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  startFrame = 0,
  animateIn = true,
  animateOut = false,
  outStartFrame = 100,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = animateIn
    ? interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const outOpacity = animateOut
    ? interpolate(frame, [outStartFrame, outStartFrame + 15], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  const translateY = animateIn
    ? interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        borderRadius: 12,
        padding: "24px 32px",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 20,
        lineHeight: 1.6,
        color: "#D4D4D4",
        opacity: opacity * outOpacity,
        transform: `translateY(${translateY}px)`,
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
        ...style,
      }}
    >
      {highlightCode(code)}
    </div>
  );
};
