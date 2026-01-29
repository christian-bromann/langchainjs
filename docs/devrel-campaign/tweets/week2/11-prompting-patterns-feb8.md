# Thread: 7 Prompting Patterns for Deep Agents
**Date**: February 8, 2026  
**Platform**: Twitter/X  
**Format**: 9-tweet thread  
**Attach**: Code image showing full system prompt example (see `/code-images/11-system-prompt.png`)

---

## Tweet 1 (278 chars)
```
🧵 The system prompt is your agent's operating manual - not just "you are a helpful assistant."

After building dozens of deep agents, here are 7 prompting patterns that consistently improve performance. Save this thread if you're building AI agents.

Patterns that actually work 👇
```

## Tweet 2 (280 chars)
```
1️⃣ TOOL USAGE GUIDANCE

Don't just list tools. Explain WHEN to use each one.

❌ "You have access to write_todos"
✅ "Use write_todos BEFORE starting complex tasks with 3+ steps. Update it AFTER learning new information. This helps track progress and enables recovery."

Decision framework > docs
```

## Tweet 3 (279 chars)
```
2️⃣ OUTPUT FORMAT SPECIFICATION

Be explicit about the final deliverable format:

"Your final output must be a markdown report with:
- Executive summary (2-3 sentences max)
- Key findings (bullet points, max 10)
- Detailed analysis (use headers)
- Actionable recommendations (numbered)"
```

## Tweet 4 (280 chars)
```
3️⃣ CONTEXT MANAGEMENT RULES

Teach your agent when to offload context to files:

"When any tool returns more than ~2000 tokens, summarize the key points for your working memory and write_file the full content to data/{topic}.md. Reference the file path in your reasoning."

Prevents overflow.
```

## Tweet 5 (278 chars)
```
4️⃣ SUBAGENT DELEGATION CRITERIA

Guide when to spawn vs handle directly:

"Spawn a subagent when:
• A subtask requires 3+ tool calls
• Deep domain expertise is needed (security, performance)
• The subtask's context would pollute your main reasoning
• Parallel work is possible"
```

## Tweet 6 (280 chars)
```
5️⃣ ERROR HANDLING BEHAVIOR

Define how to recover from failures:

"If a tool fails: 
1. Try an alternative approach if available
2. Document what failed in your todos
3. Continue with remaining tasks
4. Flag the failure clearly in final output

Never silently swallow errors."
```

## Tweet 7 (277 chars)
```
6️⃣ PROGRESS TRANSPARENCY

Require visible progress tracking:

"Update your todo list after EVERY significant action. Mark items complete immediately - not at the end. Add new todos when you discover additional work. This enables progress monitoring and recovery."
```

## Tweet 8 (279 chars)
```
7️⃣ DOMAIN EXPERTISE FRAMING

Set the expertise level explicitly:

"You are a senior software architect with 15+ years of experience. You've led migrations at Fortune 500 companies. You've seen patterns succeed and fail. Bring that experience to your analysis."

Primes better reasoning.
```

## Tweet 9 (272 chars)
```
These patterns are embedded in DeepAgentsJS's default system prompt. Customize them for your use case:

[See full example in code image]

const agent = createDeepAgent({
  systemPrompt: customPrompt,
});

Full prompting guide: docs.langchain.com/deepagents/prompting
```

---

## Code Image

**File**: `/code-images/11-system-prompt.png`

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

## Alt Text
"TypeScript code showing a comprehensive system prompt for a research agent, including sections for tool usage guidance, output format specification, subagent delegation criteria, and error handling behavior."
