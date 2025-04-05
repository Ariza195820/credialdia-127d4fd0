
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calculator as CalculatorIcon, CreditCard } from 'lucide-react';
import { PaymentFrequency } from '@/utils/loan-calculations';

interface LoanInputFormProps {
  loanAmount: number;
  setLoanAmount: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  loanTerm: number;
  setLoanTerm: (value: number) => void;
  paymentFrequency: PaymentFrequency;
  setPaymentFrequency: (value: PaymentFrequency) => void;
  latePaymentRate: number;
  setLatePaymentRate: (value: number) => void;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
  onRecalculate: () => void;
}

const LoanInputForm: React.FC<LoanInputFormProps> = ({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  loanTerm,
  setLoanTerm,
  paymentFrequency,
  setPaymentFrequency,
  latePaymentRate,
  setLatePaymentRate,
  currencySymbol,
  formatCurrency,
  onRecalculate
}) => {
  // State to track if the input field is focused
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
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Crédito</CardTitle>
        <CardDescription>Ajusta los parámetros para simular tu crédito</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interest-rate">Tasa de Interés Mensual</Label>
            <span className="font-medium">{interestRate}%</span>
          </div>
          <Slider
            id="interest-rate"
            min={0}
            max={20}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>20.0%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="loan-term">Plazo (meses)</Label>
            <span className="font-medium">{loanTerm} meses</span>
          </div>
          <Slider
            id="loan-term"
            min={0}
            max={60}
            step={1}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0 meses</span>
            <span>60 meses</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Frecuencia de Pago</Label>
          <ToggleGroup 
            type="single" 
            variant="outline"
            value={paymentFrequency}
            onValueChange={(value) => value && setPaymentFrequency(value as PaymentFrequency)}
            className="justify-start"
          >
            <ToggleGroupItem value="weekly" aria-label="Weekly">
              Semanal
            </ToggleGroupItem>
            <ToggleGroupItem value="biweekly" aria-label="Biweekly">
              Quincenal
            </ToggleGroupItem>
            <ToggleGroupItem value="monthly" aria-label="Monthly">
              Mensual
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="late-payment">Interés por Mora (%)</Label>
            <span className="font-medium">{latePaymentRate}%</span>
          </div>
          <Slider
            id="late-payment"
            min={0}
            max={2}
            step={0.1}
            value={[latePaymentRate]}
            onValueChange={(value) => setLatePaymentRate(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>2.0%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button variant="outline" className="w-full" onClick={onRecalculate}>
            <CalculatorIcon className="mr-2 h-4 w-4" /> Recalcular
          </Button>
          <Button className="w-full bg-finance-600 hover:bg-finance-700">
            <CreditCard className="mr-2 h-4 w-4" /> Solicitar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanInputForm;
