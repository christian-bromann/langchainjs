# Feature Spotlight: The Planning Tool
**Date**: February 1, 2026  
**Platform**: Twitter/X  
**Format**: Single tweet with code image  
**Attach**: Code image showing planning in action (see `/code-images/04-planning-tool.png`)

---

## Tweet (280 chars)
```
The write_todos tool is why deep agents handle complex tasks that break shallow ReAct loops.

Watch this: agent receives "research quantum computing" → automatically creates a plan → tracks each step → adapts when new info emerges.

Built into every DeepAgentsJS agent by default.

[img]
```

---

## Code Image

**File**: `/code-images/04-planning-tool.png`

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

## Alt Text
"Code showing DeepAgentsJS agent using write_todos tool to plan a research task. Shows todo list with statuses (in_progress, pending, completed) and how the agent adapts the plan during execution."
