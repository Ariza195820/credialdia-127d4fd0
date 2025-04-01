
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AmortizationRow } from '@/utils/loan-calculations';
import { PaymentFrequency } from '@/utils/loan-calculations';

interface LoanSummaryProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
  currency: string;
  formatCurrency: (value: number) => string;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: PaymentFrequency;
  latePaymentRate: number;
}

const LoanSummary: React.FC<LoanSummaryProps> = ({
  monthlyPayment,
  totalPayment,
  totalInterest,
  amortizationSchedule,
  currency,
  formatCurrency,
  loanAmount,
  interestRate,
  loanTerm,
  paymentFrequency,
  latePaymentRate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen del Crédito</CardTitle>
        <CardDescription>Resultados de la simulación</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Cuota {paymentFrequency === 'weekly' ? 'Semanal' : paymentFrequency === 'biweekly' ? 'Quincenal' : 'Mensual'}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{formatCurrency(totalPayment)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={amortizationSchedule}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis 
                tickFormatter={(value) => 
                  new Intl.NumberFormat('es', {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(value)
                }
              />
              <Tooltip 
                formatter={(value) => 
                  new Intl.NumberFormat('es', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(Number(value))
                }
              />
              <Area type="monotone" dataKey="balance" stroke="#0abcce" fill="#0abcce" fillOpacity={0.2} name="Saldo" />
              <Area type="monotone" dataKey="totalPrincipal" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Capital Pagado" />
              <Area type="monotone" dataKey="totalInterest" stroke="#f97066" fill="#f97066" fillOpacity={0.2} name="Interés Pagado" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Tabs defaultValue="summary">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="summary">Resumen</TabsTrigger>
            <TabsTrigger value="schedule">Amortización</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Monto del Crédito</p>
                <p className="font-medium">{formatCurrency(loanAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Interés</p>
                <p className="font-medium">{interestRate}% mensual</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plazo</p>
                <p className="font-medium">{loanTerm} meses</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Frecuencia de Pago</p>
                <p className="font-medium">
                  {paymentFrequency === 'weekly' ? 'Semanal' : paymentFrequency === 'biweekly' ? 'Quincenal' : 'Mensual'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total en Intereses</p>
                <p className="font-medium">{formatCurrency(totalInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interés por Mora</p>
                <p className="font-medium">{latePaymentRate}% diario</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="schedule" className="p-0">
            <div className="max-h-60 overflow-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-card z-10">
                  <tr className="border-b text-xs">
                    <th className="py-2 px-4 text-left">Cuota</th>
                    <th className="py-2 px-4 text-right">Pago</th>
                    <th className="py-2 px-4 text-right">Capital</th>
                    <th className="py-2 px-4 text-right">Interés</th>
                    <th className="py-2 px-4 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row) => (
                    <tr key={row.period} className="border-b text-sm">
                      <td className="py-2 px-4 text-left">{row.period}</td>
                      <td className="py-2 px-4 text-right">{formatCurrency(row.payment)}</td>
                      <td className="py-2 px-4 text-right">{formatCurrency(row.principal)}</td>
                      <td className="py-2 px-4 text-right">{formatCurrency(row.interest)}</td>
                      <td className="py-2 px-4 text-right">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanSummary;
