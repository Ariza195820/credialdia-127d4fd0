
import React from 'react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PaymentFrequency } from '@/utils/loan-calculations';

interface PaymentFrequencyFieldProps {
  paymentFrequency: PaymentFrequency;
  setPaymentFrequency: (value: PaymentFrequency) => void;
}

const PaymentFrequencyField: React.FC<PaymentFrequencyFieldProps> = ({
  paymentFrequency,
  setPaymentFrequency
}) => {
  return (
    <div className="space-y-2">
      <Label>Frecuencia de Pago</Label>
      <ToggleGroup 
        type="single" 
        variant="outline"
        value={paymentFrequency}
        onValueChange={(value) => value && setPaymentFrequency(value as PaymentFrequency)}
        className="justify-start flex-wrap"
      >
        <ToggleGroupItem value="daily" aria-label="Daily">
          Diario
        </ToggleGroupItem>
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
  );
};

export default PaymentFrequencyField;
