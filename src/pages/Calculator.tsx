
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Printer } from 'lucide-react';
import { useCurrencyDetection } from '@/hooks/use-currency-detection';
import { calculateLoanDetails, PaymentFrequency } from '@/utils/loan-calculations';
import LoanInputForm from '@/components/calculator/LoanInputForm';
import LoanSummary from '@/components/calculator/LoanSummary';

const Calculator = () => {
  const { currency, currencySymbol, isLoading, formatCurrency } = useCurrencyDetection();
  const [loanAmount, setLoanAmount] = useState(1);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('monthly');
  const [latePaymentRate, setLatePaymentRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);

  // Calculate loan details whenever inputs change
  useEffect(() => {
    handleCalculate();
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  const handleCalculate = () => {
    const { 
      monthlyPayment: calculatedMonthlyPayment, 
      totalPayment: calculatedTotalPayment, 
      totalInterest: calculatedTotalInterest, 
      amortizationSchedule: calculatedSchedule 
    } = calculateLoanDetails(loanAmount, interestRate, loanTerm, paymentFrequency);
    
    setMonthlyPayment(calculatedMonthlyPayment);
    setTotalPayment(calculatedTotalPayment);
    setTotalInterest(calculatedTotalInterest);
    setAmortizationSchedule(calculatedSchedule);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calculadora de Créditos</h1>
          <p className="text-muted-foreground">
            Simula diferentes escenarios para créditos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
          <Button className="bg-finance-600 hover:bg-finance-700">
            <Save className="mr-2 h-4 w-4" /> Guardar Simulación
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LoanInputForm
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          loanTerm={loanTerm}
          setLoanTerm={setLoanTerm}
          paymentFrequency={paymentFrequency}
          setPaymentFrequency={setPaymentFrequency}
          latePaymentRate={latePaymentRate}
          setLatePaymentRate={setLatePaymentRate}
          currencySymbol={currencySymbol}
          formatCurrency={formatCurrency}
          onRecalculate={handleCalculate}
        />

        <LoanSummary
          monthlyPayment={monthlyPayment}
          totalPayment={totalPayment}
          totalInterest={totalInterest}
          amortizationSchedule={amortizationSchedule}
          currency={currency}
          formatCurrency={formatCurrency}
          loanAmount={loanAmount}
          interestRate={interestRate}
          loanTerm={loanTerm}
          paymentFrequency={paymentFrequency}
          latePaymentRate={latePaymentRate}
        />
      </div>
    </div>
  );
};

export default Calculator;
