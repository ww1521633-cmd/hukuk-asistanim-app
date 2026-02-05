'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

/**
 * Dynamic Field Component
 * Renders different input types based on field configuration
 */
export function DynamicField({ field, value, onChange, error }) {
  const handleChange = (newValue) => {
    onChange(field.id, newValue);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'tel':
        return (
          <Input
            id={field.id}
            type={field.type}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={cn(
              'w-full',
              error && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={field.id}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={cn(
              'w-full resize-none',
              error && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        );

      case 'number':
        return (
          <Input
            id={field.id}
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            className={cn(
              'w-full',
              error && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        );

      case 'date':
        return (
          <Input
            id={field.id}
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={cn(
              'w-full',
              error && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={handleChange}>
            <SelectTrigger 
              className={cn(
                'w-full',
                error && 'border-red-500 focus-visible:ring-red-500'
              )}
            >
              <SelectValue placeholder="Seçiniz..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value || false}
              onCheckedChange={handleChange}
              className={cn(
                error && 'border-red-500'
              )}
            />
            <Label
              htmlFor={field.id}
              className="text-sm font-normal cursor-pointer"
            >
              {field.label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  // Boolean fields have label inline
  if (field.type === 'boolean') {
    return (
      <div className="space-y-2">
        {renderField()}
        {field.help_text && (
          <p className="text-xs text-gray-500">{field.help_text}</p>
        )}
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={field.id} className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {field.help_text && (
        <p className="text-xs text-gray-500">{field.help_text}</p>
      )}
      {renderField()}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
