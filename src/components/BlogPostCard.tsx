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
      className="block p-8 bg-gradient-to-br from-warm-sand-100 to-natural-wood-100/30 dark:from-dark-bg-secondary dark:to-dark-bg-primary rounded-[28px] border-2 border-natural-wood-300/50 dark:border-dark-border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        y: -4,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
    >
      {/* Subtle organic shape in background */}
      <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="#D4A574">
          <path d="M45.4,-64.9C58.1,-55.8,67.4,-42.1,72.9,-27.1C78.4,-12.1,80.1,4.2,76.3,19.3C72.5,34.4,63.2,48.3,50.7,58.7C38.2,69.1,22.5,76,-0.1,76.1C-22.7,76.3,-45.4,69.7,-60.9,57.5C-76.4,45.3,-84.7,27.5,-86.3,9.1C-87.9,-9.3,-82.8,-28.3,-72.1,-43.6C-61.4,-58.9,-45.1,-70.5,-28.2,-75.9C-11.3,-81.3,5.2,-80.5,20.5,-75.2C35.8,-69.9,32.7,-74,-45.4,-64.9Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <time className="text-sm text-void-100 dark:text-driftwood-300">{formattedDate}</time>
        {import.meta.env.DEV && draft && (
          <span className="inline-block px-2 py-1 text-xs font-bold bg-natural-wood-400 text-white rounded-full">
            DRAFT
          </span>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-3 text-void-400 dark:text-warm-sand-100 group-hover:text-natural-wood-500 dark:group-hover:text-natural-wood-200 transition-colors relative z-10">
        {title}
      </h2>

      <p className="text-void-200 dark:text-driftwood-200 mb-6 leading-relaxed relative z-10">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 relative z-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-4 py-2 bg-living-green-100/80 dark:bg-living-green-500/20 text-living-green-500 dark:text-living-green-200 rounded-full border border-living-green-300/30 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}
