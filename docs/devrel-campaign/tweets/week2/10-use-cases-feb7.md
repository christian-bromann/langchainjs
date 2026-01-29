# Thread: 5 Real-World Applications
**Date**: February 7, 2026  
**Platform**: Twitter/X  
**Format**: 7-tweet thread  
**Attach**: Code snippets for each use case (see `/code-images/10-use-case-*.png`)

---

## Tweet 1 (277 chars)
```
🧵 5 production-ready applications you can build with DeepAgentsJS today.

These aren't toy demos - they're patterns teams are using in real products. Each leverages the deep agent architecture: planning, subagents, filesystem, and prompts.

Let's go through them with code 👇
```

## Tweet 2 (279 chars)
```
1️⃣ DEEP RESEARCH AGENT

Input: "Analyze the competitive landscape for AI code assistants"

The agent plans research steps, searches multiple sources with subagents, writes findings to files to manage context, and synthesizes a comprehensive report.

[See code image 1]

examples/research/
```

## Tweet 3 (278 chars)
```
2️⃣ CODEBASE ANALYST

Input: "Review this repo and suggest architectural improvements"

Uses filesystem tools to explore actual code. Creates analysis plan. Spawns subagents for security review, performance analysis, and pattern detection. Compiles actionable recommendations.

[code img 2]
```

## Tweet 4 (280 chars)
```
3️⃣ DOCUMENT PROCESSOR

Input: "Process these 500 invoices and extract structured data"

Breaks work into batches via planning. Uses subagents for parallel processing. Writes intermediate results to files. Handles failures gracefully without losing progress. Aggregates final structured output.
```

## Tweet 5 (276 chars)
```
4️⃣ CUSTOMER SUPPORT AGENT

Input: Complex multi-step support tickets

Plans resolution approach. Spawns subagent to search knowledge base. Another to check order status. Another to draft response. Main agent synthesizes. Human-in-the-loop for sensitive actions via interruptOn.
```

## Tweet 6 (280 chars)
```
5️⃣ DATA PIPELINE BUILDER

Input: "Create an ETL pipeline for our sales data"

Analyzes data sources with subagent. Designs pipeline architecture. Writes actual code to filesystem. Tests in sandbox environment. Documents everything. Full code generation with real file output.

[code img 3]
```

## Tweet 7 (280 chars)
```
All these patterns work because DeepAgentsJS implements the 4 pillars:

✅ Planning (write_todos) for complex task breakdown
✅ Subagents for depth without context pollution
✅ Filesystem for context management and real output
✅ Prompts that teach the agent how to use these tools

What will you build?
```

---

## Code Image 1: Research Agent

**File**: `/code-images/10-use-case-research.png`

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

## Code Image 2: Codebase Analyst

**File**: `/code-images/10-use-case-codebase.png`

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

## Code Image 3: Pipeline Builder

**File**: `/code-images/10-use-case-pipeline.png`

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

## Alt Text
"TypeScript code examples showing three production use cases: research agent with source analysis subagent, codebase analyst with filesystem access and security/performance subagents, and pipeline builder with sandbox execution."
