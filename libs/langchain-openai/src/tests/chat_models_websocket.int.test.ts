/* eslint-disable @typescript-eslint/no-explicit-any, no-process-env */
import { it, expect, describe, afterEach } from "@jest/globals";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "../chat_models.js";

describe("ChatOpenAI WebSocket integration tests", () => {
  let model: ChatOpenAI;

  afterEach(() => {
    model?.closeWebSocket();
  });

  it("Can invoke via WebSocket", async () => {
    model = new ChatOpenAI({
      model: "gpt-4o-mini",
      maxTokens: 50,
      useWebSocket: true,
      useResponsesApi: true,
    });

    const response = await model.invoke([
      new HumanMessage("Say hello in one word."),
    ]);

    expect(response.content).toBeTruthy();
    expect(typeof response.content === "string").toBe(true);
  });

  it("Can stream via WebSocket", async () => {
    model = new ChatOpenAI({
      model: "gpt-4o-mini",
      maxTokens: 50,
      useWebSocket: true,
      useResponsesApi: true,
      streaming: true,
    });

    const stream = await model.stream([
      new HumanMessage("Count to 5."),
    ]);

    const chunks: string[] = [];
    for await (const chunk of stream) {
      if (typeof chunk.content === "string" && chunk.content) {
        chunks.push(chunk.content);
      }
    }

    expect(chunks.length).toBeGreaterThan(0);
    const fullResponse = chunks.join("");
    expect(fullResponse).toBeTruthy();
  });

  it("Can make multiple requests over the same WebSocket", async () => {
    model = new ChatOpenAI({
      model: "gpt-4o-mini",
      maxTokens: 20,
      useWebSocket: true,
      useResponsesApi: true,
    });

    const response1 = await model.invoke([
      new HumanMessage("Say 'first'."),
    ]);
    expect(response1.content).toBeTruthy();

    const response2 = await model.invoke([
      new HumanMessage("Say 'second'."),
    ]);
    expect(response2.content).toBeTruthy();
  });

  it("Can use tool calling via WebSocket", async () => {
    model = new ChatOpenAI({
      model: "gpt-4o-mini",
      maxTokens: 200,
      useWebSocket: true,
      useResponsesApi: true,
    });

    const modelWithTools = model.bindTools([
      {
        type: "function" as const,
        function: {
          name: "get_weather",
          description: "Get the weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string" },
            },
            required: ["location"],
          },
        },
      },
    ]);

    const response = await modelWithTools.invoke([
      new HumanMessage("What's the weather in San Francisco?"),
    ]);

    expect(response.tool_calls).toBeDefined();
    expect(response.tool_calls!.length).toBeGreaterThan(0);
    expect(response.tool_calls![0].name).toBe("get_weather");
  });
});
