
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CurrencyConverterProps {
  defaultCurrency: string;
  currencySymbol: string;
  formatCurrency: (value: number) => string;
  isLoading: boolean;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  defaultCurrency,
  currencySymbol,
  formatCurrency,
  isLoading
}) => {
  const [fromCurrency, setFromCurrency] = useState(defaultCurrency);
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  const currencies = [
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'BRL', name: 'Real Brasileño', symbol: 'R$' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
    { code: 'PEN', name: 'Sol Peruano', symbol: 'S/' },
  ];

  // Tasas de cambio simuladas (en la vida real, se obtendrían desde una API)
  useEffect(() => {
    const mockExchangeRates: Record<string, number> = {
      'USD': 1.0,
      'EUR': 0.89,
      'COP': 3700,
      'MXN': 20.5,
      'BRL': 5.2,
      'ARS': 350,
      'CLP': 880,
      'PEN': 3.7,
    };
    setExchangeRates(mockExchangeRates);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleConvert = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      // Convertir primero a USD (moneda base) y luego a la moneda destino
      const amountInUSD = Number(amount) / exchangeRates[fromCurrency];
      const convertedValue = amountInUSD * exchangeRates[toCurrency];
      
      // Formatear el resultado
      const formatted = new Intl.NumberFormat('es', {
        style: 'currency',
        currency: toCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertedValue);
      
      setConvertedAmount(formatted);
    }
  };

  // Realizar conversión automática al cargar o cuando cambian las variables
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const getCurrencySymbol = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : '$';
  };

  const getCurrencyName = (code: string) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.name : code;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversor de Monedas</CardTitle>
        <CardDescription>Convierta entre diferentes divisas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Monto</label>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">
                  {getCurrencySymbol(fromCurrency)}
                </span>
                <Input
                  value={amount}
                  onChange={handleAmountChange}
                  className="rounded-l-none"
                  placeholder="100.00"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">De</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione moneda origen" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button variant="ghost" size="icon" onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}>
                <ArrowRight className="rotate-90 md:rotate-0" />
              </Button>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">A</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione moneda destino" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center border rounded-lg p-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">
                {amount} {getCurrencySymbol(fromCurrency)} {getCurrencyName(fromCurrency)} =
              </div>
              <div className="text-3xl font-bold mb-2">
                {convertedAmount}
              </div>
              <div className="text-sm text-muted-foreground">
                1 {fromCurrency} = {exchangeRates[toCurrency] / exchangeRates[fromCurrency]} {toCurrency}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
