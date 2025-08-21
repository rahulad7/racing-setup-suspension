import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  className = '',
  showTagline = false
}) => {
  const sizeClasses = {
    sm: { img: 'h-6 md:h-8', text: 'text-sm md:text-lg', container: 'gap-1 md:gap-2' },
    md: { img: 'h-8 md:h-12', text: 'text-lg md:text-2xl', container: 'gap-2 md:gap-3' },
    lg: { img: 'h-12 md:h-16', text: 'text-xl md:text-3xl', container: 'gap-2 md:gap-3' },
    xl: { img: 'h-16 md:h-20', text: 'text-2xl md:text-4xl', container: 'gap-3 md:gap-4' },
    xxl: { img: 'h-20 md:h-32', text: 'text-3xl md:text-5xl', container: 'gap-3 md:gap-4' }
  };

  const LogoImage = () => (
    <img 
      src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753210534580_31753e04.png"
      alt="Setup Pro Logo"
      className={`${sizeClasses[size].img} object-contain`}
    />
  );

  const TextComponent = () => (
    <div className="flex flex-col">
      {showTagline && size !== 'sm' && (
        <p className={`text-gray-400 ${size === 'xl' || size === 'xxl' ? 'text-sm md:text-base' : 'text-xs md:text-sm'} -mt-1`}>
          Find Those Tenths
        </p>
      )}
    </div>
  );

  if (variant === 'icon') {
    return <LogoImage />;
  }

  if (variant === 'text') {
    return <TextComponent />;
  }

  return (
    <div className={`flex items-center ${sizeClasses[size].container} ${className}`}>
      <LogoImage />
      {showTagline && <TextComponent />}
    </div>
  );
};

export { Logo };
export default Logo;