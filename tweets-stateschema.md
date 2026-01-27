# LangGraph.js v1.1 StateSchema Twitter Thread

## Tweet 1 - Hook
Just shipped in @LangChainAI LangGraph.js v1.1: StateSchema

A completely new way to define agent state that works with ANY validation library (Zod, Valibot, ArkType).

No more library lock-in. Full type safety. Better DX.

Here's why this matters...

---

## Tweet 2 - The Problem
Before StateSchema, defining state in LangGraph.js meant:

- Using Annotation.Root (custom API to learn)
- Manual type wrangling for State vs Update types
- Defining nodes inline to get type inference
- Limited validation library choices

StateSchema fixes all of this.

---

## Tweet 3 - Standard Schema Support
LangGraph.js now supports Standard Schema - an open spec implemented by Zod 4, Valibot, ArkType, and others.

This means you can use YOUR preferred validation library without lock-in.

Same StateSchema API. Any compliant library. Zero friction.

```ts
import { z } from "zod"; // or valibot, arktype
import { StateSchema } from "@langchain/langgraph";

const AgentState = new StateSchema({
  messages: MessagesValue,
  count: z.number().default(0),
});
```

---

## Tweet 4 - ReducedValue for Accumulators
Need to accumulate state across graph nodes? ReducedValue makes it declarative:

```ts
const AgentState = new StateSchema({
  history: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.string(),
      reducer: (curr, next) => [...curr, next],
    }
  ),
});
```

No more manual BinaryOperatorAggregate setup.

---

## Tweet 5 - UntrackedValue for Transient State
New: UntrackedValue for fields that SHOULDN'T persist to checkpoints.

Perfect for:
- Database connections
- Runtime caches
- Temporary computation state

They exist during execution but reset on checkpoint restore. Memory-safe by design.

---

## Tweet 6 - Type Utilities
Define typed nodes OUTSIDE your StateGraph builder with full inference:

```ts
const processNode: GraphNode<typeof AgentState> = 
  (state) => ({ count: state.count + 1 });

// Type-safe routing
const router: GraphNode<typeof AgentState, Context, "agent" | "tool"> = 
  (state) => new Command({ goto: state.needsTool ? "tool" : "agent" });
```

Clean, modular, testable.

---

## Tweet 7 - Type Bag Pattern
The new type bag pattern lets nodes have DIFFERENT input and output schemas:

```ts
const node: GraphNode<{
  InputSchema: typeof InputSchema;
  OutputSchema: typeof OutputSchema;
  ContextSchema: typeof ContextSchema;
  Nodes: "agent" | "tool";
}> = (state) => ({ answer: "response" });
```

Full type safety for complex graph architectures.

---

## Tweet 8 - Mixed Schema Support
Mix and match ANY combination of schema types:

- Annotation.Root
- StateSchema  
- Plain Zod schemas

In the same graph. For state, input, AND output.

```ts
new StateGraph({
  state: StateSchema,
  input: zodInputSchema,
  output: AnnotationOutput,
});
```

Maximum flexibility.

---

## Tweet 9 - What This Unlocks
With StateSchema you get:

- Schema library freedom (Zod, Valibot, ArkType)
- Automatic State & Update type inference
- Declarative reducers & transient values
- Type-safe nodes defined anywhere
- Per-node input schema support
- Better code organization

All while staying fully backward compatible.

---

## Tweet 10 - Get Started
Upgrade now:

```bash
npm install @langchain/langgraph@latest
```

```ts
import { 
  StateSchema, 
  ReducedValue, 
  UntrackedValue,
  MessagesValue,
  GraphNode 
} from "@langchain/langgraph";
```

Docs: https://langchain-ai.github.io/langgraphjs/

The future of agent state definition is here.

---

## Alternative Standalone Tweets

### Standalone Tweet A - Quick Announcement
LangGraph.js 1.1 drops StateSchema:

- Any validation library (Zod, Valibot, ArkType)
- ReducedValue for declarative accumulators
- UntrackedValue for transient state
- Type-safe nodes defined anywhere
- Mix Annotation + Zod + StateSchema freely

Standard Schema compliant. Zero lock-in.

### Standalone Tweet B - Technical Deep Dive
StateSchema in LangGraph.js 1.1 implements Standard Schema - meaning your graph state definitions now work with Zod 4, Valibot, ArkType, and any future compliant library.

Same types. Same inference. Your choice of runtime validation.

This is how libraries should be built.

### Standalone Tweet C - DX Focus
Defining LangGraph.js state used to mean learning Annotation.Root and defining nodes inline.

Now with StateSchema + GraphNode type utilities:

- Use any schema library you know
- Define nodes anywhere, get full types
- Type bag pattern for complex I/O

Just better DX.

### Standalone Tweet D - The Bigger Picture
Standard Schema support in LangGraph.js means:

Today: Zod, Valibot, ArkType
Tomorrow: Any new schema library that implements the spec

Your agent code stays the same. The ecosystem grows.

This is future-proof state management.

---

## Key Technical Points Summary

1. **StateSchema** - New class for defining graph state with Standard Schema compliance
2. **Standard Schema** - Open specification (standardschema.dev) for runtime validators
3. **ReducedValue** - Declarative field reducers for state accumulation
4. **UntrackedValue** - Transient fields that don't persist to checkpoints
5. **MessagesValue** - Pre-built message list with add/remove semantics
6. **GraphNode<T>** - Type utility for defining typed nodes outside graph builder
7. **ConditionalEdgeRouter<T>** - Type for conditional edge routing functions
8. **Type Bag Pattern** - Separate input/output/context schemas per node
9. **Mixed Schema Support** - Combine Annotation, StateSchema, Zod freely
10. **Per-node Input Schemas** - Different input types for different nodes

## Release Info
- Version: @langchain/langgraph v1.1.0 - v1.1.2
- Main PRs: #1842, #1852, #1916, #1918
- Key contributor: @hntrl
