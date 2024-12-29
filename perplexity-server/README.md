# Perplexity MCP Server

An MCP server that provides access to Perplexity AI's search capabilities through their API. This server enables searching for up-to-date information, documentation, and coding examples from the web.

## Features

- Search using Perplexity AI's powerful language models
- Support for multiple model types
- Real-time web search capabilities
- Markdown-formatted responses with citation links
- Configurable system prompts and search parameters

## Prerequisites

- Node.js installed
- A Perplexity AI API key (obtain from https://www.perplexity.ai/settings)

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```
3. Build the server:
```bash
npm run build
```

## Configuration

The server is configured through environment variables in the MCP settings configuration file.

### Required Environment Variables

- `PERPLEXITY_API_KEY`: Your Perplexity AI API key

### Optional Environment Variables

- `PERPLEXITY_SYSTEM_PROMPT`: System prompt for the AI (default: "Be precise and concise.")
- `PERPLEXITY_TEMPERATURE`: Controls response randomness (0.0 to 1.0, default: 0.2)
- `PERPLEXITY_TOP_P`: Controls response diversity (0.0 to 1.0, default: 0.9)
- `PERPLEXITY_SEARCH_DOMAIN_FILTER`: JSON array of domains to filter search results (default: none)
- `PERPLEXITY_RETURN_IMAGES`: Whether to return images (true/false, default: false)
- `PERPLEXITY_RETURN_RELATED_QUESTIONS`: Whether to return related questions (true/false, default: false)
- `PERPLEXITY_SEARCH_RECENCY_FILTER`: Filter for result recency (day/week/month/year, default: none)
- `PERPLEXITY_TOP_K`: Number of search results to consider (default: 0)
- `PERPLEXITY_STREAM`: Whether to stream the response (true/false, default: false)
- `PERPLEXITY_PRESENCE_PENALTY`: Penalty for token presence (default: 0)
- `PERPLEXITY_FREQUENCY_PENALTY`: Penalty for token frequency (default: 1)

Example MCP settings configuration:
```json
{
  "mcpServers": {
    "perplexity": {
      "command": "node",
      "args": ["/path/to/perplexity-server/build/index.js"],
      "env": {
        "PERPLEXITY_API_KEY": "your-api-key-here",
        "PERPLEXITY_SYSTEM_PROMPT": "Be accurate, descriptive, helpful, and detailed.",
        "PERPLEXITY_TEMPERATURE": "0.2",
        "PERPLEXITY_TOP_P": "0.9",
        "PERPLEXITY_SEARCH_DOMAIN_FILTER": "",
        "PERPLEXITY_RETURN_IMAGES": "false",
        "PERPLEXITY_RETURN_RELATED_QUESTIONS": "false",
        "PERPLEXITY_SEARCH_RECENCY_FILTER": "",
        "PERPLEXITY_TOP_K": "0",
        "PERPLEXITY_STREAM": "false",
        "PERPLEXITY_PRESENCE_PENALTY": "0",
        "PERPLEXITY_FREQUENCY_PENALTY": "1"
      }
    }
  }
}
```

## Available Tools

### search

Performs a search query using Perplexity AI.

#### Parameters

- `query` (required): The search query string
- `model` (optional): The model to use for the search. Defaults to 'llama-3.1-sonar-small-128k-online'
  - Available options:
    - `llama-3.1-sonar-small-128k-online`: Smaller model suitable for simple queries
    - `llama-3.1-sonar-large-128k-online`: Larger model for complex queries requiring better performance

#### Example Usage

```typescript
<use_mcp_tool>
<server_name>perplexity</server_name>
<tool_name>search</tool_name>
<arguments>
{
  "query": "What are the latest features in Python 3.12?",
  "model": "llama-3.1-sonar-large-128k-online"
}
</arguments>
</use_mcp_tool>
```

#### Response Format

The tool returns responses in markdown format with citation links. Example:

```typescript
{
  content: [
    {
      type: 'text',
      text: `\`\`\`
        Python 3.12 introduces several new features including:
        - Enhanced error messages [[1]]
        - Improved type system [[2]]
        - Faster startup time [[3]]
        
        [1]: https://docs.python.org/3.12/whatsnew/3.12.html
        [2]: https://peps.python.org/pep-0695/
        [3]: https://docs.python.org/3.12/whatsnew/3.12.html#optimizations
        \`\`\`
        
        Citations:
        [1]: https://docs.python.org/3.12/whatsnew/3.12.html
        [2]: https://peps.python.org/pep-0695/
        [3]: https://docs.python.org/3.12/whatsnew/3.12.html#optimizations`
    }
  ]
}
```

## Error Handling

The server includes comprehensive error handling:

- Invalid API key errors
- Network request failures
- Invalid parameter validation
- Malformed requests

Error responses include descriptive messages to help diagnose issues.

## Development

The server is organized into a modular structure for better maintainability and separation of concerns:

```
src/
├── config/
│   └── env.ts           # Environment variable configuration
├── types/
│   └── perplexity.ts    # TypeScript interfaces and type definitions
├── services/
│   └── perplexity-api.ts # API service implementation
├── tools/
│   └── search.ts        # Search tool implementation
├── utils/
│   └── response-formatter.ts # Response formatting utilities
└── index.ts            # Main server entry point
```

### Directory Structure

- `config/`: Contains environment variable configuration and defaults
- `types/`: TypeScript interfaces and type definitions
- `services/`: API service implementations
- `tools/`: MCP tool implementations
- `utils/`: Helper functions and utilities

### Making Changes

1. **Environment Configuration**
   - Modify `src/config/env.ts` to add or update environment variables

2. **API Changes**
   - Update API-related code in `src/services/perplexity-api.ts`
   - Add new API types in `src/types/perplexity.ts`

3. **Tool Modifications**
   - Tool implementations are in `src/tools/`
   - Each tool has its schema and handler class

4. **Response Formatting**
   - Update response formatting in `src/utils/response-formatter.ts`

5. **Server Configuration**
   - Main server setup is in `src/index.ts`

After making changes, rebuild the server:
```bash
npm run build
```

## License

MIT
