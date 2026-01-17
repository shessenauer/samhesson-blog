interface OrganicBlobProps {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function OrganicBlob({ variant = 'primary', size = 'md', className = '' }: OrganicBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  const colors = {
    primary: '#D4A574', // natural-wood-300
    secondary: '#C9C4B5', // driftwood-300
    accent: '#8B9F87', // living-green-300
  };

  return (
    <svg
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      fill={colors[variant]}
      opacity="0.15"
    >
      <path
        d="M45.4,-64.9C58.1,-55.8,67.4,-42.1,72.9,-27.1C78.4,-12.1,80.1,4.2,76.3,19.3C72.5,34.4,63.2,48.3,50.7,58.7C38.2,69.1,22.5,76,-0.1,76.1C-22.7,76.3,-45.4,69.7,-60.9,57.5C-76.4,45.3,-84.7,27.5,-86.3,9.1C-87.9,-9.3,-82.8,-28.3,-72.1,-43.6C-61.4,-58.9,-45.1,-70.5,-28.2,-75.9C-11.3,-81.3,5.2,-80.5,20.5,-75.2C35.8,-69.9,32.7,-74,-45.4,-64.9Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
