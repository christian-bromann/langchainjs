import { test, expect } from "vitest";
import { checkBrokenLinks } from "../index.js";

test("Can load mdx file and find broken links", async () => {
  const pathToMdxFiles = "./tests/__mdx__/";

  await expect(
    checkBrokenLinks(pathToMdxFiles, { logErrors: true })
  ).rejects.toThrow();
}); 