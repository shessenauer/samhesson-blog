import { motion } from 'framer-motion';

interface BlogPostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  tags?: string[];
  draft?: boolean;
}

export default function BlogPostCard({ title, description, pubDate, slug, tags, draft }: BlogPostCardProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.a
      href={`/blog/${slug}`}
      className="block p-6 bg-warm-sand-100 dark:bg-dark-bg-secondary rounded-[24px] border border-driftwood-300 dark:border-driftwood-300/30 hover:border-living-green-400 dark:hover:border-living-green-400 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 15px -3px rgba(212, 165, 116, 0.2), 0 4px 6px -4px rgba(212, 165, 116, 0.15)"
      }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="mb-2 flex items-center gap-2">
        <time className="text-sm text-void-100 dark:text-driftwood-300">{formattedDate}</time>
        {import.meta.env.DEV && draft && (
          <span className="inline-block px-2 py-1 text-xs font-bold bg-natural-wood-400 text-white rounded-full">
            DRAFT
          </span>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-void-400 dark:text-warm-sand-100 hover:text-living-green-500 dark:hover:text-living-green-300 transition-colors" style={{ letterSpacing: '-0.02em' }}>
        {title}
      </h2>

      <p className="text-void-200 dark:text-driftwood-200 mb-4">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-living-green-100 dark:bg-living-green-500/20 text-living-green-500 dark:text-living-green-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}
