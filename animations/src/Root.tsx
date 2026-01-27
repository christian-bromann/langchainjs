import React from "react";
import { Composition } from "remotion";
import { StateSchemaAnimation, TOTAL_DURATION } from "./Composition";
import { TwitterShortAnimation, TWITTER_SHORT_DURATION } from "./TwitterShort";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main animation - full sequence */}
      <Composition
        id="StateSchemaAnimation"
        component={StateSchemaAnimation}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Twitter-optimized short version (~13s) */}
      <Composition
        id="TwitterShort"
        component={TwitterShortAnimation}
        durationInFrames={TWITTER_SHORT_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Twitter short - square format */}
      <Composition
        id="TwitterShortSquare"
        component={TwitterShortAnimation}
        durationInFrames={TWITTER_SHORT_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Square format for Twitter/Instagram */}
      <Composition
        id="StateSchemaAnimationSquare"
        component={StateSchemaAnimation}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1080}
      />

      {/* Individual scenes for flexibility */}
      <Composition
        id="IntroOnly"
        component={require("./scenes/IntroScene").IntroScene}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="BeforeAfterOnly"
        component={require("./scenes/BeforeAfterScene").BeforeAfterScene}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="SchemaSwapOnly"
        component={require("./scenes/SchemaSwapScene").SchemaSwapScene}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="TypeFlowOnly"
        component={require("./scenes/TypeFlowScene").TypeFlowScene}
        durationInFrames={170}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="OutroOnly"
        component={require("./scenes/OutroScene").OutroScene}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
