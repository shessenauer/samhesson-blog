import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');

  // Sort posts by date (newest first)
  const sortedPosts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Sam Hesson's Blog",
    description: 'Thoughts on web development, technology, and more',
    site: context.site?.toString() || 'https://samhesson.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss/styles.xsl',
  });
}
