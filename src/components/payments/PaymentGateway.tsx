import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useCurrencyDetection } from '@/hooks/use-currency-detection';
import { DollarSign, CreditCard, Building, Wallet } from 'lucide-react';

const PaymentGateway = () => {
  const { toast } = useToast();
  const { currency, currencySymbol, formatCurrency } = useCurrencyDetection();
  const [amount, setAmount] = useState("100");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [paymentGateway, setPaymentGateway] = useState("dpagos");
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulación del procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Pago procesado",
        description: `Tu pago de ${formatCurrency(Number(amount))} ha sido procesado exitosamente mediante ${getPaymentMethodName(paymentMethod)} a través de ${getGatewayName(paymentGateway)}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo procesar el pago.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "credit": return "Tarjeta de Crédito";
      case "debit": return "Tarjeta de Débito";
      case "transfer": return "Transferencia Bancaria";
      case "cash": return "Efectivo";
      default: return method;
    }
  };

  const getGatewayName = (gateway: string) => {
    switch (gateway) {
      case "dpagos": return "D'Pagos Móvil";
      case "dlocal": return "D'Local";
      case "pse": return "PSE";
      default: return gateway;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Realizar Pago</CardTitle>
          <CardDescription>Seleccione su método de pago preferido</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto a pagar</Label>
              <div className="flex items-center">
                <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">
                  {currencySymbol}
                </span>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="rounded-l-none"
                  placeholder="100.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Plataforma de pago</Label>
              <Select value={paymentGateway} onValueChange={setPaymentGateway}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dpagos">D'Pagos Móvil</SelectItem>
                  <SelectItem value="dlocal">D'Local</SelectItem>
                  <SelectItem value="pse">PSE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Método de pago</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard size={16} />
                    <span>Tarjeta de crédito</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard size={16} />
                    <span>Tarjeta de débito</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer">
                    <Building size={16} />
                    <span>Transferencia</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                    <Wallet size={16} />
                    <span>Efectivo</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Procesando..." : `Pagar ${formatCurrency(Number(amount))}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información de Pago</CardTitle>
          <CardDescription>Detalles de la transacción</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monto:</span>
            <span className="font-medium">{formatCurrency(Number(amount))}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Método:</span>
            <span className="font-medium">{getPaymentMethodName(paymentMethod)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plataforma:</span>
            <span className="font-medium">{getGatewayName(paymentGateway)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Moneda:</span>
            <span className="font-medium">{currency}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center gap-4 w-full">
            <img src="https://via.placeholder.com/60x30?text=D'Pagos" alt="D'Pagos Móvil" className="h-8 object-contain" />
            <img src="https://via.placeholder.com/60x30?text=D'Local" alt="D'Local" className="h-8 object-contain" />
            <img src="https://via.placeholder.com/60x30?text=PSE" alt="PSE" className="h-8 object-contain" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentGateway;
