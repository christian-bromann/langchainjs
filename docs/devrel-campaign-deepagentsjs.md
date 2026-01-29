# DeepAgentsJS DevRel Campaign Plan
## 2-Week Content Strategy (January 29 - February 12, 2026)

---

## Executive Summary

**DeepAgentsJS** is a TypeScript SDK that implements the architectural patterns behind breakthrough AI applications like Claude Code, Deep Research, and Manus. Despite its powerful capabilities, awareness remains low (596 stars vs. Claude Agent SDK's 4,396+ stars).

This campaign will establish DeepAgentsJS as the go-to framework for building **production-grade, deep reasoning agents** through targeted content highlighting its unique value proposition.

---

## Competitive Landscape Analysis

### DeepAgentsJS vs. Claude Agent SDK vs. OpenAI Agents SDK

| Feature | DeepAgentsJS | Claude Agent SDK | OpenAI Agents SDK |
|---------|--------------|------------------|-------------------|
| **Core Philosophy** | Deep agents with planning, subagents, memory | Wrapper around Claude Code CLI | Lightweight multi-agent orchestration |
| **Language** | TypeScript-first | Python + TypeScript | Python (JS version exists) |
| **Model Flexibility** | Any LLM (Claude, GPT, Llama, etc.) | Claude only | OpenAI + 100+ LLMs |
| **Planning System** | Built-in `write_todos` tool | Relies on Claude's inherent planning | Manual implementation required |
| **Subagent Architecture** | Native `task` tool for spawning | Session forking | Handoffs between agents |
| **Context Management** | Full filesystem tools (ls, read, write, edit, glob, grep) | Via Claude Code's built-in tools | No built-in filesystem |
| **Memory/Persistence** | Multiple backends (State, Store, Filesystem, Composite) | Session-based | SQLite/Redis sessions |
| **Sandbox Execution** | Extensible `BaseSandbox` class | Bundled Claude Code CLI | None built-in |
| **Framework Base** | LangGraph (battle-tested) | Claude Code CLI dependency | Custom runtime |
| **Human-in-the-Loop** | Native LangGraph interrupt support | Hooks system | Manual implementation |
| **Streaming** | Full streaming support | AsyncIterator-based | Event-based |
| **Middleware Architecture** | Composable middleware pattern | Hooks for specific events | Guardrails only |

### Key Differentiators for DeepAgentsJS

1. **True Model Agnosticism**: Not locked into any vendor. Use Claude, GPT-5, Llama, or any LangChain-compatible model.

2. **Deep Agent Architecture**: The only SDK specifically designed around the 4 pillars that make Claude Code successful:
   - Planning tool
   - Subagent spawning
   - Filesystem access
   - Detailed system prompts

3. **LangGraph Foundation**: Built on proven infrastructure used in production by enterprises.

4. **Composable Middleware**: Mix and match capabilities (TodoList, Filesystem, SubAgent) as needed.

5. **Context Engineering**: Purpose-built for handling variable-length tool results without context window overflow.

---

## Content Strategy: Two-Week Calendar

### Week 1: Foundation & Awareness (Jan 29 - Feb 4)

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| **Wed 29** | Twitter/X | Thread (5-7 tweets) | "What makes Claude Code so powerful? The 4 pillars of deep agents" |
| **Wed 29** | LinkedIn | Article snippet | Same thread adapted for LinkedIn |
| **Thu 30** | Twitter/X | Code snippet tweet | "Build a deep research agent in 30 lines of TypeScript" |
| **Thu 30** | Dev.to/Blog | Tutorial | "From Shallow to Deep: Building Your First Deep Agent" |
| **Fri 31** | Twitter/X | Comparison thread | "DeepAgentsJS vs Claude Agent SDK: When to use which" |
| **Sat 1** | Twitter/X | Feature spotlight | "The write_todos tool: How planning makes agents 10x more effective" |
| **Sun 2** | Twitter/X | Demo video (< 1 min) | Quick demo: Agent planning and executing a multi-step task |
| **Mon 3** | Twitter/X | Thread | "Why model-agnostic agents matter for production" |
| **Mon 3** | Blog | Deep dive | "Context Engineering: How DeepAgentsJS Prevents Token Overflow" |
| **Tue 4** | Twitter/X | Code snippet | "Subagent spawning: Isolate context, go deep on subtasks" |

### Week 2: Deep Dives & Community (Feb 5 - Feb 12)

| Day | Platform | Content Type | Topic |
|-----|----------|--------------|-------|
| **Wed 5** | Twitter/X | Thread | "The middleware pattern: Compose your agent's capabilities" |
| **Wed 5** | YouTube | Tutorial (10-15 min) | "Building a Production Research Agent with DeepAgentsJS" |
| **Thu 6** | Twitter/X | Comparison | "OpenAI Agents SDK vs DeepAgentsJS: Handoffs vs Subagents" |
| **Thu 6** | Blog | Technical post | "Understanding Agent Backends: State, Store, and Filesystem" |
| **Fri 7** | Twitter/X | Use case thread | "5 real-world applications built with DeepAgentsJS" |
| **Sat 8** | Twitter/X | Tip thread | "7 prompting patterns for effective deep agents" |
| **Sun 9** | Twitter/X | Community spotlight | RT/engage with community projects |
| **Mon 10** | Twitter/X | Thread | "Human-in-the-loop: Building trustworthy AI agents" |
| **Mon 10** | Blog | Tutorial | "Implementing Safe Agent Workflows with Interrupt Patterns" |
| **Tue 11** | Twitter/X | Feature deep dive | "Sandbox execution: Running shell commands safely" |
| **Wed 12** | Twitter/X | Wrap-up thread | "Getting started with DeepAgentsJS: Your learning path" |
| **Wed 12** | Newsletter | Digest | Campaign summary + resources |

---

## Individual Content Pieces (Detailed)

### Content Piece #1: Launch Thread
**Platform**: Twitter/X  
**Date**: January 29  
**Format**: 5-7 tweet thread  
**Goal**: Establish the "deep agents" concept and position DeepAgentsJS

```
🧵 Thread: What makes Claude Code so powerful?

It's not just a smart model. It's architecture.

After studying Claude Code, Deep Research, and Manus, we identified 4 pillars that turn "shallow" tool-calling agents into deep reasoning systems:

1/7

---

Pillar 1: PLANNING TOOL 📋

Shallow agents: React to each message
Deep agents: Break down complex tasks into discrete steps

DeepAgentsJS includes a built-in `write_todos` tool. The agent plans before acting, tracks progress, and adapts when new info emerges.

2/7

---

Pillar 2: SUB-AGENTS 🤖

Problem: Going deep on a subtask pollutes your main agent's context

Solution: Spawn specialized subagents with isolated context

The `task` tool lets agents delegate work while keeping the main context clean.

3/7

---

Pillar 3: FILESYSTEM ACCESS 💾

Context windows overflow. Tool results vary in length.

DeepAgentsJS gives agents tools to offload context to memory:
• ls, read_file, write_file, edit_file
• glob, grep for search
• Persistent state across conversations

4/7

---

Pillar 4: DETAILED PROMPTS 📝

The system prompt isn't just instructions—it's the agent's operating manual.

DeepAgentsJS ships with a battle-tested prompt inspired by Claude Code's approach, made more general-purpose for your use case.

5/7

---

The best part?

✅ Model-agnostic (Claude, GPT, Llama, anything)
✅ Built on LangGraph
✅ TypeScript-first with full type safety
✅ Composable middleware architecture

npm install deepagents

6/7

---

We built DeepAgentsJS to make deep agents accessible to everyone.

📚 Docs: [link]
🧪 Examples: [link]
⭐ Star on GitHub: [link]

What will you build?

7/7
```

---

### Content Piece #2: Tutorial Blog Post
**Platform**: Dev.to / LangChain Blog  
**Date**: January 30  
**Title**: "From Shallow to Deep: Building Your First Deep Agent in TypeScript"  
**Length**: ~2000 words  
**Goal**: Hands-on tutorial driving npm installs

**Outline**:
1. **Introduction**: What are shallow vs deep agents?
   - Tool-calling loop diagram
   - Why it breaks down for complex tasks

2. **The Deep Agent Pattern**
   - Four pillars diagram
   - How Claude Code, Manus, Deep Research use these

3. **Tutorial: Build a Research Agent**
   - Installation (`npm install deepagents @langchain/tavily`)
   - Basic setup with `createDeepAgent`
   - Adding internet search tool
   - Custom system prompt for research
   - Running and streaming results

4. **Understanding the Magic**
   - Show the agent planning with todos
   - Demonstrate context offloading
   - Show subagent spawning

5. **Extending Your Agent**
   - Adding custom tools
   - Using different models
   - Configuring backends

6. **What's Next?**
   - Links to advanced examples
   - Community resources

**Code Examples to Include**:
```typescript
// Basic deep agent
import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";

const agent = createDeepAgent({
  model: new ChatOpenAI({ model: "gpt-4o" }),
  systemPrompt: "You are an expert researcher...",
  tools: [internetSearch],
});

// Watch it plan and execute
for await (const event of agent.stream({
  messages: [{ role: "user", content: "Research quantum computing trends" }],
})) {
  console.log(event);
}
```

---

### Content Piece #3: Comparison Thread
**Platform**: Twitter/X  
**Date**: January 31  
**Format**: Thread with comparison table graphic  
**Goal**: Capture developers evaluating options

```
🧵 DeepAgentsJS vs Claude Agent SDK: A developer's guide

Both help you build AI agents. But they solve different problems.

Here's when to use each 👇

1/6

---

🔷 Claude Agent SDK

Best for:
• Building on Claude Code's exact capabilities
• Wrapping Claude Code CLI programmatically
• Staying within the Anthropic ecosystem

Trade-offs:
• Requires Claude Code CLI bundled
• Claude models only
• Python-first (TS version more limited)

2/6

---

🔶 DeepAgentsJS

Best for:
• Building custom deep agents with any model
• Production apps needing model flexibility
• TypeScript-first codebases
• Complex multi-agent architectures

Trade-offs:
• Newer project (but LangGraph is battle-tested)
• Requires more setup for basic use cases

3/6

---

Key differences:

1️⃣ Model lock-in
   Claude SDK: Claude only
   DeepAgentsJS: Any model (Claude, GPT, Llama...)

2️⃣ Architecture
   Claude SDK: CLI wrapper
   DeepAgentsJS: Native LangGraph graphs

3️⃣ Customization
   Claude SDK: Hooks for specific events
   DeepAgentsJS: Full middleware pattern

4/6

---

Use Claude Agent SDK when:
✓ You want Claude Code's exact behavior
✓ You're already using Claude Code CLI
✓ Quick prototyping with Claude

Use DeepAgentsJS when:
✓ You need model flexibility
✓ Building production systems
✓ Want deep customization
✓ TypeScript-first development

5/6

---

Both are great tools for different needs.

The best choice depends on your constraints and goals.

📚 DeepAgentsJS: github.com/langchain-ai/deepagentsjs
📚 Claude Agent SDK: github.com/anthropics/claude-agent-sdk-python

Questions? Drop them below 👇

6/6
```

---

### Content Piece #4: Feature Spotlight - Planning Tool
**Platform**: Twitter/X  
**Date**: February 1  
**Format**: Single tweet with code image  
**Goal**: Highlight unique feature

```
The secret weapon of deep agents: automatic task planning 📋

Watch this agent break down "research quantum computing" into discrete steps, track progress, and adapt as new information emerges.

Built-in to DeepAgentsJS with the write_todos tool.

[Code screenshot showing:
1. Agent receiving complex query
2. Planning phase with todos created
3. Execution with checkmarks
4. Final output]

npm install deepagents
```

---

### Content Piece #5: Demo Video
**Platform**: Twitter/X (native video)  
**Date**: February 2  
**Length**: 45-60 seconds  
**Goal**: Visual demonstration of capabilities

**Script**:
```
[0-10s] "What if your AI agent could plan like a human?"

[10-25s] Show terminal: Agent receives complex research task
         Agent creates todo list visible in real-time
         "See how it breaks down the task into steps"

[25-40s] Show agent working through steps
         Spawning subagent for deep research
         Writing findings to filesystem

[40-55s] Final output appears
         "Built with DeepAgentsJS in 30 lines of code"

[55-60s] "Link in bio. Star on GitHub."
```

---

### Content Piece #6: Model Agnostic Thread
**Platform**: Twitter/X  
**Date**: February 3  
**Goal**: Address vendor lock-in concerns

```
🧵 Why model-agnostic agents matter for production:

Last year: "Just use GPT-4!"
This year: Claude is better for some tasks, Llama for others, GPT-5 for some...

Your agent framework shouldn't lock you in.

1/5

---

With DeepAgentsJS, swap models in one line:

// Use Claude
model: new ChatAnthropic({ model: "claude-sonnet-4" })

// Switch to OpenAI
model: new ChatOpenAI({ model: "gpt-5" })

// Go local
model: new ChatOllama({ model: "llama3" })

Same agent. Same code. Different brain.

2/5

---

Why this matters:

📉 Cost optimization: Route to cheaper models for simple tasks
🏃 Performance: Pick the fastest model for latency-sensitive ops
🔒 Compliance: Use local models when data can't leave your servers
🧪 A/B testing: Compare model performance on your exact use case

3/5

---

The competitive landscape is moving fast.

Locking into one provider's SDK means rewriting when:
• A new model beats your current one
• Pricing changes
• You need to go multi-cloud

DeepAgentsJS is built on LangChain's model abstraction—150+ integrations.

4/5

---

Build agents that evolve with the AI landscape.

github.com/langchain-ai/deepagentsjs

Star it ⭐ if you believe in model flexibility.

5/5
```

---

### Content Piece #7: Technical Blog - Context Engineering
**Platform**: LangChain Blog / Medium  
**Date**: February 3  
**Title**: "Context Engineering: How DeepAgentsJS Prevents Token Overflow"  
**Length**: ~1500 words  
**Goal**: Establish technical credibility

**Outline**:
1. **The Context Window Problem**
   - Variable-length tool results (web search, RAG)
   - Token limits hit unexpectedly
   - Agent loses track of earlier context

2. **The Filesystem Solution**
   - Offload context to memory files
   - Read back what's needed
   - Built-in tools: ls, read_file, write_file, edit_file, glob, grep

3. **Backend Options**
   - StateBackend: In-memory, ephemeral
   - StoreBackend: Persistent with LangGraph Store
   - FilesystemBackend: Actual filesystem
   - CompositeBackend: Mix and match

4. **Practical Patterns**
   - Research agent: Save findings to files, summarize at end
   - Code agent: Work on real files, maintain state
   - Long-running: Persist across sessions

5. **Code Examples**
   ```typescript
   // Configure persistent storage
   const agent = createDeepAgent({
     backend: (config) => new StoreBackend(config),
     store: new InMemoryStore(),
     checkpointer: new MemorySaver(),
   });
   ```

---

### Content Piece #8: Subagent Thread
**Platform**: Twitter/X  
**Date**: February 4  
**Goal**: Explain subagent architecture

```
🧵 The subagent pattern: Why context isolation is a superpower

Your main agent is researching a topic. It needs to go DEEP on a subtask.

Problem: That deep dive pollutes your main context window.

Solution: Spawn a subagent. 🤖

Here's how it works in DeepAgentsJS 👇

1/5

---

The `task` tool lets agents spawn specialized subagents:

const researchSubagent: SubAgent = {
  name: "research-agent",
  description: "Deep research on specific topics",
  systemPrompt: "You are an expert researcher",
  tools: [internetSearch],
  model: "gpt-4o", // Can use different model!
};

2/5

---

When the main agent encounters a complex subtask, it delegates:

Main Agent: "I need to deeply research quantum error correction"
           → Spawns research-agent
           → Subagent does deep research in isolated context
           → Returns summary to main agent
           → Main agent continues with clean context

3/5

---

Benefits:
✅ Context isolation (no pollution)
✅ Different models for different tasks (cost optimization)
✅ Specialized prompts per subtask
✅ Parallel subagent execution
✅ Clean main agent context for final synthesis

4/5

---

This is how Claude Code, Manus, and Deep Research handle complexity.

Now you can build the same architecture:

const agent = createDeepAgent({
  subagents: [researchSubagent, codeSubagent],
});

github.com/langchain-ai/deepagentsjs

5/5
```

---

### Content Piece #9: YouTube Tutorial
**Platform**: YouTube  
**Date**: February 5  
**Title**: "Building a Production Research Agent with DeepAgentsJS"  
**Length**: 12-15 minutes  
**Goal**: Drive adoption through hands-on learning

**Script Outline**:
1. **Intro** (1 min)
   - What we're building
   - Why deep agents

2. **Project Setup** (2 min)
   - npm init, install dependencies
   - Environment setup

3. **Basic Agent** (3 min)
   - Create simple agent
   - Test with basic query

4. **Adding Research Tools** (3 min)
   - Tavily search integration
   - Custom web scraping tool

5. **Customizing the Agent** (2 min)
   - System prompt engineering
   - Subagent configuration

6. **Testing Complex Queries** (2 min)
   - Multi-step research task
   - Watch planning in action

7. **Production Considerations** (2 min)
   - Backends for persistence
   - Human-in-the-loop
   - Error handling

8. **Outro** (1 min)
   - Resources
   - Call to action

---

### Content Piece #10: OpenAI Comparison Thread
**Platform**: Twitter/X  
**Date**: February 6  
**Goal**: Capture OpenAI developers

```
🧵 OpenAI Agents SDK vs DeepAgentsJS: Understanding the approaches

Both frameworks help you build multi-agent systems.
But they have fundamentally different philosophies.

Let's break it down 👇

1/6

---

🔵 OpenAI Agents SDK

Philosophy: Lightweight orchestration
Key pattern: HANDOFFS between agents

Agent A → hands off to → Agent B → hands off to → Agent C

Great for: Triage flows, language routing, deterministic pipelines

2/6

---

🟠 DeepAgentsJS

Philosophy: Deep reasoning architecture  
Key pattern: SUBAGENT SPAWNING with context isolation

Main Agent → spawns → Subagent (isolated context)
           ← returns ← summary
           → continues with clean context

Great for: Complex research, code generation, long-running tasks

3/6

---

Handoffs vs Subagents:

HANDOFFS:
• Control transfers entirely to new agent
• Good for routing/triage
• Sequential by nature

SUBAGENTS:
• Main agent stays in control
• Isolated context per subtask
• Can run in parallel
• Better for depth + breadth

4/6

---

Other key differences:

Planning:
• OpenAI: Manual implementation
• DeepAgentsJS: Built-in write_todos tool

Filesystem:
• OpenAI: No built-in support
• DeepAgentsJS: Full fs tools (ls, read, write, edit, glob, grep)

Middleware:
• OpenAI: Guardrails only
• DeepAgentsJS: Full composable middleware

5/6

---

Choose OpenAI Agents SDK for:
✓ Simple routing/triage flows
✓ OpenAI ecosystem integration
✓ Python-first teams

Choose DeepAgentsJS for:
✓ Deep reasoning tasks
✓ Model flexibility
✓ TypeScript-first
✓ Context engineering needs

Both are good. Pick what fits your use case.

6/6
```

---

### Content Piece #11: Blog - Understanding Backends
**Platform**: LangChain Blog  
**Date**: February 6  
**Title**: "Understanding Agent Backends: State, Store, and Filesystem in DeepAgentsJS"  
**Length**: ~1800 words  
**Goal**: Technical deep dive for advanced users

**Outline**:
1. **Introduction to Backends**
2. **StateBackend**: Ephemeral in-memory
3. **StoreBackend**: Persistent with LangGraph Store
4. **FilesystemBackend**: Real filesystem operations
5. **CompositeBackend**: Combining backends
6. **Sandbox Execution**: Running shell commands safely
7. **Choosing the Right Backend**
8. **Migration Patterns**

---

### Content Piece #12: Real-World Use Cases Thread
**Platform**: Twitter/X  
**Date**: February 7  
**Goal**: Inspire with possibilities

```
🧵 5 real-world applications you can build with DeepAgentsJS:

These aren't toy demos—they're production-ready patterns.

Let's go 👇

1/7

---

1️⃣ DEEP RESEARCH AGENT

Input: "Research the competitive landscape for AI code assistants"

What it does:
• Creates research plan
• Searches multiple sources
• Synthesizes findings in isolated subagents
• Writes comprehensive report

See: examples/research/

2/7

---

2️⃣ CODEBASE ANALYST

Input: "Analyze this repo and suggest architectural improvements"

What it does:
• Uses filesystem tools to explore code
• Creates analysis plan
• Spawns subagents for different aspects
• Compiles recommendations

Works with your actual filesystem.

3/7

---

3️⃣ DOCUMENT PROCESSOR

Input: Process 500 PDFs and extract structured data

What it does:
• Breaks work into batches
• Uses subagents for parallel processing
• Writes intermediate results to files
• Handles failures gracefully
• Aggregates final results

4/7

---

4️⃣ CUSTOMER SUPPORT AGENT

Input: Complex multi-step support tickets

What it does:
• Plans resolution steps
• Searches knowledge base (subagent)
• Checks order status (subagent)
• Synthesizes response
• Tracks resolution in todos

HITL for sensitive actions.

5/7

---

5️⃣ DATA PIPELINE BUILDER

Input: "Create an ETL pipeline for our sales data"

What it does:
• Analyzes data sources (subagent)
• Designs pipeline architecture
• Writes actual code files
• Tests in sandbox
• Documents everything

Full filesystem + sandbox support.

6/7

---

All these patterns are possible because DeepAgentsJS implements the 4 pillars:

✅ Planning tool
✅ Subagent architecture
✅ Filesystem access
✅ Detailed prompts

What will you build?

github.com/langchain-ai/deepagentsjs

7/7
```

---

### Content Piece #13: Prompting Patterns Thread
**Platform**: Twitter/X  
**Date**: February 8  
**Goal**: Provide actionable tips

```
🧵 7 prompting patterns for effective deep agents:

The system prompt isn't just instructions—it's your agent's operating manual.

Here are patterns that work 👇

1/9

---

1️⃣ TOOL USAGE GUIDANCE

Don't just list tools. Explain WHEN to use each:

"Use write_todos BEFORE starting complex tasks and AFTER learning new information that affects your plan."

Agents need decision frameworks, not just tool docs.

2/9

---

2️⃣ OUTPUT FORMAT SPECIFICATION

Be explicit about final output:

"Your final deliverable should be a markdown report with:
- Executive summary (2-3 sentences)
- Key findings (bullet points)
- Detailed analysis (sections)
- Recommendations (numbered)"

3/9

---

3️⃣ CONTEXT MANAGEMENT RULES

Teach offloading:

"When tool results exceed 2000 tokens, summarize key points and write full results to a file. Reference the file path in your reasoning."

Prevents context overflow.

4/9

---

4️⃣ SUBAGENT DELEGATION CRITERIA

Guide when to spawn:

"Spawn a subagent when:
- A subtask requires 3+ tool calls
- Deep domain expertise is needed
- The subtask's context would pollute your main reasoning"

5/9

---

5️⃣ ERROR HANDLING BEHAVIOR

Define recovery:

"If a tool fails:
1. Try alternative approach if available
2. Document what failed and why
3. Update your todo list
4. Continue with remaining tasks
5. Flag the failure in your final output"

6/9

---

6️⃣ PROGRESS TRANSPARENCY

Require updates:

"Update your todo list after EVERY significant action. Mark items complete immediately. This helps track progress and enables recovery if interrupted."

Builds reliable agents.

7/9

---

7️⃣ DOMAIN EXPERTISE FRAMING

Set expertise level:

"You are a senior software architect with 15 years of experience. You've led migrations at Fortune 500 companies. Bring that expertise to your analysis."

Primes better reasoning.

8/9

---

These patterns are embedded in DeepAgentsJS's default system prompt.

Customize them for your use case:

const agent = createDeepAgent({
  systemPrompt: myCustomPrompt,
});

Full prompt guide: docs.langchain.com/...

9/9
```

---

### Content Piece #14: Human-in-the-Loop Thread
**Platform**: Twitter/X  
**Date**: February 10  
**Goal**: Address trust/safety concerns

```
🧵 Building trustworthy AI agents with human-in-the-loop:

"AI agents sound great, but I can't let them run unsupervised"

Fair concern. Here's how DeepAgentsJS handles it 👇

1/6

---

The `interruptOn` config lets you require approval for sensitive tools:

const agent = createDeepAgent({
  tools: [deleteFile, sendEmail, deployCode],
  interruptOn: {
    delete_file: { allowedDecisions: ["approve", "reject"] },
    send_email: { allowedDecisions: ["approve", "edit", "reject"] },
    deploy_code: { allowedDecisions: ["approve", "reject"] },
  },
});

2/6

---

When the agent tries to use a sensitive tool:

1. Execution pauses
2. You review the proposed action
3. You approve, edit, or reject
4. Agent continues (or adapts if rejected)

Built on LangGraph's interrupt primitives—production tested.

3/6

---

Decision options:

✅ APPROVE: Execute as proposed
✏️ EDIT: Modify the parameters, then execute
❌ REJECT: Don't execute, agent adapts

"edit" is powerful—fix a typo in an email without rejecting the whole action.

4/6

---

Practical patterns:

• Development: interruptOn = {} (full autonomy)
• Staging: interruptOn = { destructive_ops } (gate dangerous actions)
• Production: interruptOn = { all_external_ops } (maximum safety)

Dial trust up as confidence grows.

5/6

---

Trustworthy agents = humans in the loop where it matters.

DeepAgentsJS makes this a config option, not a rewrite.

const agent = createDeepAgent({
  interruptOn: { ... },
});

github.com/langchain-ai/deepagentsjs

6/6
```

---

### Content Piece #15: Sandbox Execution Thread
**Platform**: Twitter/X  
**Date**: February 11  
**Goal**: Highlight advanced capability

```
🧵 Sandbox execution: Running shell commands safely in your agents

Sometimes agents need to run code. But `exec("rm -rf /")` is terrifying.

DeepAgentsJS supports sandboxed execution. Here's how 👇

1/5

---

Extend BaseSandbox to create isolated environments:

class DockerSandbox extends BaseSandbox {
  async execute(command: string): Promise<ExecuteResponse> {
    // Run in ephemeral container
    const result = await docker.run({
      image: "node:18",
      command: ["bash", "-c", command],
      timeout: 30000,
    });
    return { output: result.stdout, exitCode: result.code };
  }
}

2/5

---

Use it with your agent:

const sandbox = new DockerSandbox();

const agent = createDeepAgent({
  backend: sandbox,
  systemPrompt: "You can run shell commands using the execute tool.",
});

Agent gets an `execute` tool automatically.

3/5

---

What you can build:

• Code execution agents (run user code safely)
• CI/CD automation (deploy, test, build)
• System administration agents
• Data processing pipelines
• Interactive tutorials

All sandboxed. All safe.

4/5

---

Built-in features:

✅ Timeout handling
✅ Output truncation
✅ Exit code capture
✅ File upload/download support
✅ Works with any isolation tech (Docker, gVisor, Firecracker)

See examples/sandbox/ for implementations.

github.com/langchain-ai/deepagentsjs

5/5
```

---

### Content Piece #16: Wrap-up Thread & Learning Path
**Platform**: Twitter/X  
**Date**: February 12  
**Goal**: Guide newcomers, summarize campaign

```
🧵 Getting started with DeepAgentsJS: Your complete learning path

Ready to build deep agents? Here's how to go from zero to production 👇

1/7

---

STEP 1: Understand the concept (5 min)

Read: "The 4 pillars of deep agents"
Watch: Our 1-min demo video

Key insight: Deep agents plan, delegate, and manage context—not just call tools.

2/7

---

STEP 2: Quick start (15 min)

npm install deepagents @langchain/anthropic

Run the basic example:
examples/research/research-agent.ts

Watch an agent:
• Plan with todos
• Search the web  
• Synthesize findings

3/7

---

STEP 3: Tutorial deep dive (1 hour)

Follow: "From Shallow to Deep" tutorial

Build your own research agent. Customize:
• System prompt
• Tools
• Model

Understand each pillar in action.

4/7

---

STEP 4: Explore features (2-4 hours)

Pick your focus:

📋 Planning: todoListMiddleware docs
🤖 Subagents: createSubAgentMiddleware docs
💾 Backends: StateBackend vs StoreBackend
🔒 HITL: interruptOn configuration

5/7

---

STEP 5: Build your app (ongoing)

Start with a focused use case. Iterate.

Join the community:
• Discord: [link]
• GitHub Discussions: [link]
• Stack Overflow: [deepagentsjs] tag

We're here to help.

6/7

---

Resources:

📚 Docs: docs.langchain.com/oss/javascript/deepagents
💻 GitHub: github.com/langchain-ai/deepagentsjs
🧪 Examples: /examples directory
📹 Videos: [YouTube playlist]

Star ⭐ if this thread helped!

What will you build?

7/7
```

---

## Bonus Content Ideas

### Interactive Content
1. **Twitter Poll**: "What's the biggest challenge building AI agents?" (Context management / Planning / Tool reliability / Trust/Safety)
2. **AMA Thread**: "Building the DeepAgentsJS team—AMA about deep agents"
3. **Code Challenge**: "Build a creative agent and tag us—best one gets featured"

### Collaboration Content
1. **Guest Posts**: Invite prominent devs to write about their deep agent builds
2. **Podcast Appearances**: Pitch to AI/dev podcasts
3. **Conference Talks**: Submit to JSConf, Node Congress, AI Engineer Summit

### Long-form Content
1. **Whitepaper**: "The Deep Agent Architecture: Lessons from Claude Code, Manus, and Deep Research"
2. **Case Studies**: Partner with early adopters for production case studies
3. **Video Series**: "Building [X] with DeepAgentsJS" (5-part series)

---

## Success Metrics

### Awareness Metrics
| Metric | Current | Week 1 Target | Week 2 Target |
|--------|---------|---------------|---------------|
| GitHub Stars | 596 | 750 | 1,000 |
| npm Weekly Downloads | TBD | +50% | +100% |
| Twitter Impressions | - | 50K | 100K |
| Blog Page Views | - | 5K | 10K |

### Engagement Metrics
- Thread engagement rate > 3%
- Blog average time on page > 3 min
- GitHub issues/discussions created (organic interest)
- Community-built projects tagged

### Conversion Metrics
- npm install commands tracked
- GitHub clones/forks
- Tutorial completion rate (if trackable)

---

## Content Production Checklist

### For Each Twitter Thread
- [ ] Draft thread in document
- [ ] Create any needed graphics/screenshots
- [ ] Schedule optimal time (9am PT weekdays, varies weekends)
- [ ] Prepare replies for common questions
- [ ] Cross-post to LinkedIn (adapted)

### For Each Blog Post
- [ ] Outline + draft
- [ ] Code examples tested and working
- [ ] Screenshots/diagrams created
- [ ] SEO optimization (title, meta, headers)
- [ ] Cross-promotion plan

### For Video Content
- [ ] Script written
- [ ] Screen recording setup
- [ ] Edit and add captions
- [ ] Thumbnail created
- [ ] Description with links

---

## Key Messages to Reinforce

1. **"Deep agents, not shallow ones"** - The architectural difference that matters
2. **"Model-agnostic for production"** - Not locked into any vendor
3. **"Built on LangGraph"** - Enterprise-ready foundation
4. **"The 4 pillars"** - Planning, Subagents, Filesystem, Prompts
5. **"TypeScript-first"** - Full type safety for JS developers

---

## Appendix: Competitive Positioning Summary

| Question | DeepAgentsJS Answer |
|----------|---------------------|
| "Why not just use Claude?" | Model flexibility, customization, LangGraph ecosystem |
| "How is this different from LangChain agents?" | Deep architecture patterns, not just tool calling |
| "Why TypeScript?" | JS ecosystem dominant for web, full type safety, better DX |
| "Is this production ready?" | Built on LangGraph (used in production by enterprises) |
| "What about OpenAI's SDK?" | Different philosophy (handoffs vs subagents), less context engineering |

---

*Campaign prepared: January 29, 2026*
*Review date: February 12, 2026*
