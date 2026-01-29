# Thread: Sandbox Execution
**Date**: February 11, 2026  
**Platform**: Twitter/X  
**Format**: 5-tweet thread  
**Attach**: Code image for tweet 2 (see `/code-images/13-sandbox-impl.png`)

---

## Tweet 1 (278 chars)
```
🧵 Sometimes your AI agent needs to run code. But exec("rm -rf /") in production is nightmare fuel.

DeepAgentsJS supports sandboxed execution - run shell commands in isolated environments. Docker, gVisor, Firecracker, whatever isolation you trust.

Here's how to implement it safely 👇
```

## Tweet 2 (280 chars)
```
Extend BaseSandbox to create isolated execution environments:

[See code image]

Your sandbox class implements execute(). DeepAgentsJS automatically provides the agent with an execute tool. Commands run in your isolated environment. You control timeout, resource limits, everything.
```

## Tweet 3 (279 chars)
```
What you can build with sandboxed agents:

🧪 Code execution agents - run user-submitted code safely
🚀 CI/CD automation - deploy, test, build with agent oversight
🖥️ System administration - manage infrastructure via natural language
📊 Data pipelines - ETL with agent-generated scripts
```

## Tweet 4 (278 chars)
```
Built-in safety features:

✅ Timeout handling - commands can't run forever
✅ Output truncation - prevent memory exhaustion from huge outputs
✅ Exit code capture - know if commands succeeded or failed
✅ File upload/download - controlled file transfer in/out of sandbox
```

## Tweet 5 (275 chars)
```
The sandbox abstraction means you can swap isolation technologies:

• Docker for most use cases
• gVisor for stronger isolation
• Firecracker for cloud-native sandboxing
• E2B or Modal for managed sandboxes

Same agent code. Different isolation backend.

See examples/sandbox/ for implementations
```

---

## Code Image

**File**: `/code-images/13-sandbox-impl.png`

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

## Alt Text
"TypeScript code showing a Docker-based sandbox implementation extending BaseSandbox, with memory limits, CPU constraints, and network isolation. The sandbox is then passed to createDeepAgent which automatically provides an execute tool."
