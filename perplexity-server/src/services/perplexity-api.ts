import axios, { AxiosInstance } from 'axios';
import { config } from '../config/env.js';
import { PerplexityResponse, SearchArgs } from '../types/perplexity.js';

/**
 * Service for interacting with the Perplexity API
 */
export class PerplexityApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.perplexity.ai',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    });
  }

  /**
   * Perform a search query using the Perplexity API
   */
  async search(args: SearchArgs): Promise<PerplexityResponse> {
    const response = await this.axiosInstance.post<PerplexityResponse>('/chat/completions', {
      model: args.model || 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: config.systemPrompt
        },
        {
          role: 'user',
          content: args.query,
        },
      ],
      temperature: config.temperature,
      top_p: config.topP,
      search_domain_filter: config.searchDomainFilter,
      return_images: config.returnImages,
      return_related_questions: config.returnRelatedQuestions,
      search_recency_filter: config.searchRecencyFilter,
      top_k: config.topK,
      stream: config.stream,
      presence_penalty: config.presencePenalty,
      frequency_penalty: config.frequencyPenalty
    });

    return response.data;
  }
}
