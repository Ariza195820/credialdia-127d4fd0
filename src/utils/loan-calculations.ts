
export type AmortizationRow = {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
};

export type LoanCalculationResult = {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
};

export type PaymentFrequency = 'daily' | 'weekly' | 'biweekly' | 'monthly';

export function calculateLoanDetails(
  loanAmount: number,
  interestRate: number,
  loanTerm: number,
  paymentFrequency: PaymentFrequency
): LoanCalculationResult {
  // Don't calculate if values are 0
  if (loanAmount === 0 || interestRate === 0 || loanTerm === 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      amortizationSchedule: []
    };
  }

  // Calculate frequency factor
  let frequencyFactor = 1;
  switch (paymentFrequency) {
    case 'daily':
      frequencyFactor = 30; // Approximately 30 days per month
      break;
    case 'weekly':
      frequencyFactor = 52 / 12;
      break;
    case 'biweekly':
      frequencyFactor = 26 / 12;
      break;
    case 'monthly':
      frequencyFactor = 1;
      break;
    default:
      frequencyFactor = 1;
  }

  // Monthly interest rate (convert from percentage to decimal)
  const monthlyRate = interestRate / 100 / frequencyFactor;
  
  // Calculate payment
  let payment = 0;
  if (monthlyRate === 0) {
    // If interest rate is 0%, simple division
    payment = loanAmount / loanTerm;
  } else {
    // Standard formula for calculating payment with interest
    payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
  }
  
  const totalPayment = payment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  // Generate amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalPrincipal = 0;
  let totalInterestPaid = 0;

  for (let i = 1; i <= loanTerm; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = payment - interestPayment;
    
    balance -= principalPayment;
    totalPrincipal += principalPayment;
    totalInterestPaid += interestPayment;
    
    schedule.push({
      period: i,
      payment: payment,
      principal: principalPayment,
      interest: interestPayment,
      balance: balance > 0 ? balance : 0,
      totalPrincipal,
      totalInterest: totalInterestPaid
    });
  }

  return {
    monthlyPayment: payment,
    totalPayment,
    totalInterest,
    amortizationSchedule: schedule
  };
}
