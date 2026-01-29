# Blog Post: From Shallow to Deep - Building Your First Deep Agent
**Target Platform**: Dev.to / LangChain Blog  
**Publish Date**: January 30, 2026  
**Length**: ~2500 words  
**Goal**: Hands-on tutorial driving npm installs

---

## Title Options
1. "From Shallow to Deep: Building Your First Deep Agent in TypeScript"
2. "Why Your ReAct Agent Fails on Complex Tasks (And How to Fix It)"
3. "The 4 Pillars of Deep Agents: A Hands-On Tutorial"

---

## Meta Description (155 chars)
Learn to build AI agents that plan, delegate, and manage context like senior engineers. Hands-on tutorial with DeepAgentsJS for TypeScript developers.

---

## Outline

### Introduction (300 words)

**Hook**: "Your ReAct agent works great on simple tasks. But ask it something complex—research a topic, analyze a codebase, write a report—and it falls apart. Why?"

**The Problem**:
- Tool-calling loops are "shallow" - reactive, not proactive
- No planning = agent doesn't break down complex tasks
- No context management = token overflow on long tasks
- No delegation = can't go deep without polluting context

**The Solution**:
- Deep agents implement patterns from Claude Code, Manus, Deep Research
- Four pillars: Planning, Subagents, Filesystem, Prompts
- DeepAgentsJS makes these patterns accessible

**What We'll Build**:
- A research agent that can handle complex, multi-step research tasks
- By the end: understand deep agent architecture + have working code

---

### Section 1: Understanding Deep vs Shallow Agents (400 words)

**Diagram**: Simple tool-calling loop vs deep agent architecture

**Shallow Agent Pattern**:
```
User Query → LLM → Tool Call → Result → LLM → Tool Call → Result → ... → Output
```

Problems:
- No upfront planning
- Context accumulates linearly
- Can't isolate subtasks
- Fails on complex queries

**Deep Agent Pattern**:
```
User Query 
    → Planning Phase (write_todos)
    → Execution Phase
        → Subagent for subtask 1 (isolated context)
        → Subagent for subtask 2 (isolated context)
        → Write intermediate results to files
    → Synthesis Phase
    → Output
```

Benefits:
- Breaks down tasks before acting
- Isolated contexts for deep dives
- Manages context via filesystem
- Adapts plan based on discoveries

---

### Section 2: Setting Up (200 words)

```bash
mkdir deep-research-agent
cd deep-research-agent
npm init -y
npm install deepagents @langchain/anthropic zod
# For web search capability:
npm install @langchain/tavily
```

**Environment**:
```bash
export ANTHROPIC_API_KEY=your_key_here
export TAVILY_API_KEY=your_key_here  # Get free at tavily.com
```

**Create index.ts**:
```typescript
// We'll build this up step by step
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({});

console.log("Deep agent created!");
```

---

### Section 3: Adding Web Search (300 words)

**The Tool**:
```typescript
import { tool } from "langchain";
import { TavilySearch } from "@langchain/tavily";
import { z } from "zod";

const webSearch = tool(
  async ({ query, maxResults = 5 }: { query: string; maxResults?: number }) => {
    const tavily = new TavilySearch({
      maxResults,
      tavilyApiKey: process.env.TAVILY_API_KEY,
    });
    return await tavily._call({ query });
  },
  {
    name: "web_search",
    description: "Search the web for current information on any topic",
    schema: z.object({
      query: z.string().describe("The search query"),
      maxResults: z.number().optional().default(5).describe("Max results"),
    }),
  }
);
```

**Explanation**:
- Using LangChain's tool() helper for type-safe tool definition
- Zod schema provides validation and documentation
- Tavily is a search API optimized for AI agents

---

### Section 4: Creating the Research Agent (400 words)

**The System Prompt**:
```typescript
const researchPrompt = `You are an expert researcher with deep expertise in technology analysis.

## Your Approach

For any research task:
1. First, use write_todos to create a research plan
2. Execute searches systematically, updating your plan as you learn
3. Write detailed findings to files when results are long
4. Synthesize everything into a final report

## Output Format

Your final deliverable should include:
- Executive Summary (2-3 sentences)
- Key Findings (bullet points)
- Detailed Analysis (with headers)
- Sources (list all sources consulted)

## Context Management

When search results exceed ~2000 tokens, summarize key points and use write_file to save the full content. Reference the file path in your reasoning.
`;
```

**The Agent**:
```typescript
import { createDeepAgent } from "deepagents";

const agent = createDeepAgent({
  tools: [webSearch],
  systemPrompt: researchPrompt,
});
```

**What's Happening**:
- `createDeepAgent` automatically includes:
  - `write_todos` tool for planning
  - Filesystem tools (ls, read_file, write_file, etc.)
  - The ability to spawn subagents
- Our custom prompt teaches the agent HOW to use these tools

---

### Section 5: Running the Agent (300 words)

**Basic Invocation**:
```typescript
const result = await agent.invoke({
  messages: [{
    role: "user",
    content: "Research the current state of AI agent frameworks. Compare LangChain, CrewAI, AutoGPT, and any other major players. Focus on their architectures and use cases."
  }],
});

console.log(result.messages.at(-1)?.content);
```

**Streaming (Recommended)**:
```typescript
for await (const event of agent.stream({
  messages: [{
    role: "user",
    content: "Research the current state of AI agent frameworks..."
  }],
})) {
  // See the agent think, plan, and act in real-time
  if (event.type === "tool_call") {
    console.log(`🔧 Tool: ${event.name}`);
  } else if (event.type === "todo_update") {
    console.log(`📋 Plan updated: ${event.todos.length} items`);
  } else if (event.type === "message") {
    console.log(`💬 ${event.content}`);
  }
}
```

**What You'll See**:
1. Agent creates a todo list with research plan
2. Executes searches, updating todos as it goes
3. Writes long findings to files
4. Checks off completed items
5. Synthesizes final report

---

### Section 6: Understanding the Magic (400 words)

**The Planning Phase**:
When you watch the stream, you'll see the agent use `write_todos`:
```
📋 Plan updated: 5 items
  1. [in_progress] Search for overview of AI agent frameworks
  2. [pending] Deep dive on LangChain architecture
  3. [pending] Deep dive on CrewAI approach
  4. [pending] Compare architectures and use cases
  5. [pending] Synthesize into final report
```

This is the `todoListMiddleware` in action. The agent:
- Plans BEFORE acting
- Updates as it learns
- Tracks progress visibly

**Context Management**:
When a search returns lots of results:
```
🔧 Tool: web_search
🔧 Tool: write_file → findings/langchain-overview.md
```

The agent:
- Summarizes key points for working memory
- Writes full content to a file
- References the file later if needed

**The Result**:
After execution, check your filesystem:
```
./
├── findings/
│   ├── langchain-overview.md
│   ├── crewai-overview.md
│   └── autogpt-overview.md
└── RESEARCH_REPORT.md
```

The agent created actual files! This is the `FilesystemMiddleware` at work.

---

### Section 7: Adding Subagents (300 words)

For deeper research, add specialized subagents:

```typescript
import { createDeepAgent, SubAgent } from "deepagents";

const deepDiveSubagent: SubAgent = {
  name: "deep-diver",
  description: "For in-depth analysis of a specific framework",
  systemPrompt: `You are a framework expert. 
    When analyzing a framework:
    1. Search for architecture documentation
    2. Search for real-world usage examples
    3. Search for criticisms and limitations
    4. Synthesize into a balanced analysis`,
  tools: [webSearch],
};

const agent = createDeepAgent({
  tools: [webSearch],
  subagents: [deepDiveSubagent],
  systemPrompt: researchPrompt,
});
```

Now the main agent can delegate:
```
💬 "I need detailed analysis of LangChain. Spawning deep-diver..."
🤖 Subagent: deep-diver started
   ... subagent does its work in isolated context ...
🤖 Subagent: deep-diver completed
💬 "Received analysis. Continuing with CrewAI..."
```

Benefits:
- Main agent context stays clean
- Subagent can go deep without pollution
- Different models possible per subagent

---

### Section 8: Going Further (200 words)

**Persistence**:
```typescript
import { createDeepAgent, StoreBackend } from "deepagents";
import { InMemoryStore } from "@langchain/langgraph-checkpoint";

const agent = createDeepAgent({
  backend: (config) => new StoreBackend(config),
  store: new InMemoryStore(),
  // Files persist across conversations!
});
```

**Human-in-the-Loop**:
```typescript
const agent = createDeepAgent({
  tools: [webSearch, sendEmail],
  interruptOn: {
    send_email: { allowedDecisions: ["approve", "edit", "reject"] },
  },
});
```

**Different Models**:
```typescript
import { ChatOpenAI } from "@langchain/openai";

const agent = createDeepAgent({
  model: new ChatOpenAI({ model: "gpt-5" }),
  // Everything else stays the same!
});
```

---

### Conclusion (150 words)

You've built a deep agent that:
- Plans before acting
- Manages context intelligently
- Can delegate to subagents
- Produces real file output

This is the same architecture powering Claude Code, Manus, and Deep Research. Now it's accessible for your projects.

**Next Steps**:
- Explore more examples: github.com/langchain-ai/deepagentsjs/examples
- Read the middleware docs: docs.langchain.com/deepagents/middleware
- Join the community: Discord link

**Star the repo** if this tutorial helped!

---

## SEO Keywords
- deep agents
- AI agent framework
- TypeScript AI agent
- LangChain agent
- Claude Code architecture
- ReAct agent alternative
- AI agent planning
- context management AI
