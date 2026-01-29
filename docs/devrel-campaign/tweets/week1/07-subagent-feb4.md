# Thread: Subagent Architecture
**Date**: February 4, 2026  
**Platform**: Twitter/X  
**Format**: 5-tweet thread  
**Attach**: Code image for tweet 2 (see `/code-images/07-subagent-spawn.png`), diagram for tweet 3

---

## Tweet 1 (278 chars)
```
🧵 The biggest problem with complex AI agents: context pollution.

Your main agent is researching a topic. It needs to go DEEP on a subtask. That deep-dive fills the context window with details the main agent doesn't need.

Solution? Subagent spawning with context isolation. Here's how 👇
```

## Tweet 2 (275 chars)
```
DeepAgentsJS includes a task() tool that spawns specialized subagents:

[See code image]

Each subagent gets its own isolated context. It goes deep, does the work, and returns a summary. Main agent stays clean and focused on the bigger picture.

Just like delegating to a teammate.
```

## Tweet 3 (280 chars)
```
The flow:

Main Agent: "I need deep research on quantum error correction"
  ↓
  → Spawns research-subagent (isolated context)
  → Subagent searches, analyzes, synthesizes
  → Returns: "Key findings: [summary]"
  ↓
Main Agent continues with clean context + summary

No context pollution. Maximum depth.
```

## Tweet 4 (279 chars)
```
Why this pattern is powerful:

✅ Context isolation - main agent stays clean
✅ Different models per subtask - optimize cost/capability
✅ Specialized prompts - each subagent tuned for its job
✅ Parallel execution - multiple subagents can work simultaneously
✅ Graceful failure - one subagent failing doesn't kill the main
```

## Tweet 5 (276 chars)
```
This is exactly how Claude Code, Manus, and Deep Research handle complexity. They don't try to do everything in one context - they delegate.

DeepAgentsJS makes this pattern first-class:

const agent = createDeepAgent({
  subagents: [researchAgent, codeAgent, analysisAgent],
});
```

---

## Code Image

**File**: `/code-images/07-subagent-spawn.png`

```typescript
import { createDeepAgent, SubAgent } from "deepagents";
import { webSearch, codeAnalysis } from "./tools";

// Define specialized subagents
const researchSubagent: SubAgent = {
  name: "deep-researcher",
  description: "For in-depth research requiring multiple searches",
  systemPrompt: `You are an expert researcher. 
    Search thoroughly, cross-reference sources, 
    and synthesize findings into clear summaries.`,
  tools: [webSearch],
  model: "gpt-4o", // Can use different model than main agent
};

const codeSubagent: SubAgent = {
  name: "code-analyst",
  description: "For deep code analysis and architecture review",
  systemPrompt: `You are a senior software architect.
    Analyze code structure, identify patterns,
    and provide actionable recommendations.`,
  tools: [codeAnalysis],
  model: "claude-sonnet-4", // Claude excels at code
};

// Main agent can delegate to subagents via task() tool
const mainAgent = createDeepAgent({
  model: "claude-sonnet-4",
  subagents: [researchSubagent, codeSubagent],
  systemPrompt: `You orchestrate complex tasks.
    Delegate deep work to subagents when needed.`,
});
```

---

## Alt Text
"TypeScript code defining two specialized subagents (deep-researcher and code-analyst) with different models and prompts, then creating a main agent that can delegate to them via the task() tool."
