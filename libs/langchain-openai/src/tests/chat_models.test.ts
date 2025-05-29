/* eslint-disable @typescript-eslint/no-explicit-any, no-process-env */
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { it, expect, describe, beforeAll, afterAll, jest } from "@jest/globals";
import { ChatOpenAI, jsonSchemaToZod } from "../chat_models.js";

describe("strict tool calling", () => {
  const weatherTool = {
    type: "function" as const,
    function: {
      name: "get_current_weather",
      description: "Get the current weather in a location",
      parameters: zodToJsonSchema(
        z.object({
          location: z.string().describe("The location to get the weather for"),
        })
      ),
    },
  };

  // Store the original value of LANGCHAIN_TRACING_V2
  let oldLangChainTracingValue: string | undefined;
  // Before all tests, save the current LANGCHAIN_TRACING_V2 value
  beforeAll(() => {
    oldLangChainTracingValue = process.env.LANGCHAIN_TRACING_V2;
  });
  // After all tests, restore the original LANGCHAIN_TRACING_V2 value
  afterAll(() => {
    if (oldLangChainTracingValue !== undefined) {
      process.env.LANGCHAIN_TRACING_V2 = oldLangChainTracingValue;
    } else {
      // If it was undefined, remove the environment variable
      delete process.env.LANGCHAIN_TRACING_V2;
    }
  });

  it("Can accept strict as a call arg via .bindTools", async () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation((url, options) => {
      // Store the request details for later inspection
      mockFetch.mock.calls.push([url, options]);

      // Return a mock response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    const modelWithTools = model.bindTools([weatherTool], { strict: true });

    // This will fail since we're not returning a valid response in our mocked fetch function.
    await expect(
      modelWithTools.invoke("What's the weather like?")
    ).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    if (options && options.body) {
      expect(JSON.parse(options.body).tools[0].function).toHaveProperty(
        "strict",
        true
      );
    } else {
      throw new Error("Body not found in request.");
    }
  });

  it("Can accept strict as a call arg via .withConfig", async () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation((url, options) => {
      // Store the request details for later inspection
      mockFetch.mock.calls.push([url, options]);

      // Return a mock response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    const modelWithTools = model.withConfig({
      tools: [weatherTool],
      strict: true,
    });

    // This will fail since we're not returning a valid response in our mocked fetch function.
    await expect(
      modelWithTools.invoke("What's the weather like?")
    ).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    if (options && options.body) {
      expect(JSON.parse(options.body).tools[0].function).toHaveProperty(
        "strict",
        true
      );
    } else {
      throw new Error("Body not found in request.");
    }
  });

  it("Strict is false if supportsStrictToolCalling is false", async () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation((url, options) => {
      // Store the request details for later inspection
      mockFetch.mock.calls.push([url, options]);

      // Return a mock response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
      supportsStrictToolCalling: false,
    });

    // Do NOT pass `strict` here since we're checking that it's set to true by default
    const modelWithTools = model.bindTools([weatherTool]);

    // This will fail since we're not returning a valid response in our mocked fetch function.
    await expect(
      modelWithTools.invoke("What's the weather like?")
    ).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    if (options && options.body) {
      expect(JSON.parse(options.body).tools[0].function).toHaveProperty(
        "strict",
        false
      );
    } else {
      throw new Error("Body not found in request.");
    }
  });

  it("Strict is set to true if passed in .withStructuredOutput", async () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation((url, options) => {
      // Store the request details for later inspection
      mockFetch.mock.calls.push([url, options]);

      // Return a mock response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    const model = new ChatOpenAI({
      model: "doesnt-start-with-gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
      supportsStrictToolCalling: true,
    });

    const modelWithTools = model.withStructuredOutput(
      z.object({
        location: z.string().describe("The location to get the weather for"),
      }),
      {
        strict: true,
        method: "functionCalling",
      }
    );

    // This will fail since we're not returning a valid response in our mocked fetch function.
    await expect(
      modelWithTools.invoke("What's the weather like?")
    ).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    if (options && options.body) {
      const body = JSON.parse(options.body);
      expect(body.tools[0].function).toHaveProperty("strict", true);
    } else {
      throw new Error("Body not found in request.");
    }
  });

  it("Strict is NOT passed to OpenAI if NOT passed in .withStructuredOutput", async () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation((url, options) => {
      // Store the request details for later inspection
      mockFetch.mock.calls.push([url, options]);

      // Return a mock response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    });

    const model = new ChatOpenAI({
      model: "doesnt-start-with-gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    const modelWithTools = model.withStructuredOutput(
      z.object({
        location: z.string().describe("The location to get the weather for"),
      }),
      { method: "functionCalling" }
    );

    // This will fail since we're not returning a valid response in our mocked fetch function.
    await expect(
      modelWithTools.invoke("What's the weather like?")
    ).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    if (options && options.body) {
      const body = JSON.parse(options.body);
      expect(body.tools[0].function).not.toHaveProperty("strict");
    } else {
      throw new Error("Body not found in request.");
    }
  });
});

test("Test OpenAI serialization doesn't pass along extra params", async () => {
  const chat = new ChatOpenAI({
    apiKey: "test-key",
    model: "o3-mini",
    somethingUnexpected: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
  expect(JSON.stringify(chat)).toEqual(
    `{"lc":1,"type":"constructor","id":["langchain","chat_models","openai","ChatOpenAI"],"kwargs":{"openai_api_key":{"lc":1,"type":"secret","id":["OPENAI_API_KEY"]},"model":"o3-mini"}}`
  );
});

describe("JSON Schema to Zod conversion for MCP tools", () => {
  const createMockFetch = () => {
    const mockFetch = jest.fn<(url: any, options?: any) => Promise<any>>();
    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: new Headers({
          "content-type": "application/json",
        }),
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  role: "assistant",
                  content: "Test response",
                  tool_calls: [],
                },
                finish_reason: "stop",
              },
            ],
            usage: {
              prompt_tokens: 10,
              completion_tokens: 5,
              total_tokens: 15,
            },
          }),
      })
    );
    return mockFetch;
  };

  it("handles tools with JSON schemas by validating them and maintaining strict mode", async () => {
    const mockFetch = createMockFetch();

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    // Create a mock MCP tool with valid JSON schema (not Zod)
    const mcpTool = {
      type: "function" as const,
      name: "get_weather",
      description: "Get weather information",
      schema: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The location to get weather for",
          },
          units: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "Temperature units",
          },
        },
        required: ["location"],
      },
    };

    const modelWithTools = model.bindTools([mcpTool], { strict: true });

    await modelWithTools.invoke("What's the weather like?");

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    // Should validate JSON schema and maintain strict mode for valid schemas
    expect(body.tools[0].function).toHaveProperty("strict", true);
    // Verify the tool parameters are properly converted
    expect(body.tools[0].function.name).toBe("get_weather");
    expect(body.tools[0].function.description).toBe("Get weather information");
  });

  it("handles tools with Zod schemas normally with strict mode", async () => {
    const mockFetch = createMockFetch();

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    // Create a tool with Zod schema
    const zodTool = {
      type: "function" as const,
      name: "get_weather_zod",
      description: "Get weather information with Zod",
      schema: z.object({
        location: z.string().describe("The location"),
        units: z.enum(["celsius", "fahrenheit"]).describe("Temperature units"),
      }),
    };

    const modelWithTools = model.bindTools([zodTool], { strict: true });
    await modelWithTools.invoke("What's the weather like?");

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    // Should maintain strict mode for Zod schema tools
    expect(body.tools[0].function).toHaveProperty("strict", true);
    expect(body.tools[0].function.name).toBe("get_weather_zod");
  });

  it("handles malformed JSON schemas gracefully", async () => {
    const mockFetch = createMockFetch();

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    // Create a tool with malformed JSON schema that should cause validation to fail
    const malformedTool = {
      type: "function" as const,
      name: "malformed_tool",
      description: "Tool with malformed schema",
      schema: {
        type: "object",
        properties: {
          invalid_prop: {
            type: "unknown_type", // This should cause validation to fail
          },
          circular_ref: {
            type: "object",
            // This creates a complex scenario that might fail validation
            properties: {},
          },
        },
      },
    };

    const modelWithTools = model.bindTools([malformedTool], { strict: true });
    await modelWithTools.invoke("Test malformed tool");

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];
    const body = JSON.parse(options.body);
    // Should fall back to non-strict mode for malformed schemas
    expect(body.tools[0].function).toHaveProperty("strict", false);
    expect(body.tools[0].function.name).toBe("malformed_tool");
    // Verify the tool is still included in the request despite validation failure
    expect(body.tools).toHaveLength(1);

    // Verify that the malformed tool still has its original schema structure preserved
    // even though validation failed
    expect(body.tools[0]).toHaveProperty("type", "function");
    expect(body.tools[0].function).toHaveProperty(
      "description",
      "Tool with malformed schema"
    );
  });

  it("processes JSON schemas without strict mode when strict is false", async () => {
    const mockFetch = createMockFetch();

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    const jsonSchemaTool = {
      type: "function" as const,
      name: "json_tool",
      description: "Tool with JSON schema",
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name parameter",
          },
        },
        required: ["name"],
      },
    };

    const modelWithTools = model.bindTools([jsonSchemaTool], { strict: false });
    await modelWithTools.invoke("Test non-strict mode");

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    const body = JSON.parse(options.body);
    // Should use non-strict mode as requested
    expect(body.tools[0].function).toHaveProperty("strict", false);
    expect(body.tools[0].function.name).toBe("json_tool");

    // Verify that when strict is false, the tool is processed without attempting validation
    // The schema should be preserved and the tool should still be functional
    expect(body.tools[0].function).toHaveProperty(
      "description",
      "Tool with JSON schema"
    );
    expect(body.tools[0].function.parameters).toBeDefined();
  });

  it("handles mixed tool types correctly", async () => {
    const mockFetch = createMockFetch();

    const model = new ChatOpenAI({
      model: "gpt-4",
      apiKey: "test-key",
      configuration: {
        fetch: mockFetch,
      },
      maxRetries: 0,
    });

    // Mix of valid JSON schema, Zod schema, and malformed JSON schema
    const tools = [
      {
        type: "function" as const,
        name: "valid_json_tool",
        description: "Valid JSON schema tool",
        schema: {
          type: "object",
          properties: {
            input: { type: "string" },
          },
          required: ["input"],
        },
      },
      {
        type: "function" as const,
        name: "zod_tool",
        description: "Zod schema tool",
        schema: z.object({
          value: z.number(),
        }),
      },
      {
        type: "function" as const,
        name: "invalid_json_tool",
        description: "Invalid JSON schema tool",
        schema: {
          type: "object",
          properties: {
            bad_prop: { type: "invalid_type" },
          },
        },
      },
    ];

    const modelWithTools = model.bindTools(tools, { strict: true });

    await modelWithTools.invoke("Test mixed tools");

    expect(mockFetch).toHaveBeenCalled();
    const [_url, options] = mockFetch.mock.calls[0];

    const body = JSON.parse(options.body);
    expect(body.tools).toHaveLength(3);

    // Valid JSON schema tool should maintain strict mode
    const validJsonTool = body.tools.find(
      (t: any) => t.function.name === "valid_json_tool"
    );
    expect(validJsonTool?.function.strict).toBe(true);

    // Zod tool should maintain strict mode
    const zodTool = body.tools.find((t: any) => t.function.name === "zod_tool");
    expect(zodTool?.function.strict).toBe(true);

    // Invalid JSON schema tool should fall back to non-strict mode
    const invalidJsonTool = body.tools.find(
      (t: any) => t.function.name === "invalid_json_tool"
    );
    expect(invalidJsonTool?.function.strict).toBe(false);
  });
});

describe("jsonSchemaToZod utility function", () => {
  it("converts basic object schemas correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "User name",
        },
        age: {
          type: "number",
          minimum: 0,
          maximum: 150,
        },
        active: {
          type: "boolean",
        },
      },
      required: ["name"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test valid data
    const validData = { name: "John", age: 25, active: true };
    expect(() => zodSchema.parse(validData)).not.toThrow();

    // Test missing required field
    expect(() => zodSchema.parse({ age: 25 })).toThrow();

    // Test invalid types
    expect(() => zodSchema.parse({ name: 123 })).toThrow();
  });

  it("handles string patterns correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        email: {
          type: "string",
          pattern: "^[^@]+@[^@]+\\.[^@]+$",
          description: "Email address",
        },
      },
      required: ["email"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test valid email
    expect(() => zodSchema.parse({ email: "test@example.com" })).not.toThrow();

    // Test invalid email
    expect(() => zodSchema.parse({ email: "invalid-email" })).toThrow();
  });

  it("handles number constraints correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        count: {
          type: "integer",
          minimum: 1,
          maximum: 100,
        },
        rating: {
          type: "number",
          minimum: 0.0,
        },
      },
      required: ["count"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test valid data
    expect(() => zodSchema.parse({ count: 50, rating: 4.5 })).not.toThrow();

    // Test minimum constraint
    expect(() => zodSchema.parse({ count: 0 })).toThrow();

    // Test maximum constraint
    expect(() => zodSchema.parse({ count: 101 })).toThrow();
  });

  it("handles array schemas correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["tags"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test valid array
    expect(() => zodSchema.parse({ tags: ["tag1", "tag2"] })).not.toThrow();

    // Test invalid array items
    expect(() => zodSchema.parse({ tags: [1, 2, 3] })).toThrow();
  });

  it("handles nested object schemas correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            age: {
              type: "number",
            },
          },
          required: ["name"],
        },
      },
      required: ["user"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test valid nested object
    expect(() =>
      zodSchema.parse({ user: { name: "John", age: 25 } })
    ).not.toThrow();

    // Test missing required nested field
    expect(() => zodSchema.parse({ user: { age: 25 } })).toThrow();
  });

  it("handles optional properties correctly", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        required_field: {
          type: "string",
        },
        optional_field: {
          type: "string",
        },
      },
      required: ["required_field"],
    };

    const zodSchema = jsonSchemaToZod(jsonSchema);

    // Test with only required field
    expect(() => zodSchema.parse({ required_field: "test" })).not.toThrow();

    // Test with both fields
    expect(() =>
      zodSchema.parse({
        required_field: "test",
        optional_field: "optional",
      })
    ).not.toThrow();

    // Test missing required field
    expect(() => zodSchema.parse({ optional_field: "optional" })).toThrow();
  });

  it("throws error for unsupported schema types", () => {
    const unsupportedSchema = {
      type: "null", // Null type is not supported at root level
    };

    expect(() => jsonSchemaToZod(unsupportedSchema)).toThrow(
      "Unsupported root schema type"
    );
  });

  it("throws error for unsupported property types", () => {
    const jsonSchema = {
      type: "object",
      properties: {
        unknown_field: {
          type: "unknown_type",
        },
      },
    };

    expect(() => jsonSchemaToZod(jsonSchema)).toThrow(
      "Unsupported type: unknown_type"
    );
  });

  it("validates complex nested schemas correctly", () => {
    const complexSchema = {
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            profile: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  pattern: "^[^@]+@[^@]+\\.[^@]+$",
                },
              },
              required: ["email"],
            },
          },
          required: ["profile"],
        },
        preferences: {
          type: "array",
          items: {
            type: "string",
            enum: ["light", "dark", "auto"],
          },
        },
      },
      required: ["user"],
    };

    const zodSchema = jsonSchemaToZod(complexSchema);

    // Test valid complex data
    const validData = {
      user: {
        profile: {
          email: "test@example.com",
        },
      },
      preferences: ["light", "dark"],
    };
    expect(() => zodSchema.parse(validData)).not.toThrow();

    // Test invalid nested data
    expect(() =>
      zodSchema.parse({
        user: {
          profile: {
            email: "invalid-email",
          },
        },
      })
    ).toThrow();
  });

  it("handles edge cases in JSON schema types", () => {
    // Test that missing array items throws an error
    expect(() =>
      jsonSchemaToZod({
        type: "object",
        properties: {
          badArray: {
            type: "array",
            // Missing items
          },
        },
      } as any)
    ).toThrow('Array property "badArray" must have items definition');

    // Test that missing type throws an error
    expect(() =>
      jsonSchemaToZod({
        type: "object",
        properties: {
          noType: {
            description: "No type defined",
          },
        },
      } as any)
    ).toThrow('Property "noType" is missing type definition');

    // Test that unsupported type throws an error
    expect(() =>
      jsonSchemaToZod({
        type: "object",
        properties: {
          badType: {
            type: "unknown_type",
          },
        },
      } as any)
    ).toThrow("Unsupported type: unknown_type");
  });

  it("validates that MCP tool validation actually catches real issues", () => {
    // Test that our validation logic actually catches the kinds of issues
    // that would cause problems with OpenAI's strict mode

    const problematicSchemas = [
      {
        type: "object",
        properties: {
          missingItems: {
            type: "array",
            // Missing items property - this should throw
          },
        },
      },
      {
        type: "object",
        properties: {
          missingType: {
            description: "Property without type",
            // Missing type property - this should throw
          },
        },
      },
      {
        type: "object",
        properties: {
          invalidType: {
            type: "unsupported_type",
          },
        },
      },
    ];

    problematicSchemas.forEach((schema, index) => {
      expect(() => jsonSchemaToZod(schema as any)).toThrow();
    });
  });
});
