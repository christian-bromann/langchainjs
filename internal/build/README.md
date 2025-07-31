# LangChain Build System

A modern build system for LangChain JavaScript/TypeScript packages that provides fast compilation, type checking, automated secret management, and advanced code generation for monorepo workspaces.

## Overview

This build system is designed to handle the complex requirements of LangChain's multi-package monorepo. It automatically discovers packages in the workspace, compiles them with optimal settings, and includes specialized tooling for LangChain's security patterns and dynamic loading capabilities.

### Key Features

- 🚀 **Fast Compilation**: Uses [tsdown](https://github.com/privatenumber/tsdown) for high-performance TypeScript bundling with Rolldown
- 📦 **Monorepo Aware**: Automatically discovers and builds all non-private packages in pnpm workspaces
- 🔍 **Secret Management**: Built-in scanning and validation of LangChain's `lc_secrets` patterns
- 📝 **Type Generation**: Generates both ESM and CommonJS outputs with TypeScript declarations
- ✅ **Quality Checks**: Integrated type checking with [arethetypeswrong](https://github.com/arethetypeswrong/arethetypeswrong), [publint](https://github.com/bluwy/publint), and unused dependency detection
- 🗺️ **Import Maps**: Automatic generation of import maps for convenient bulk imports
- 📋 **Import Constants**: Dynamic detection and export of optional dependency entrypoints
- 🎯 **Selective Building**: Build all packages or target specific ones with flexible filtering
- 👀 **Watch Mode**: Real-time compilation with file watching capabilities
- 🛠️ **Rich CLI**: Full-featured command-line interface with comprehensive options

## Architecture

The build system consists of:

```
infra/build/
├── index.ts              # Main build orchestrator
├── cli.ts                # Command-line interface
├── types.ts              # TypeScript type definitions
├── utils.ts              # Utility functions
├── plugins/
│   ├── README.md         # Plugin documentation
│   ├── lc-secrets.ts     # LangChain secrets scanning plugin
│   ├── import-map.ts     # Import map generation plugin
│   └── import-constants.ts # Import constants generation plugin
├── package.json          # Build system dependencies
└── README.md             # This documentation
```

### Core Technologies

- **[tsdown](https://github.com/privatenumber/tsdown)** - Fast TypeScript bundler with Rolldown
- **[TypeScript Compiler API](https://github.com/microsoft/TypeScript)** - For source code analysis and type checking
- **[pnpm workspaces](https://yarnpkg.com/features/workspaces)** - For monorepo package discovery
- **[unplugin-unused](https://github.com/unplugin/unplugin-unused)** - For unused dependency detection
- **Node.js built-ins** - File system operations and process management

## Usage

### CLI Commands

```bash
# Get help
pnpm build:new --help

# Build all packages in the workspace
pnpm build:new

# Build with watch mode for development
pnpm build:new --watch

# Build specific packages
pnpm build:new @langchain/core
pnpm build:new @langchain/core langchain @langchain/openai

# Exclude packages from build
pnpm build:new --exclude @langchain/community
pnpm build:new -e @langchain/aws -e @langchain/openai

# Skip various build steps
pnpm build:new --no-emit          # Skip type declarations
pnpm build:new --skip-unused      # Skip unused dependency check
pnpm build:new --skip-clean       # Skip cleaning build directory
pnpm build:new --skip-sourcemap   # Skip sourcemap generation
```

## Development

### Adding New Packages

1. Create package directory under appropriate workspace
2. Add `package.json` with proper exports field
3. Add `tsconfig.json` extending workspace config
4. Run build - it will be automatically discovered

### package.json Requirements

Each package must have a properly configured `exports` field that includes an `input` property to tell the build system which source file to compile for each entrypoint:

```json
{
  "name": "@langchain/example",
  "exports": {
    ".": {
      "input": "./src/index.ts", // ← Required: Source file for this entrypoint
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./tools": {
      "input": "./src/tools/index.ts", // ← Required: Source file for tools entrypoint
      "import": "./dist/tools/index.js",
      "require": "./dist/tools/index.cjs",
      "types": "./dist/tools/index.d.ts"
    }
  }
}
```

**Important**: The `input` property is required for the build system to understand which TypeScript source file should be compiled for each export. Without this property, the entrypoint will be ignored during build.
