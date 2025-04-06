
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Clock } from 'lucide-react';
import { format } from 'date-fns';

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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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

  const getExchangeRates = async () => {
    setIsRefreshing(true);
    try {
      // In a real application, you would fetch real exchange rates from an API like:
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      // const data = await response.json();
      // setExchangeRates(data.rates);
      
      // For demo purposes, we'll use dynamic mock rates with slight variations based on time
      const now = new Date();
      const hourFactor = now.getHours() / 24; // Value between 0-1 based on hour
      const dayFactor = now.getDate() / 31; // Value between 0-1 based on day of month
      
      const mockExchangeRates: Record<string, number> = {
        'USD': 1.0,
        'EUR': 0.89 + (hourFactor * 0.02), // Small variation based on hour
        'COP': 3700 + (dayFactor * 50), // Variation based on day
        'MXN': 20.5 + (hourFactor * 0.4),
        'BRL': 5.2 + (dayFactor * 0.2),
        'ARS': 350 + (hourFactor * 5),
        'CLP': 880 + (dayFactor * 10),
        'PEN': 3.7 + (hourFactor * 0.1),
      };
      
      setExchangeRates(mockExchangeRates);
      setLastUpdated(now);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial fetch of exchange rates
  useEffect(() => {
    getExchangeRates();
    
    // Refresh rates every 30 minutes
    const interval = setInterval(() => {
      getExchangeRates();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleConvert = () => {
    if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      // Convert first to USD (base currency) and then to the target currency
      const amountInUSD = Number(amount) / exchangeRates[fromCurrency];
      const convertedValue = amountInUSD * exchangeRates[toCurrency];
      
      // Format the result
      const formatted = new Intl.NumberFormat('es', {
        style: 'currency',
        currency: toCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertedValue);
      
      setConvertedAmount(formatted);
    }
  };

  // Perform automatic conversion when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency && Object.keys(exchangeRates).length > 0) {
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
        <CardDescription>Convierta entre diferentes divisas en tiempo real</CardDescription>
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
                1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>Actualizado: {format(lastUpdated, 'dd/MM/yyyy HH:mm:ss')}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-2" 
            onClick={getExchangeRates}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CurrencyConverter;
