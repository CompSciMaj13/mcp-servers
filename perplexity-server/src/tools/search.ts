import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { PerplexityApiService } from '../services/perplexity-api.js';
import { isValidSearchArgs } from '../types/perplexity.js';
import { formatResponse } from '../utils/response-formatter.js';
import axios from 'axios';

/**
 * Tool schema for the search functionality
 */
export const searchToolSchema = {
  name: 'search',
  description: 'Search for information using Perplexity AI',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query',
      },
      model: {
        type: 'string',
        description: 'The model to use for search (defaults to llama-3.1-sonar-small-128k-online). Note: If query is simple, use the default small model. For more complex and performance requiring queries, use the llama-3.1-sonar-large-128k-online model.',
        enum: ['llama-3.1-sonar-small-128k-online', 'llama-3.1-sonar-large-128k-online'],
      }
    },
    required: ['query'],
  },
};

/**
 * Handler for the search tool
 */
export class SearchTool {
  private apiService: PerplexityApiService;

  constructor() {
    this.apiService = new PerplexityApiService();
  }

  async execute(request: { params: { name: string; arguments?: Record<string, unknown> } }) {
    if (request.params.name !== 'search') {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${request.params.name}`
      );
    }

    if (!isValidSearchArgs(request.params.arguments)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid search arguments'
      );
    }

    try {
      const response = await this.apiService.search(request.params.arguments);
      const formattedResponse = formatResponse(response);

      return {
        content: [{ type: 'text', text: formattedResponse }]
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return {
          content: [
            {
              type: 'text',
              text: `Perplexity API error: ${
                error.response?.data?.error?.message ?? error.message
              }`,
            },
          ],
          isError: true,
        };
      }
      throw error;
    }
  }
}
