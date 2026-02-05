'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DynamicForm({ fields, onChange, values }) {
  return (
    <div className="space-y-6 p-6 md:p-8 max-w-2xl mx-auto">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id} className="text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {field.help_text && (
            <p className="text-xs text-gray-500">{field.help_text}</p>
          )}

          {field.type === 'textarea' ? (
            <Textarea
              id={field.id}
              value={values[field.id] || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className="w-full resize-none"
            />
          ) : field.type === 'select' ? (
            <Select 
              value={values[field.id] || ''} 
              onValueChange={(value) => onChange(field.id, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seçiniz..." />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              id={field.id}
              type={field.type}
              value={values[field.id] || ''}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              min={field.validation?.min}
              max={field.validation?.max}
              className="w-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}