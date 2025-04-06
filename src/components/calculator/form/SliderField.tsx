
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  valueFormatter: (value: number) => string;
  minLabel?: string;
  maxLabel?: string;
}

const SliderField: React.FC<SliderFieldProps> = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  valueFormatter,
  minLabel,
  maxLabel
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="font-medium">{valueFormatter(value)}</span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        className="py-4"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{minLabel || valueFormatter(min)}</span>
        <span>{maxLabel || valueFormatter(max)}</span>
      </div>
    </div>
  );
};

export default SliderField;
