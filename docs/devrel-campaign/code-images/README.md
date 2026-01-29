# Code Images for DeepAgentsJS Campaign

This directory contains code snippets that should be converted into images for Twitter attachments. Using images for code allows tweets to use all 280 characters for compelling copy.

## Image Creation Guidelines

1. **Theme**: Use a dark theme (e.g., One Dark Pro, GitHub Dark, Dracula)
2. **Font**: Use a coding font (JetBrains Mono, Fira Code, or SF Mono) at 14-16px
3. **Dimensions**: 1200x675px (Twitter's optimal image size) or 1200x800px for taller code
4. **Tool suggestions**: 
   - [Carbon](https://carbon.now.sh) - quick and beautiful
   - [Ray.so](https://ray.so) - modern look
   - [Snappify](https://snappify.com) - more control
   - Screenshot from VS Code with extensions

## Image List

| File | Tweet | Description |
|------|-------|-------------|
| `01-launch-basic-setup.png` | Launch Thread Tweet 6 | Basic DeepAgent setup with model swapping |
| `02-research-agent-30-lines.png` | Code Snippet Jan 30 | Complete research agent in 30 lines |
| `03-comparison-table.png` | Comparison Thread Tweet 4 | DeepAgentsJS vs Claude SDK table |
| `04-planning-tool.png` | Planning Tool Feb 1 | write_todos in action |
| `06-model-swap.png` | Model Agnostic Thread | Three agents with different models |
| `07-subagent-spawn.png` | Subagent Thread | Subagent definition and main agent |
| `08-middleware-compose.png` | Middleware Thread | Four middleware composition options |
| `09-handoffs-vs-subagents.png` | OpenAI Comparison | Diagram of patterns |
| `10-use-case-research.png` | Use Cases Thread | Research agent config |
| `10-use-case-codebase.png` | Use Cases Thread | Codebase analyst config |
| `10-use-case-pipeline.png` | Use Cases Thread | Pipeline builder config |
| `11-system-prompt.png` | Prompting Patterns | Full system prompt example |
| `12-hitl-config.png` | HITL Thread | interruptOn configuration |
| `13-sandbox-impl.png` | Sandbox Thread | Docker sandbox implementation |
| `14-learning-path.png` | Learning Path Thread | ASCII diagram of learning path |

---

## Code Snippets

### 01-launch-basic-setup.png

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

### 02-research-agent-30-lines.png

```typescript
import { createDeepAgent } from "deepagents";
import { TavilySearch } from "@langchain/tavily";
import { tool } from "langchain";
import { z } from "zod";

const webSearch = tool(
  async ({ query }: { query: string }) => {
    const tavily = new TavilySearch({ maxResults: 5 });
    return await tavily._call({ query });
  },
  {
    name: "web_search",
    description: "Search the web for information",
    schema: z.object({ query: z.string() }),
  }
);

const agent = createDeepAgent({
  tools: [webSearch],
  systemPrompt: `You are an expert researcher.
    1. Plan your research approach first
    2. Search multiple sources for each topic
    3. Write findings to files to manage context
    4. Synthesize into a comprehensive report`,
});

const result = await agent.invoke({
  messages: [{ 
    role: "user", 
    content: "Research the current state of AI agent frameworks" 
  }],
});

console.log(result.messages.at(-1)?.content);
```

---

### 03-comparison-table.png

Create a visual table:

| Aspect | DeepAgentsJS | Claude Agent SDK |
|--------|--------------|------------------|
| **Models** | Any (Claude, GPT, Llama...) | Claude only |
| **Architecture** | Native LangGraph graphs | CLI wrapper |
| **Language** | TypeScript-first | Python-first |
| **Planning** | Built-in write_todos | Claude's inherent |
| **Subagents** | task() tool | Session forking |
| **Filesystem** | 6+ tools | Via Claude Code |
| **Customization** | Middleware pattern | Hooks system |
| **Lock-in** | None | Anthropic |

---

### 04-planning-tool.png

```typescript
// Agent automatically uses write_todos for complex tasks

// User: "Research the competitive landscape of AI agent frameworks"

// Agent's internal planning (visible in stream):
await agent.invoke({
  tool: "write_todos",
  args: {
    todos: [
      { id: "1", content: "Search for major AI agent frameworks", status: "in_progress" },
      { id: "2", content: "Analyze Claude Agent SDK capabilities", status: "pending" },
      { id: "3", content: "Analyze OpenAI Agents SDK approach", status: "pending" },
      { id: "4", content: "Compare DeepAgentsJS differentiators", status: "pending" },
      { id: "5", content: "Synthesize findings into report", status: "pending" },
    ]
  }
});

// As agent works, todos update:
// ✅ Search for major AI agent frameworks
// 🔄 Analyze Claude Agent SDK capabilities  
// ⬚ Analyze OpenAI Agents SDK approach
// ⬚ Compare DeepAgentsJS differentiators
// ⬚ Synthesize findings into report

// Agent adapts plan when discovering new info:
// + Added: "Research LangGraph architecture" (discovered dependency)
```

---

### 06-model-swap.png

```typescript
import { createDeepAgent } from "deepagents";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";

// Production: Claude for complex reasoning
const prodAgent = createDeepAgent({
  model: new ChatAnthropic({ model: "claude-sonnet-4" }),
  tools: [webSearch, codeAnalysis],
});

// Cost optimization: GPT-4o-mini for simple tasks
const cheapAgent = createDeepAgent({
  model: new ChatOpenAI({ model: "gpt-4o-mini" }),
  tools: [webSearch, codeAnalysis],
});

// Compliance: Local Llama for sensitive data
const localAgent = createDeepAgent({
  model: new ChatOllama({ model: "llama3.1:70b" }),
  tools: [webSearch, codeAnalysis],
});

// Same agent logic, same tools - different model
// No code changes needed beyond the model parameter
```

---

### 07-subagent-spawn.png

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

### 08-middleware-compose.png

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

### 09-handoffs-vs-subagents.png

Create a diagram:

```
HANDOFFS (OpenAI Agents SDK)
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Agent A │ →  │ Agent B │ →  │ Agent C │ → Output
│ (done)  │    │ (done)  │    │ (active)│
└─────────┘    └─────────┘    └─────────┘
Control transfers completely. Sequential flow.

SUBAGENTS (DeepAgentsJS)
                    ┌───────────────┐
                    │   Subagent 1  │ → summary
                    │   (isolated)  │ ↘
┌─────────────┐     └───────────────┘   ┌─────────────┐
│ Main Agent  │ ─→                      │ Main Agent  │ → Output
│  (spawns)   │     ┌───────────────┐   │ (synthesize)│
└─────────────┘     │   Subagent 2  │ ↗ └─────────────┘
                    │   (isolated)  │ → summary
                    └───────────────┘
Main stays in control. Parallel possible. Context isolated.
```

---

### 10-use-case-research.png

```typescript
const researchAgent = createDeepAgent({
  model: "claude-sonnet-4",
  tools: [webSearch, academicSearch],
  subagents: [
    {
      name: "source-analyzer",
      description: "Deep analysis of individual sources",
      tools: [webScrape, summarize],
    },
  ],
  systemPrompt: `You are an expert researcher.
    
    For complex research tasks:
    1. Create a research plan with write_todos
    2. Search multiple sources for each topic
    3. Spawn source-analyzer for deep dives
    4. Write findings to files: findings/{topic}.md
    5. Synthesize into final report
    
    Manage your context by offloading to files.`,
});
```

---

### 10-use-case-codebase.png

```typescript
const codeAnalyst = createDeepAgent({
  model: "claude-sonnet-4",
  backend: new FilesystemBackend({ rootDir: "./target-repo" }),
  subagents: [
    { name: "security-reviewer", tools: [securityScan], ... },
    { name: "perf-analyzer", tools: [perfProfile], ... },
  ],
  systemPrompt: `You are a senior software architect.
    
    To analyze a codebase:
    1. Use ls and glob to understand structure
    2. Read key files (package.json, entry points)
    3. Spawn security-reviewer for vulnerability scan
    4. Spawn perf-analyzer for performance issues
    5. Write analysis to analysis/{component}.md
    6. Compile recommendations in RECOMMENDATIONS.md`,
});
```

---

### 10-use-case-pipeline.png

```typescript
const pipelineBuilder = createDeepAgent({
  model: "claude-sonnet-4",
  backend: new CompositeBackend({
    filesystem: new FilesystemBackend({ rootDir: "./pipelines" }),
    sandbox: new DockerSandbox(),
  }),
  systemPrompt: `You are a data engineer.
    
    To build a data pipeline:
    1. Analyze input data sources
    2. Design pipeline architecture  
    3. Write pipeline code to src/
    4. Write tests to tests/
    5. Execute tests in sandbox
    6. Fix any failures
    7. Write documentation to README.md`,
});
```

---

### 11-system-prompt.png

```typescript
const researchSystemPrompt = `You are an expert researcher with deep expertise in technology analysis.

## Your Tools

### write_todos
Use BEFORE starting any task with 3+ steps. Update AFTER learning new information.
This is critical for tracking progress and enabling recovery.

### web_search  
Search for information. For broad topics, search multiple specific queries rather than one vague one.

### write_file
When tool results exceed ~2000 tokens, summarize key points and write full content to files.
Path format: research/{topic-slug}.md

### task (subagents)
Spawn a subagent when:
- Deep dive needed (3+ searches on one subtopic)
- Specialized analysis required
- Context isolation would help

## Output Format

Your final deliverable must include:
1. Executive Summary (2-3 sentences)
2. Key Findings (bullet points, max 10)  
3. Detailed Analysis (with headers)
4. Recommendations (numbered, actionable)

## Error Handling

If any tool fails:
1. Note the failure in your todos
2. Try alternative approach if available
3. Continue with other tasks
4. Flag clearly in final output

Never fail silently. Transparency > perfection.`;
```

---

### 12-hitl-config.png

```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  model: "claude-sonnet-4",
  tools: [
    readDatabase,
    writeDatabase,    // Sensitive
    sendEmail,        // Sensitive  
    deleteRecords,    // Very sensitive
    deployCode,       // Very sensitive
  ],
  
  // Gate sensitive operations for human review
  interruptOn: {
    write_database: {
      allowedDecisions: ["approve", "edit", "reject"],
    },
    send_email: {
      allowedDecisions: ["approve", "edit", "reject"],
    },
    delete_records: {
      allowedDecisions: ["approve", "reject"], // No edit - too risky
    },
    deploy_code: {
      allowedDecisions: ["approve", "reject"],
    },
  },
});

// When agent tries to call delete_records:
// 1. Execution pauses
// 2. You see: "Agent wants to delete records where user_id = 123"
// 3. You approve or reject
// 4. Agent continues or adapts
```

---

### 13-sandbox-impl.png

```typescript
import { createDeepAgent, BaseSandbox, ExecuteResponse } from "deepagents";
import Docker from "dockerode";

class DockerSandbox extends BaseSandbox {
  readonly id = "docker-sandbox";
  private docker = new Docker();

  async execute(command: string): Promise<ExecuteResponse> {
    const container = await this.docker.createContainer({
      Image: "node:20-alpine",
      Cmd: ["sh", "-c", command],
      HostConfig: {
        Memory: 512 * 1024 * 1024, // 512MB limit
        CpuPeriod: 100000,
        CpuQuota: 50000, // 50% CPU
        NetworkMode: "none", // No network access
      },
    });

    await container.start();
    const output = await container.logs({ stdout: true, stderr: true });
    const { StatusCode } = await container.wait();
    await container.remove();

    return {
      output: output.toString(),
      exitCode: StatusCode,
      truncated: output.length > 10000,
    };
  }
}

// Agent gets 'execute' tool automatically
const agent = createDeepAgent({
  backend: new DockerSandbox(),
  systemPrompt: "You can run shell commands safely using execute.",
});
```

---

### 14-learning-path.png

Create a visual flowchart:

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
