import { motion } from 'framer-motion';
import { TwitterIcon, LinkedInIcon, GitHubIcon } from './icons/SocialIcons';

interface ProfileCardProps {
  compact?: boolean;
}

export default function ProfileCard({ compact = false }: ProfileCardProps) {
  const socialLinks = [
    {
      name: 'X (Twitter)',
      url: 'https://x.com/aquamansam1',
      icon: TwitterIcon,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/samhesson',
      icon: LinkedInIcon,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/samhesson',
      icon: GitHubIcon,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className={`
        bg-warm-sand-100 dark:bg-dark-bg-secondary
        border border-driftwood-300 dark:border-dark-border
        rounded-[24px]
        shadow-md hover:shadow-lg
        transition-all duration-300
        ${compact ? 'p-4' : 'p-6'}
      `}
    >
      <div className={`flex ${compact ? 'flex-col items-center text-center gap-3' : 'flex-col sm:flex-row items-center sm:items-start gap-6'}`}>
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src="/images/profile-placeholder.svg"
            alt="Sam Hesson profile"
            className="w-20 h-20 rounded-full"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h2 className={`font-serif font-semibold text-void-400 dark:text-warm-sand-100 ${compact ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
            Sam Hesson
          </h2>
          <p className={`text-void-200 dark:text-dark-text-secondary mt-1 ${compact ? 'text-sm' : 'text-base'}`}>
            vc-backed founder (chemistry software) now building AI agents @Meta
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="
                  text-living-green-500 dark:text-living-green-300
                  hover:text-living-green-400 dark:hover:text-living-green-200
                  transition-all duration-300
                  hover:scale-110
                  inline-block
                "
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
