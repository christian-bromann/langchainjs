#!/usr/bin/env node

import path from 'node:path'
import fs from 'node:fs'
import { parseArgs } from 'node:util'
import { checkBrokenLinks } from './index.js'

/**
 * CLI configuration with descriptions for auto-generated help
 */
const cliName = 'yarn checkBrokenLinks'
const cliConfig = {
    name: cliName,
    description: 'CLI program for checking broken links in MDX files',
    options: {
        cwd: {
            type: 'string' as const,
            short: 'c',
            default: process.cwd(),
            description: 'Current working directory'
        },
        timeout: {
            type: 'string' as const,
            short: 't',
            default: '10000',
            description: 'HTTP request timeout in milliseconds'
        },
        retryFailed: {
            type: 'boolean' as const,
            short: 'r',
            default: false,
            description: 'Retry failed URLs to reduce false positives'
        },
        logErrors: {
            type: 'boolean' as const,
            short: 'v',
            default: false,
            description: 'Enable verbose error logging'
        },
        whitelist: {
            type: 'string' as const,
            short: 'w',
            default: [],
            multiple: true,
            description: 'Additional domains to whitelist (can be specified multiple times)'
        },
        help: {
            type: 'boolean' as const,
            short: 'h',
            default: false,
            description: 'Show this help message'
        }
    },
    positionals: {
        name: 'directory',
        description: 'Directory containing MDX files to check for broken links'
    },
    examples: [
        { command: `${cliName} docs`, description: 'Check broken links in the docs directory' },
        { command: `${cliName} docs --timeout=15000`, description: 'Check with custom timeout' },
        { command: `${cliName} docs --retry-failed`, description: 'Check and retry failed URLs' },
        { command: `${cliName} docs --log-errors`, description: 'Check with verbose error logging' },
        { command: `${cliName} docs --whitelist=example.com --whitelist=internal.com`, description: 'Check with additional whitelisted domains' },
        { command: `${cliName} docs -r -v -t 20000`, description: 'Check with retry, verbose logging, and 20s timeout' }
    ]
}

/**
 * Generate help text from CLI configuration
 */
function generateHelp(config: typeof cliConfig): string {
    const lines: string[] = []

    lines.push(`${config.description}`)
    lines.push('')
    lines.push(`Usage: ${config.name} [options] <${config.positionals.name}>`)
    lines.push('')
    lines.push('Options:')

    Object.entries(config.options).forEach(([key, option]) => {
        const shortFlag = 'short' in option && option.short ? `-${option.short}, ` : '    '
        const longFlag = `--${key}`
        const padding = ' '.repeat(Math.max(0, 15 - longFlag.length))
        const hasDefault = option.default !== undefined && 
                          option.default !== false && 
                          option.default !== '' &&
                          (!Array.isArray(option.default) || option.default.length > 0)
        const defaultText = hasDefault ? ` (default: ${option.default})` : ''
        lines.push(`  ${shortFlag}${longFlag}${padding}${option.description}${defaultText}`)
    })

    lines.push('')
    lines.push('Arguments:')
    lines.push(`  ${config.positionals.name.padEnd(15)}${config.positionals.description}`)

    lines.push('')
    lines.push('Examples:')
    config.examples.forEach(example => {
        lines.push(`  # ${example.description}`)
        lines.push(`  ${example.command}`)
        lines.push('')
    })

    lines.push(`Copyright © ${new Date().getFullYear()} LangChain, Inc. All rights reserved.`)
    return lines.join('\n')
}

/**
 * CLI program for checking broken links in MDX files
 */
async function main() {
    const { values, positionals } = parseArgs({
        args: process.argv.slice(2),
        options: cliConfig.options,
        allowPositionals: true,
    })

    if (values.help) {
        console.log(generateHelp(cliConfig))
        process.exit(0)
    }

    if (positionals.length === 0) {
        console.error('❌ Error: Directory argument is required')
        console.error('')
        console.log(generateHelp(cliConfig))
        process.exit(1)
    }

    const directory = path.resolve(values.cwd, positionals[0])
    if (!fs.existsSync(directory)) {
        console.error(`❌ Error: Directory "${directory}" does not exist`)
        process.exit(1)
    }

    const timeout = parseInt(values.timeout || '10000')
    const retryFailed = values.retryFailed
    const logErrors = values.logErrors
    const whitelist = Array.isArray(values.whitelist) 
        ? values.whitelist 
        : (values.whitelist ? [values.whitelist] : [])

    if (isNaN(timeout) || timeout <= 0) {
        console.error('❌ Error: Invalid timeout value. Must be a positive number.')
        process.exit(1)
    }

    try {
        console.log(`🔍 Checking broken links in directory: "${directory}"...`)
        if (timeout !== 10000) {
            console.log(`⏱️  Using timeout: ${timeout}ms`)
        }
        if (retryFailed) {
            console.log('🔄 Retry failed URLs: enabled')
        }
        if (logErrors) {
            console.log('📝 Verbose error logging: enabled')
        }
        if (whitelist.length > 0) {
            console.log(`🛡️  Additional whitelisted domains: ${whitelist.map(d => `"${d}"`).join(', ')}`)
        }
        console.log('')

        await checkBrokenLinks(directory, {
            timeout,
            retryFailed,
            logErrors,
            whitelist
        })

        console.log('✅ Link check completed successfully!')
    } catch (error) {
        console.error('❌ Link check failed:')
        console.error(error instanceof Error ? error.message : String(error))
        process.exit(1)
    }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught exception:', error)
    process.exit(1)
})

process.on('unhandledRejection', (reason) => {
    console.error('❌ Unhandled rejection:', reason)
    process.exit(1)
})

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Gracefully shutting down...')
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log('\n👋 Gracefully shutting down...')
    process.exit(0)
})

main().catch((error) => {
    console.error('❌ CLI execution failed:', error)
    process.exit(1)
}) 