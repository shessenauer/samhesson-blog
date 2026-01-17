import { motion } from 'framer-motion';

interface BlogPostCardProps {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  tags?: string[];
}

export default function BlogPostCard({ title, description, pubDate, slug, tags }: BlogPostCardProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.a
      href={`/blog/${slug}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-2">
        <time className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</time>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.a>
  );
}
