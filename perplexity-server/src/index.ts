#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { SearchTool, searchToolSchema } from './tools/search.js';

/**
 * Main server class for the Perplexity MCP server
 */
class PerplexityServer {
  private server: Server;
  private searchTool: SearchTool;

  constructor() {
    this.server = new Server(
      {
        name: 'perplexity-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.searchTool = new SearchTool();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Set up tool request handlers
   */
  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [searchToolSchema],
    }));

    // Handle tool execution requests
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return this.searchTool.execute(request);
    });
  }

  /**
   * Start the server
   */
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Perplexity MCP server running on stdio');
  }
}

// Create and start the server
const server = new PerplexityServer();
server.run().catch(console.error);
