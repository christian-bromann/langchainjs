# Thread: Human-in-the-Loop for Trustworthy Agents
**Date**: February 10, 2026  
**Platform**: Twitter/X  
**Format**: 6-tweet thread  
**Attach**: Code image for tweet 2 (see `/code-images/12-hitl-config.png`)

---

## Tweet 1 (280 chars)
```
🧵 "AI agents sound great but I can't let them run unsupervised on production systems"

Valid concern. Autonomous doesn't mean uncontrolled.

DeepAgentsJS has built-in human-in-the-loop support. Gate sensitive operations. Review before execution. Build trust incrementally.

Here's how 👇
```

## Tweet 2 (276 chars)
```
The interruptOn config lets you require human approval for specific tools:

[See code image]

When the agent tries to use a gated tool, execution pauses. You review the proposed action. You approve, edit, or reject. Agent continues or adapts.

Built on LangGraph's interrupt primitives.
```

## Tweet 3 (280 chars)
```
Decision options give you flexibility:

✅ APPROVE - Execute exactly as proposed
✏️ EDIT - Modify the parameters, then execute  
❌ REJECT - Don't execute, agent adapts its approach

The "edit" option is powerful - fix a typo in a generated email without rejecting the whole action.
```

## Tweet 4 (279 chars)
```
Practical deployment patterns:

DEV: interruptOn = {} 
→ Full autonomy, move fast

STAGING: interruptOn = { delete_*, external_api_* }
→ Gate destructive/external ops

PRODUCTION: interruptOn = { all_write_operations }
→ Maximum safety, review everything

Dial trust up as confidence grows.
```

## Tweet 5 (280 chars)
```
This isn't just about safety - it's about building trust incrementally:

Week 1: Review every action, learn agent's patterns
Week 2: Gate only external calls
Week 3: Gate only destructive ops  
Week 4: Full autonomy for tested workflows

Human-in-the-loop is a feature, not a limitation.
```

## Tweet 6 (272 chars)
```
Trustworthy AI agents = autonomy where earned, oversight where needed.

DeepAgentsJS makes this a config option, not an architecture rewrite:

const agent = createDeepAgent({
  interruptOn: { sensitive_tool: { allowedDecisions: ["approve", "reject"] } }
});

Docs in reply 👇
```

---

## Code Image

**File**: `/code-images/12-hitl-config.png`

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

## Alt Text
"TypeScript code showing DeepAgentsJS agent configuration with interruptOn settings that require human approval for sensitive operations like database writes, email sending, record deletion, and code deployment."
