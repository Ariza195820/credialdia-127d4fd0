
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface LoanAmountFieldProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
}

const LoanAmountField: React.FC<LoanAmountFieldProps> = ({
  loanAmount,
  setLoanAmount,
  currencySymbol,
  formatCurrency
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [manualInputValue, setManualInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setManualInputValue(value);
    
    const numericValue = parseInt(value, 10);
    
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 200000000) {
      setLoanAmount(numericValue);
    } else if (value === '') {
      // If the input is empty, don't change the loan amount yet
      // This provides a better UX when clearing the field
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setManualInputValue('');
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    // If the field is empty when blurring, revert to the current loan amount
    if (manualInputValue === '') {
      setManualInputValue(loanAmount.toString());
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="loan-amount">Monto del Crédito</Label>
        <span className="font-medium">{formatCurrency(loanAmount)}</span>
      </div>
      <Slider
        id="loan-amount"
        min={1}
        max={200000000}
        step={1}
        value={[loanAmount]}
        onValueChange={(value) => setLoanAmount(value[0])}
        className="py-4"
      />
      <div className="pt-2">
        <Label htmlFor="manual-loan-amount" className="text-sm">Ingresa el monto manualmente:</Label>
        <Input
          id="manual-loan-amount"
          type="text"
          className="mt-1"
          value={isInputFocused ? manualInputValue : formatCurrency(loanAmount).replace(/[^\d,.]/g, '')}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Ingresa el monto del crédito"
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <span>{formatCurrency(1)}</span>
        <span>{formatCurrency(200000000)}</span>
      </div>
    </div>
  );
};

export default LoanAmountField;
