import { resolve } from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

import prettier from "prettier";
import type { PackageJson } from "type-fest";

import type { CompilePackageOptions } from "./types.js";

const execAsync = promisify(exec);

export interface WorkspacePackage {
  pkg: PackageJson;
  path: string;
}

interface PackageList {
  name: string;
  version?: string;
  path: string;
  private: boolean;
}

/**
 * Find all packages in the workspace that match the package query and are not excluded.
 *
 * @param rootDir - The root directory of the workspace
 * @param packageQuery - Optional query to filter packages
 * @param exclude - Optional array of package names or patterns to exclude
 * @returns A list of packages that match the query and are not excluded.
 */
export async function findWorkspacePackages(
  rootDir: string,
  opts: CompilePackageOptions
) {
  const result = await execAsync("pnpm list -r --json --depth=-1");
  const packages = JSON.parse(result.stdout) as PackageList[];
  const workspaces = (
    await Promise.all(
      packages.map(async (workspace) => {
        try {
          // Skip the root workspace
          if (workspace.path === rootDir) {
            return null;
          }
          const pkg = await import(resolve(workspace.path, "package.json"));

          /**
           * skip package if it matches any exclude pattern
           */
          if (opts.exclude && opts.exclude.length > 0) {
            const isExcluded = opts.exclude.some(
              (excludePattern) => workspace.name === excludePattern
            );
            if (isExcluded) {
              return null;
            }
          }

          /**
           * compile package if no query is provided or the package name matches the query
           */
          if (
            !opts.packageQuery ||
            opts.packageQuery.length === 0 ||
            opts.packageQuery.includes(workspace.name)
          ) {
            return {
              pkg,
              path: workspace.path,
            };
          }
        } catch {
          /* ignore */
          return null;
        }
      })
    )
  ).filter(Boolean) as WorkspacePackage[];
  return workspaces;
}

/**
 * Format TypeScript code using prettier with the project's configuration
 *
 * @param code - The TypeScript code to format
 * @param filePath - The file path for context (used to find prettier config)
 * @returns The formatted code
 */
export async function formatWithPrettier(
  code: string,
  filePath: string
): Promise<string> {
  try {
    // Get prettier config for the file
    const prettierConfig = await prettier.resolveConfig(filePath);

    // Format the code with TypeScript parser
    const formatted = await prettier.format(code, {
      ...prettierConfig,
      parser: "typescript",
    });

    return formatted;
  } catch (error) {
    console.warn("⚠️ Failed to format code with prettier:", error);
    // Return the original code if formatting fails
    return code;
  }
}
