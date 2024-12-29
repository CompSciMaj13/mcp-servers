/**
 * Type definitions for Perplexity API interactions
 */

export interface SearchArgs {
  query: string;
  model?: string;
}

export interface PerplexityMessage {
  role: 'system' | 'user';
  content: string;
}

export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  citations?: string[];
}

export const isValidSearchArgs = (args: any): args is SearchArgs =>
  typeof args === 'object' &&
  args !== null &&
  typeof args.query === 'string' &&
  (args.model === undefined || typeof args.model === 'string');
