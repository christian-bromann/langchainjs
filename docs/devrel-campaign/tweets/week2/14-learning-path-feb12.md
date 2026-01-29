# Thread: Getting Started - Your Learning Path
**Date**: February 12, 2026  
**Platform**: Twitter/X  
**Format**: 7-tweet thread  
**Attach**: Diagram showing learning path (see `/code-images/14-learning-path.png`)

---

## Tweet 1 (278 chars)
```
🧵 Ready to build deep agents? Here's your complete learning path - from zero to production.

Whether you have 15 minutes or 15 hours, there's a clear next step. Save this thread as your roadmap to mastering DeepAgentsJS and the deep agent architecture.

Let's get you started 👇
```

## Tweet 2 (280 chars)
```
STEP 1: Understand the concept (5 minutes)

Read the launch thread on what makes deep agents different from shallow ReAct loops.

Key insight: Deep agents PLAN before acting, DELEGATE to subagents, and MANAGE CONTEXT via filesystem. Not just tool calling in a loop.

Pinned in profile 📌
```

## Tweet 3 (280 chars)
```
STEP 2: Quick start hands-on (15 minutes)

npm install deepagents @langchain/anthropic
# or @langchain/openai for GPT

Clone the repo. Run examples/research/research-agent.ts

Watch the agent: create todos, search the web, write findings to files, synthesize a report.

See deep agents in action.
```

## Tweet 4 (277 chars)
```
STEP 3: Tutorial deep dive (1 hour)

Follow "From Shallow to Deep" on the LangChain blog.

Build your own research agent from scratch. Customize the system prompt. Add your own tools. Understand each pillar in action.

By the end you'll have a working agent you actually understand.
```

## Tweet 5 (280 chars)
```
STEP 4: Explore specific features (2-4 hours)

Pick what matters for your use case:

📋 Planning → todoListMiddleware docs
🤖 Subagents → createSubAgentMiddleware examples
💾 Backends → StateBackend vs StoreBackend vs Filesystem
🔒 Human-in-the-loop → interruptOn patterns

Go deep where you need to.
```

## Tweet 6 (279 chars)
```
STEP 5: Build your own app (ongoing)

Start with a focused use case - research agent, code assistant, document processor.

Iterate. Hit edge cases. Ask questions.

Join the community:
💬 Discord: langchain discord (deepagents channel)
💻 GitHub Discussions for longer-form questions
```

## Tweet 7 (274 chars)
```
All the resources in one place:

📚 Docs: docs.langchain.com/deepagents
💻 GitHub: github.com/langchain-ai/deepagentsjs  
🧪 Examples: /examples directory (research, memory, backends, sandbox)
📹 Video tutorials: YouTube playlist (link in bio)

Star ⭐ the repo and let's see what you build!
```

---

## Diagram Image

**File**: `/code-images/14-learning-path.png`

```
YOUR DEEPAGENTSJS LEARNING PATH
================================

┌─────────────────────────────────────────────────────────────┐
│  START HERE                                                 │
│  ┌─────────────────┐                                        │
│  │ 5 min: Concept  │ → Read "4 Pillars" thread              │
│  └────────┬────────┘                                        │
│           ↓                                                 │
│  ┌─────────────────┐                                        │
│  │ 15 min: Quick   │ → npm install + run research example   │
│  │ Start           │                                        │
│  └────────┬────────┘                                        │
│           ↓                                                 │
│  ┌─────────────────┐                                        │
│  │ 1 hr: Tutorial  │ → Build your own research agent        │
│  │ Deep Dive       │                                        │
│  └────────┬────────┘                                        │
│           ↓                                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 2-4 hrs: Pick Your Focus                            │    │
│  │                                                     │    │
│  │  📋 Planning    🤖 Subagents    💾 Backends    🔒 HITL │    │
│  │  middleware     spawning       storage       safety  │    │
│  └────────┬────────────────────────────────────────────┘    │
│           ↓                                                 │
│  ┌─────────────────┐                                        │
│  │ Ongoing: Build  │ → Your app + community                 │
│  │ & Iterate       │                                        │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘

Resources: docs.langchain.com/deepagents | github.com/langchain-ai/deepagentsjs
```

---

## Alt Text
"Flowchart showing the DeepAgentsJS learning path: 5 minutes to understand the concept, 15 minutes for quick start, 1 hour for tutorial deep dive, 2-4 hours to explore specific features, then ongoing building and iteration."
