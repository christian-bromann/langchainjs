# LangGraph.js StateSchema - Twitter Thread

## Tweet 1/8 - Hook
TypeScript type inference in LangGraph.js was painful.

Define state with Annotation.Root. Learn a custom API. Define nodes inline or lose types.

We just fixed it. StateSchema in v1.1:

→ Use Zod, Valibot, or ArkType
→ Define nodes anywhere with full types
→ Zero new syntax to learn

🧵

---

## Tweet 2/8 - Before/After
Before:

```ts
const State = Annotation.Root({
  count: Annotation<number>({
    reducer: (a, b) => a + b,
    default: () => 0,
  }),
});
// nodes must be inline to get types
```

After:

```ts
const State = new StateSchema({
  count: z.number().default(0),
});
// nodes can be anywhere
```

Your existing Zod knowledge. Full type inference.

---

## Tweet 3/8 - Standard Schema
Why this matters:

StateSchema implements Standard Schema - an open spec for validators.

Zod 4, Valibot, ArkType all support it.

Today you use Zod. Tomorrow you switch to Valibot. Your LangGraph code? Unchanged.

No library lock-in. Ever.

---

## Tweet 4/8 - GraphNode Type Utility
The real unlock: typed nodes OUTSIDE your graph builder.

```ts
// Defined in separate file, fully typed
const agentNode: GraphNode<typeof State> = (state) => {
  return { count: state.count + 1 };
};

// Use anywhere
graph.addNode("agent", agentNode);
```

Split your graph across files. Keep your types.

---

## Tweet 5/8 - ReducedValue
Accumulating state used to require manual channel setup.

Now:

```ts
history: new ReducedValue(
  z.array(z.string()),
  {
    inputSchema: z.string(),
    reducer: (arr, item) => [...arr, item],
  }
)
```

Declarative. Type-safe. The reducer types flow automatically.

---

## Tweet 6/8 - UntrackedValue
New primitive: UntrackedValue

For state that should NOT persist to checkpoints:
→ DB connections
→ Runtime caches  
→ Temp computation

Exists during execution. Resets on resume. Memory leaks avoided by design.

Small thing. Big impact for production agents.

---

## Tweet 7/8 - Mix Everything
One more thing.

You can now mix Annotation.Root, StateSchema, AND plain Zod in the same graph:

```ts
new StateGraph({
  state: myStateSchema,
  input: z.object({ query: z.string() }),
  output: OutputAnnotation,
});
```

Migrate incrementally. No big rewrites.

---

## Tweet 8/8 - Get Started
Available now in @langchain/langgraph v1.1

```bash
npm i @langchain/langgraph@latest
```

Huge thanks to @hntrl for the implementation.

Docs: langchain-ai.github.io/langgraphjs

What schema library would you use with this?

---

# Alternative Standalone Tweets

## Standalone A - The Hot Take
Unpopular opinion: Most "state management" in AI agent frameworks is just fighting the type system.

LangGraph.js 1.1 ships StateSchema:
→ Use any Standard Schema library (Zod, Valibot, ArkType)
→ Full type inference everywhere
→ Define nodes in separate files

Types should help, not hurt.

---

## Standalone B - The Before/After
LangGraph.js state definition: before vs after

Before: Custom Annotation API, inline nodes, manual type wrangling

After:
```ts
const State = new StateSchema({
  messages: MessagesValue,
  count: z.number().default(0),
});

const node: GraphNode<typeof State> = (s) => ({ count: s.count + 1 });
```

v1.1 is out.

---

## Standalone C - The Standard Schema Angle
LangGraph.js just adopted Standard Schema for state definitions.

What this means:

Today: Works with Zod 4, Valibot, ArkType
Tomorrow: Any future schema library that implements the spec

Your agent code stays the same. The ecosystem grows around you.

This is how you build for the long term.

---

## Standalone D - The DX Angle
If you've built LangGraph.js agents, you know this pain:

1. Define state with Annotation.Root
2. Define nodes inline or lose type inference
3. Everything in one file

v1.1 changes this:

StateSchema + GraphNode = define typed nodes anywhere.

Actual modular agent code. Finally.

---

## Standalone E - The Contributor Shoutout
Massive shoutout to @hntrl for shipping StateSchema in LangGraph.js 1.1

→ Standard Schema support (Zod, Valibot, ArkType)
→ ReducedValue for declarative accumulators
→ UntrackedValue for transient state
→ GraphNode for typed external nodes

4 PRs. Major DX improvement.

This is what great OSS contributions look like.

---

## Standalone F - The Technical Deep Dive
New in LangGraph.js: the type bag pattern

Define nodes with DIFFERENT input/output schemas:

```ts
const node: GraphNode<{
  InputSchema: typeof QueryInput;
  OutputSchema: typeof AnswerOutput;
}> = (query) => ({ answer: process(query) });
```

Full type safety. Node receives QueryInput, returns AnswerOutput.

For complex multi-step graphs, this changes everything.

---

# Writing Notes

## Applied Best Practices:
- Shortened to 8 tweets (from 10)
- Hook leads with PAIN, not feature announcement
- Before/after code comparison in tweet 2
- No links until final tweet
- Ends with engagement question
- Celebrated contributor @hntrl by name
- Used → instead of - for formatting
- Removed marketing speak ("revolutionary", "completely new")
- Code snippets kept to 5-8 lines max
- Each tweet has ONE clear point
- Added "unpopular opinion" standalone for engagement
- Technical depth assumed (smart audience)

## Character Count Targets:
- Aim for 200-250 chars per tweet (room for images)
- Code blocks will render as images in some clients

## Posting Strategy:
- Post thread in morning (dev audience US/EU)
- Reply to own thread with standalone tweets as "bonus"
- Quote tweet the thread with the hot take version
