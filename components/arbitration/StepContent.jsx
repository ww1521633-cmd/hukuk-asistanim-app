'use client';

import { DynamicField } from './DynamicField';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * Step Content Component
 * Renders current step's fields with validation
 */
export function StepContent({ step, formData, onFieldChange, errors = {} }) {
  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            Adım {step.id}
          </Badge>
        </div>
        <CardTitle className="text-2xl">{step.title}</CardTitle>
        <CardDescription>{step.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {step.fields.map((field) => (
            <DynamicField
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={onFieldChange}
              error={errors[field.id]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
