# StateSchema Animation

Remotion-based animation showcasing the new StateSchema feature in LangGraph.js v1.1.

## Preview

The animation demonstrates:

1. **Intro** - LangGraph.js StateSchema branding
2. **Before/After** - Code transformation from Annotation.Root to StateSchema
3. **Schema Swap** - Cycling through Zod, Valibot, and ArkType (Standard Schema support)
4. **Type Flow** - How types flow from StateSchema to GraphNode
5. **Outro** - Installation CTA

## Available Compositions

| ID | Description | Duration | Resolution |
|----|-------------|----------|------------|
| `StateSchemaAnimation` | Full animation | ~25s | 1920x1080 |
| `StateSchemaAnimationSquare` | Full animation (square) | ~25s | 1080x1080 |
| `TwitterShort` | Optimized for Twitter | ~13s | 1920x1080 |
| `TwitterShortSquare` | Twitter square format | ~13s | 1080x1080 |
| `BeforeAfterOnly` | Just the before/after scene | 6s | 1920x1080 |
| `SchemaSwapOnly` | Just the schema swap scene | ~6.5s | 1920x1080 |
| `TypeFlowOnly` | Just the type flow scene | ~5.5s | 1920x1080 |

## Quick Start

```bash
# Install dependencies
npm install

# Start Remotion Studio (preview in browser)
npm start

# Render the Twitter-optimized video
npx remotion render src/index.ts TwitterShort out/twitter-short.mp4

# Render as GIF (for Twitter inline preview)
npx remotion render src/index.ts TwitterShort out/twitter-short.gif --image-format=png
```

## Render Commands

### Full Animation (MP4)
```bash
npx remotion render src/index.ts StateSchemaAnimation out/full-animation.mp4
```

### Twitter Short (Recommended for tweets)
```bash
# Standard 16:9
npx remotion render src/index.ts TwitterShort out/twitter-short.mp4

# Square format (better for mobile)
npx remotion render src/index.ts TwitterShortSquare out/twitter-short-square.mp4
```

### GIF Output
```bash
# For inline preview on Twitter (smaller file size)
npx remotion render src/index.ts TwitterShort out/animation.gif \
  --image-format=png \
  --scale=0.5
```

### Individual Scenes
```bash
npx remotion render src/index.ts BeforeAfterOnly out/before-after.mp4
npx remotion render src/index.ts SchemaSwapOnly out/schema-swap.mp4
```

## Customization

### Colors
The animation uses a dark theme with green accents:
- Background: `#0a0a0a`
- Text: `#fff` (primary), `#666` (secondary)
- Accent: `#22c55e` (green)
- Before badge: `#ef4444` (red)
- After badge: `#22c55e` (green)

### Fonts
The animation uses:
- **Inter** - UI text
- **JetBrains Mono** - Code blocks

For best results, ensure these fonts are installed or update the fontFamily values.

### Timing
Adjust scene durations in:
- `src/Composition.tsx` - Full animation timing
- `src/TwitterShort.tsx` - Short version timing

## File Structure

```
animations/
├── src/
│   ├── components/
│   │   ├── CodeBlock.tsx    # Syntax-highlighted code display
│   │   ├── SchemaLogo.tsx   # Schema library logo badges
│   │   └── Title.tsx        # Animated title component
│   ├── scenes/
│   │   ├── IntroScene.tsx   # Opening with logo
│   │   ├── BeforeAfterScene.tsx  # Code transformation
│   │   ├── SchemaSwapScene.tsx   # Library switching demo
│   │   ├── TypeFlowScene.tsx     # Type inference demo
│   │   └── OutroScene.tsx   # Closing CTA
│   ├── Composition.tsx      # Main full-length composition
│   ├── TwitterShort.tsx     # Twitter-optimized short version
│   ├── Root.tsx             # Remotion root with all compositions
│   └── index.ts             # Entry point
├── package.json
├── tsconfig.json
├── remotion.config.ts
└── README.md
```

## Twitter Best Practices

1. **Use TwitterShort** - Optimized for attention span and autoplay
2. **Upload as video** - Better engagement than GIFs
3. **Add captions** - Many watch without sound
4. **Square format** - Better visibility on mobile feeds

## Requirements

- Node.js 18+
- npm or yarn

## License

MIT
