/**
 * Calculate estimated reading time for text content
 * @param text The text content to analyze
 * @param wordsPerMinute Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // Remove markdown syntax and code blocks for more accurate word count
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1') // Convert links to just text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .trim();

  const wordCount = cleanText.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  return minutes;
}

/**
 * Format reading time into a human-readable string
 * @param minutes Reading time in minutes
 * @returns Formatted reading time string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) {
    return 'Less than 1 min read';
  }

  if (minutes === 1) {
    return '1 min read';
  }

  return `${minutes} min read`;
}

/**
 * Calculate and format reading time in one step
 * @param text The text content to analyze
 * @returns Formatted reading time string
 */
export function getReadingTime(text: string): string {
  const minutes = calculateReadingTime(text);
  return formatReadingTime(minutes);
}
