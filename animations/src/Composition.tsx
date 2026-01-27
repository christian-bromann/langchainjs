import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { BeforeAfterScene } from "./scenes/BeforeAfterScene";
import { SchemaSwapScene } from "./scenes/SchemaSwapScene";
import { TypeFlowScene } from "./scenes/TypeFlowScene";
import { OutroScene } from "./scenes/OutroScene";

// Scene durations in frames (30fps)
const INTRO_DURATION = 90;
const BEFORE_AFTER_DURATION = 180;
const SCHEMA_SWAP_DURATION = 200;
const TYPE_FLOW_DURATION = 170;
const OUTRO_DURATION = 120;

export const StateSchemaAnimation: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Intro */}
      <Sequence from={currentFrame} durationInFrames={INTRO_DURATION}>
        <IntroScene />
      </Sequence>

      {/* Before/After comparison */}
      <Sequence
        from={(currentFrame += INTRO_DURATION)}
        durationInFrames={BEFORE_AFTER_DURATION}
      >
        <BeforeAfterScene />
      </Sequence>

      {/* Schema library swap */}
      <Sequence
        from={(currentFrame += BEFORE_AFTER_DURATION)}
        durationInFrames={SCHEMA_SWAP_DURATION}
      >
        <SchemaSwapScene />
      </Sequence>

      {/* Type flow demonstration */}
      <Sequence
        from={(currentFrame += SCHEMA_SWAP_DURATION)}
        durationInFrames={TYPE_FLOW_DURATION}
      >
        <TypeFlowScene />
      </Sequence>

      {/* Outro */}
      <Sequence
        from={(currentFrame += TYPE_FLOW_DURATION)}
        durationInFrames={OUTRO_DURATION}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};

export const TOTAL_DURATION =
  INTRO_DURATION +
  BEFORE_AFTER_DURATION +
  SCHEMA_SWAP_DURATION +
  TYPE_FLOW_DURATION +
  OUTRO_DURATION;
