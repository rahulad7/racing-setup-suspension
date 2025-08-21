import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ModernInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  required?: boolean;
}

const ModernInput: React.FC<ModernInputProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  options = [],
  className,
  required = false
}) => {
  const inputClasses = "bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 text-sm md:text-base w-full";

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(inputClasses, "min-h-[80px] md:min-h-[100px] resize-none")}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={cn(inputClasses, "bg-slate-800/50")}>
              <SelectValue placeholder={placeholder} className="text-slate-300 font-semibold" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-slate-100 focus:bg-slate-700 font-medium">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
          />
        );
      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <Label className="text-xs md:text-sm font-medium text-slate-200">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
};

export default ModernInput;