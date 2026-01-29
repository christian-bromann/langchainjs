# Thread: The Middleware Pattern
**Date**: February 5, 2026  
**Platform**: Twitter/X  
**Format**: 5-tweet thread  
**Attach**: Code image for tweet 3 (see `/code-images/08-middleware-compose.png`)

---

## Tweet 1 (280 chars)
```
🧵 Most agent frameworks give you an all-or-nothing architecture. You get their opinionated stack or you build from scratch.

DeepAgentsJS uses composable middleware. Pick exactly the capabilities you need. Skip what you don't. Combine them however you want.

Here's the pattern 👇
```

## Tweet 2 (280 chars)
```
DeepAgentsJS ships three core middleware:

📋 todoListMiddleware - planning & task decomposition
💾 FilesystemMiddleware - context management via files  
🤖 SubAgentMiddleware - delegate to specialized agents

createDeepAgent() includes all three by default. But you can mix and match however you want.
```

## Tweet 3 (274 chars)
```
Building a simple agent that only needs planning? Just use todoListMiddleware.

Need filesystem but not subagents? Combine todoList + Filesystem.

Building something custom? Add your own middleware to the stack.

[See code image]

Composition over configuration. Just like React hooks.
```

## Tweet 4 (280 chars)
```
Each middleware is independent and tested separately:

• Use todoListMiddleware with any LangGraph agent
• Add FilesystemMiddleware to existing projects  
• SubAgentMiddleware works standalone

They're building blocks, not a monolith. Import what you need, extend what you want, ignore the rest.
```

## Tweet 5 (279 chars)
```
This is how production systems should work. Not "use our framework or else" but "here are composable pieces, build what fits your use case."

Deep agents are a pattern, not a product. DeepAgentsJS just makes the pattern accessible.

Docs: docs.langchain.com/deepagents/middleware
```

---

## Code Image

**File**: `/code-images/08-middleware-compose.png`

```typescript
import { createAgent } from "langchain";
import { 
  todoListMiddleware, 
  createFilesystemMiddleware,
  createSubAgentMiddleware 
} from "deepagents";

// Option 1: Full deep agent (all middleware)
const fullAgent = createDeepAgent({
  model: "claude-sonnet-4",
  tools: [webSearch],
});

// Option 2: Just planning (no filesystem, no subagents)
const planningAgent = createAgent({
  model: "claude-sonnet-4",
  middleware: [todoListMiddleware()],
  tools: [webSearch],
});

// Option 3: Planning + Filesystem (no subagents)
const contextAgent = createAgent({
  model: "claude-sonnet-4",
  middleware: [
    todoListMiddleware(),
    createFilesystemMiddleware({ backend: myBackend }),
  ],
  tools: [webSearch],
});

// Option 4: Add custom middleware to deep agent
const customAgent = createDeepAgent({
  model: "claude-sonnet-4",
  middleware: [myLoggingMiddleware, myMetricsMiddleware],
  tools: [webSearch],
});
```

---

## Alt Text
"TypeScript code showing four different agent configurations: full deep agent with all middleware, planning-only agent, planning plus filesystem agent, and a custom agent with additional middleware."
