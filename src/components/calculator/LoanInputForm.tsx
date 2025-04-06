
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentFrequency } from '@/utils/loan-calculations';
import LoanAmountField from './form/LoanAmountField';
import SliderField from './form/SliderField';
import PaymentFrequencyField from './form/PaymentFrequencyField';
import FormActionButtons from './form/FormActionButtons';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Crédito</CardTitle>
        <CardDescription>Ajusta los parámetros para simular tu crédito</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <LoanAmountField 
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          currencySymbol={currencySymbol}
          formatCurrency={formatCurrency}
        />

        <SliderField
          id="interest-rate"
          label="Tasa de Interés Mensual"
          value={interestRate}
          onChange={setInterestRate}
          min={0}
          max={20}
          step={0.1}
          valueFormatter={(value) => `${value}%`}
          minLabel="0%"
          maxLabel="20.0%"
        />

        <SliderField
          id="loan-term"
          label="Plazo (meses)"
          value={loanTerm}
          onChange={setLoanTerm}
          min={0}
          max={60}
          step={1}
          valueFormatter={(value) => `${value} meses`}
          minLabel="0 meses"
          maxLabel="60 meses"
        />

        <PaymentFrequencyField
          paymentFrequency={paymentFrequency}
          setPaymentFrequency={setPaymentFrequency}
        />

        <SliderField
          id="late-payment"
          label="Interés por Mora (%)"
          value={latePaymentRate}
          onChange={setLatePaymentRate}
          min={0}
          max={2}
          step={0.1}
          valueFormatter={(value) => `${value}%`}
          minLabel="0%"
          maxLabel="2.0%"
        />

        <FormActionButtons onRecalculate={onRecalculate} />
      </CardContent>
    </Card>
  );
};

export default LoanInputForm;
