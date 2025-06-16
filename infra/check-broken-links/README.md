# LangChain Check Broken Links

A utility package for detecting and validating broken links in Markdown and MDX files across the LangChain JavaScript/TypeScript documentation and codebase.

## Overview

This package provides functionality to scan markdown/MDX files for HTTP/HTTPS links and validate that they are accessible. It's designed to maintain the quality of documentation by catching broken external links before they reach users.

### Key Features

- 🔍 **Automatic Link Detection**: Extracts HTTP/HTTPS links from markdown/MDX files using regex patterns
- 🚀 **Batch Processing**: Processes files in batches for optimal performance
- 🛡️ **Domain Whitelist**: Skips checking for trusted domains that are known to be reliable
- 🔄 **Retry Logic**: Optional retry mechanism for initially failed links
- ⏱️ **Configurable Timeout**: Customizable timeout settings for HTTP requests
- 📊 **Detailed Reporting**: Comprehensive reporting of check results and broken links
- 🎯 **Multiple Redirects**: Handles up to 5 redirects automatically
- ✅ **Flexible Status Codes**: Accepts both 2xx and 3xx status codes as valid

## Architecture

The package consists of:

```
infra/check-broken-links/
├── index.ts              # Main functionality and exports
├── cli.ts                # Command-line interface
├── tests/
│   ├── index.test.ts     # Unit tests for link extraction
│   └── integration.test.ts # Integration tests for full workflow
├── package.json          # Package dependencies and scripts
└── README.md             # This documentation
```

### Core Functions

- **`extractLinks(content: string)`** - Extracts HTTPS links from markdown content
- **`checkUrl(url: string, options?)`** - Validates individual URLs
- **`checkBrokenLinks(mdxDirPath: string, options?)`** - Main function to check all files in a directory

## Usage

This package can be used as command line tool via:

```bash
# Basic check
yarn checkBrokenLinks ./docs

# With options
yarn checkBrokenLinks ./docs --timeout=15000 --retry-failed --log-errors

# Or run directly with node (after building)
yarn checkBrokenLinks --help
```

### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `timeout` | number | 3000 | HTTP request timeout in milliseconds |
| `retryFailed` | boolean | false | Whether to retry failed URLs |
| `logErrors` | boolean | false | Whether to log detailed error information |
| `whitelist` | string[] | [] | Additional domains to skip checking |

### Default Whitelist

The following domains are whitelisted by default (skipped during checks):
- `openai.com`
- `ibm.com`
- `x.com`
- `twitter.com`
- `npmjs.com`
- `microsoft.com`

## Where It's Used

### Current Usage in LangChain JS

1. **Documentation Validation**: 
   - File: `docs/core_docs/scripts/check-broken-links.js`
   - Usage: Validates links in the core documentation
   ```javascript
   const { checkBrokenLinks } = require("@langchain/scripts/check_broken_links");
   
   checkBrokenLinks("docs", {
     timeout: 10000,
     retryFailed: true,
   });
   ```

2. **CI/CD Pipeline**: Used in automated workflows to ensure documentation quality

3. **Development Scripts**: Available through the `@langchain/scripts` package for local development

### Migration Notes

This package was migrated from:
- **Source**: `libs/langchain-scripts/src/check_broken_links.ts`
- **Package**: `@langchain/scripts/check_broken_links`

To update existing usage:
```typescript
// Old import
import { checkBrokenLinks } from "@langchain/scripts/check_broken_links";

// New import (after full migration)
import { checkBrokenLinks } from "@langchain/infra-check-broken-links";
```

## Development

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npx vitest run --coverage
```

### Building

```bash
npx tsc
```

### Adding New Features

1. Update `index.ts` with new functionality
2. Add corresponding tests in `tests/`
3. Update this README with new options/features
4. Test CLI functionality if applicable

## Technical Details

### Link Detection Pattern

The package uses the following regex pattern to detect links:
```typescript
/\[[\s\S]*?\]\((https:\/\/.*?)\)/g
```

This pattern matches markdown link syntax `[text](https://url)` and extracts the HTTPS URLs.

### HTTP Request Configuration

- **Max Redirects**: 5
- **Valid Status Codes**: 200-399
- **Default Timeout**: 3000ms
- **User Agent**: Axios default

### Batch Processing

Files are processed in batches of 10 to balance performance and resource usage. This prevents overwhelming servers with too many concurrent requests.

## Contributing

When contributing to this package:

1. Ensure all tests pass
2. Add tests for new functionality
3. Update documentation for new options/features
4. Follow the existing code style and patterns
5. Test both programmatic and CLI usage 