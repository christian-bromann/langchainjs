# Code Snippet Tweet: Deep Research Agent in 30 Lines
**Date**: January 30, 2026  
**Platform**: Twitter/X  
**Format**: Single tweet with code image  
**Attach**: Code image (see `/code-images/02-research-agent-30-lines.png`)

---

## Tweet (279 chars)
```
Build a deep research agent in 30 lines of TypeScript. Not a toy demo - actual planning, web search, context management, and report generation.

This is what "deep" means: the agent breaks down tasks, tracks progress, and synthesizes findings like a senior researcher would.

[code img]
```

---

## Code Image

**File**: `/code-images/02-research-agent-30-lines.png`

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

## Alt Text for Image
"TypeScript code showing a deep research agent built with DeepAgentsJS in 30 lines. Includes web search tool definition and agent creation with custom system prompt for research workflows."
