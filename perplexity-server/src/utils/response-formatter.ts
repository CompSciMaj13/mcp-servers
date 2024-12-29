import { PerplexityResponse } from '../types/perplexity.js';

/**
 * Format citations into a numbered reference list
 */
function formatCitations(citations: string[]): string {
  return citations
    .map((url: string, index: number) => `[${index + 1}]: ${url}`)
    .join('\n');
}

/**
 * Format the response content with double brackets for citation linking
 */
function formatContent(content: string): string {
  return content.replace(/\[/g, '[[').replace(/\]/g, ']]');
}

/**
 * Format the complete response with markdown and citations
 */
export function formatResponse(response: PerplexityResponse): string {
  const content = formatContent(response.choices[0].message.content);
  const citations = response.citations || [];
  const citationsBlock = formatCitations(citations);

  return `
\`\`\`
${content}

${citationsBlock}
\`\`\`

Citations:
${citationsBlock}`;
}
