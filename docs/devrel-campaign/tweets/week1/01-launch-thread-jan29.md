# Launch Thread: The 4 Pillars of Deep Agents
**Date**: January 29, 2026  
**Platform**: Twitter/X  
**Format**: 7-tweet thread  
**Attach**: Code image for tweet 6 (see `/code-images/01-launch-basic-setup.png`)

---

## Tweet 1 (278 chars)
```
🧵 Why do Claude Code, Manus & Deep Research feel magical while your ReAct agent falls flat on complex tasks?

It's not the model. It's architecture.

After reverse-engineering these systems, we found 4 pillars that separate "deep" agents from shallow tool-callers.

Let's break it down
```

## Tweet 2 (276 chars)
```
1/ PLANNING TOOL

Shallow agents: receive task → call tools → hope for the best

Deep agents: receive task → decompose into steps → track progress → adapt when things change

DeepAgentsJS ships a built-in write_todos tool. Your agent plans before acting, like a senior engineer would.
```

## Tweet 3 (279 chars)
```
2/ SUBAGENT SPAWNING

You're researching a topic. Need to go deep on one subtask. But that deep-dive pollutes your main context window.

Solution: spawn an isolated subagent via the task() tool. It goes deep, returns a summary, main agent continues with clean context.

Context isolation FTW
```

## Tweet 4 (280 chars)
```
3/ FILESYSTEM ACCESS

Context windows overflow. RAG results vary wildly in length. Web searches return unpredictable amounts of data.

DeepAgentsJS gives agents real filesystem tools: ls, read_file, write_file, edit_file, glob, grep.

Offload context to memory. Read back what you need.
```

## Tweet 5 (277 chars)
```
4/ DETAILED SYSTEM PROMPTS

The prompt isn't just "you are a helpful assistant" - it's your agent's operating manual.

When to plan. How to delegate. What to write to files. How to recover from errors.

DeepAgentsJS ships battle-tested prompts inspired by Claude Code. Customize for your app.
```

## Tweet 6 (274 chars)
```
The best part for AI devs building production systems:

✅ Model-agnostic (Claude, GPT-5, Llama, Gemini - your choice)
✅ Built on LangGraph (enterprise-tested)
✅ TypeScript-first with full type inference
✅ Composable middleware architecture

[See code image attached]

npm install deepagents
```

## Tweet 7 (267 chars)
```
We built DeepAgentsJS because every AI dev shouldn't have to reverse-engineer Claude Code to build real agents.

The patterns are general purpose. The framework is open source.

📚 Docs: docs.langchain.com/deepagents
⭐ GitHub: github.com/langchain-ai/deepagentsjs

What will you build? 👇
```

---

## Code Image for Tweet 6

**File**: `/code-images/01-launch-basic-setup.png`

```typescript
import { createDeepAgent } from "deepagents";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";

// Swap models in one line - no code changes
const agent = createDeepAgent({
  model: new ChatAnthropic({ model: "claude-sonnet-4" }),
  // model: new ChatOpenAI({ model: "gpt-5" }),
  systemPrompt: "You are an expert researcher...",
  tools: [webSearch, codeAnalysis],
});

// Stream results in real-time
for await (const event of agent.stream({
  messages: [{ role: "user", content: "Research AI agent architectures" }]
})) {
  console.log(event);
}
```

---

## LinkedIn Adaptation

Use same content but expand each point into a paragraph. Add:
- "I've been building AI agents for [X] and here's what I learned..."
- More context around each pillar
- Call to action for comments/shares
