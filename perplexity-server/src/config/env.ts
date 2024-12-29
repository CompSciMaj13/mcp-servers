/**
 * Environment variable configuration with type-safe defaults
 */

export interface PerplexityConfig {
  apiKey: string;
  systemPrompt: string;
  temperature: number;
  topP: number;
  searchDomainFilter?: string[];
  returnImages: boolean;
  returnRelatedQuestions: boolean;
  searchRecencyFilter?: string;
  topK: number;
  stream: boolean;
  presencePenalty: number;
  frequencyPenalty: number;
}

// Validate required API key
const API_KEY = process.env.PERPLEXITY_API_KEY;
if (!API_KEY) {
  throw new Error('PERPLEXITY_API_KEY environment variable is required');
}

// Load and validate environment variables
export const config: PerplexityConfig = {
  apiKey: API_KEY,
  systemPrompt: process.env.PERPLEXITY_SYSTEM_PROMPT ?? 'Be precise and concise.',
  temperature: parseFloat(process.env.PERPLEXITY_TEMPERATURE ?? '0.2'),
  topP: parseFloat(process.env.PERPLEXITY_TOP_P ?? '0.9'),
  searchDomainFilter: process.env.PERPLEXITY_SEARCH_DOMAIN_FILTER ? 
    JSON.parse(process.env.PERPLEXITY_SEARCH_DOMAIN_FILTER) : undefined,
  returnImages: process.env.PERPLEXITY_RETURN_IMAGES === 'true',
  returnRelatedQuestions: process.env.PERPLEXITY_RETURN_RELATED_QUESTIONS === 'true',
  searchRecencyFilter: process.env.PERPLEXITY_SEARCH_RECENCY_FILTER ?? undefined,
  topK: parseInt(process.env.PERPLEXITY_TOP_K ?? '0'),
  stream: process.env.PERPLEXITY_STREAM === 'true',
  presencePenalty: parseFloat(process.env.PERPLEXITY_PRESENCE_PENALTY ?? '0'),
  frequencyPenalty: parseFloat(process.env.PERPLEXITY_FREQUENCY_PENALTY ?? '1')
};
