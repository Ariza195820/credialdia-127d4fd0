
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrencyDetection } from '@/hooks/use-currency-detection';
import PaymentGateway from '@/components/payments/PaymentGateway';
import PaymentStatistics from '@/components/payments/PaymentStatistics';
import CurrencyConverter from '@/components/payments/CurrencyConverter';
import { Clock } from 'lucide-react';

const Payments = () => {
  const { currency, currencySymbol, formatCurrency, isLoading } = useCurrencyDetection();
  const [activeTab, setActiveTab] = useState("gateway");

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Pasarela de Pagos</h1>
        <p className="text-muted-foreground">
          Gestione pagos, vea estadísticas y convierta monedas
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="gateway">Pagar</TabsTrigger>
          <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
          <TabsTrigger value="converter">Conversor</TabsTrigger>
        </TabsList>

        <TabsContent value="gateway" className="pt-4">
          <PaymentGateway />
        </TabsContent>

        <TabsContent value="statistics" className="pt-4">
          <PaymentStatistics />
        </TabsContent>

        <TabsContent value="converter" className="pt-4">
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>Las tasas de cambio se actualizan según la fecha y hora actual</span>
          </div>
          <CurrencyConverter 
            defaultCurrency={currency}
            currencySymbol={currencySymbol}
            formatCurrency={formatCurrency}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
