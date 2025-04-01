
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator as CalculatorIcon, Calendar, CreditCard, Save, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Calculator = () => {
  const { toast } = useToast();
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [latePaymentRate, setLatePaymentRate] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [isLoading, setIsLoading] = useState(true);

  // Detect user location and set currency
  useEffect(() => {
    const detectCurrency = async () => {
      setIsLoading(true);
      try {
        // Try to get geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use coordinates to get country info
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                // Set currency based on country
                if (data.countryCode) {
                  switch(data.countryCode) {
                    case 'CO':
                      setCurrency('COP');
                      setCurrencySymbol('$');
                      break;
                    case 'MX':
                      setCurrency('MXN');
                      setCurrencySymbol('$');
                      break;
                    case 'BR':
                      setCurrency('BRL');
                      setCurrencySymbol('R$');
                      break;
                    case 'AR':
                      setCurrency('ARS');
                      setCurrencySymbol('$');
                      break;
                    case 'CL':
                      setCurrency('CLP');
                      setCurrencySymbol('$');
                      break;
                    case 'PE':
                      setCurrency('PEN');
                      setCurrencySymbol('S/');
                      break;
                    case 'ES':
                      setCurrency('EUR');
                      setCurrencySymbol('€');
                      break;
                    default:
                      setCurrency('USD');
                      setCurrencySymbol('$');
                  }
                  
                  toast({
                    title: "Ubicación detectada",
                    description: `Ubicación: ${data.countryName}. Moneda: ${currency}`,
                  });
                }
              } catch (error) {
                console.error("Error fetching country data:", error);
                toast({
                  variant: "destructive",
                  title: "Error de localización",
                  description: "No se pudo determinar la moneda local. Usando USD por defecto.",
                });
              }
              setIsLoading(false);
            },
            (error) => {
              console.error("Geolocation error:", error);
              toast({
                variant: "destructive",
                title: "Error de localización",
                description: "No se pudo acceder a su ubicación. Usando USD por defecto.",
              });
              setIsLoading(false);
            }
          );
        } else {
          toast({
            variant: "destructive",
            title: "Geolocalización no soportada",
            description: "Su navegador no soporta geolocalización. Usando USD por defecto.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in geolocation process:", error);
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, []);

  // Calculate loan details
  useEffect(() => {
    // Don't calculate if values are 0
    if (loanAmount === 0 || interestRate === 0 || loanTerm === 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setAmortizationSchedule([]);
      return;
    }

    // Calculate frequency factor
    let frequencyFactor = 1;
    switch (paymentFrequency) {
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

    // Monthly interest rate
    const monthlyRate = interestRate / 100 / frequencyFactor;
    
    // Calculate monthly payment
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
    
    setMonthlyPayment(payment);
    setTotalPayment(payment * loanTerm);
    setTotalInterest(payment * loanTerm - loanAmount);

    // Generate amortization schedule
    const schedule = [];
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

    setAmortizationSchedule(schedule);
  }, [loanAmount, interestRate, loanTerm, paymentFrequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
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
                min={0}
                max={50000000}
                step={500000}
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0</span>
                <span>{currencySymbol}50M</span>
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
                max={5}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>5.0%</span>
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
                onValueChange={(value) => value && setPaymentFrequency(value)}
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
              <Button variant="outline" className="w-full">
                <CalculatorIcon className="mr-2 h-4 w-4" /> Recalcular
              </Button>
              <Button className="w-full bg-finance-600 hover:bg-finance-700">
                <CreditCard className="mr-2 h-4 w-4" /> Solicitar
              </Button>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
};

export default Calculator;
