import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  type = 'button',
  icon
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-slate-700/50 hover:bg-slate-600/50 text-slate-100 border border-slate-600/50 hover:border-slate-500/50",
    accent: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25",
    ghost: "bg-transparent hover:bg-slate-700/30 text-slate-300 hover:text-slate-100",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-red-500/25"
  };

  const sizes = {
    sm: "px-2 py-1.5 text-xs md:px-3 md:text-sm",
    md: "px-3 py-2 text-sm md:px-4 md:text-sm",
    lg: "px-4 py-2.5 text-sm md:px-6 md:py-3 md:text-base"
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "transition-all duration-200 font-medium rounded-lg w-full sm:w-auto",
        "focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        variants[variant],
        sizes[size],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading && <Loader2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-spin" />}
      {!loading && icon && <span className="mr-1 md:mr-2">{icon}</span>}
      {children}
    </Button>
  );
};

export default ModernButton;