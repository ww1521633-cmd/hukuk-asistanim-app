'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Question Card Component
 * Displays a single risk analysis question with options
 */
export function QuestionCard({ question, value, onChange, questionNumber }) {
  const [hoveredOption, setHoveredOption] = useState(null);

  const isSingleChoice = question.type === 'single';
  const isMultipleChoice = question.type === 'multiple';

  const handleSingleChange = (optionId) => {
    onChange(question.id, optionId);
  };

  const handleMultipleChange = (optionId, checked) => {
    const currentValues = Array.isArray(value) ? value : [];
    
    if (checked) {
      onChange(question.id, [...currentValues, optionId]);
    } else {
      onChange(question.id, currentValues.filter(id => id !== optionId));
    }
  };

  const isOptionSelected = (optionId) => {
    if (isSingleChoice) {
      return value === optionId;
    } else {
      return Array.isArray(value) && value.includes(optionId);
    }
  };

  return (
    <Card className="border-2 hover:border-primary/50 transition-all">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                Soru {questionNumber}
              </Badge>
              <Badge 
                variant={question.isCritical ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {question.category}
              </Badge>
              {question.isCritical && (
                <Badge variant="destructive" className="text-xs">
                  Kritik
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-relaxed">
              {question.question}
            </CardTitle>
            {question.helpText && (
              <CardDescription className="mt-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>{question.helpText}</span>
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isSingleChoice ? (
          <RadioGroup value={value || ''} onValueChange={handleSingleChange}>
            <div className="space-y-3">
              {question.options.map((option) => {
                const isSelected = isOptionSelected(option.id);
                const isHovered = hoveredOption === option.id;
                
                return (
                  <div
                    key={option.id}
                    onMouseEnter={() => setHoveredOption(option.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`
                      flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : isHovered
                          ? 'border-gray-300 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                    <div className="flex-1">
                      <Label 
                        htmlFor={option.id} 
                        className="text-base font-medium cursor-pointer"
                      >
                        {option.label}
                      </Label>
                      {(isSelected || isHovered) && option.explanation && (
                        <p className="text-sm text-gray-600 mt-2">
                          {option.explanation}
                        </p>
                      )}
                      {option.tags && option.tags.length > 0 && (isSelected || isHovered) && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {option.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = isOptionSelected(option.id);
              const isHovered = hoveredOption === option.id;
              
              return (
                <div
                  key={option.id}
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                  className={`
                    flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : isHovered
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Checkbox
                    id={option.id}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleMultipleChange(option.id, checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={option.id} 
                      className="text-base font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    {(isSelected || isHovered) && option.explanation && (
                      <p className="text-sm text-gray-600 mt-2">
                        {option.explanation}
                      </p>
                    )}
                    {option.tags && option.tags.length > 0 && (isSelected || isHovered) && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {option.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isMultipleChoice && (
          <p className="text-sm text-gray-500 mt-4">
            💡 Birden fazla seçenek işaretleyebilirsiniz.
          </p>
        )}
      </CardContent>
    </Card>
  );
}