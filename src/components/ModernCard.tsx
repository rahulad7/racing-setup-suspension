import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  glow?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({ 
  title, 
  children, 
  className, 
  gradient = false, 
  glow = false 
}) => {
  return (
    <Card className={cn(
      "backdrop-blur-sm border transition-all duration-300 hover:shadow-xl w-full",
      gradient 
        ? "bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border-slate-700/50" 
        : "bg-slate-900/80 border-slate-700/50",
      glow && "hover:shadow-blue-500/20 hover:border-blue-500/30",
      className
    )}>
      {title && (
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <CardTitle className="text-lg md:text-xl font-semibold text-slate-100 flex items-center gap-2">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(
        title ? "px-4 md:px-6 pb-4 md:pb-6" : "pt-4 md:pt-6 px-4 md:px-6 pb-4 md:pb-6"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ModernCard;