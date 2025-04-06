
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrencyDetection } from '@/hooks/use-currency-detection';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PaymentStatistics = () => {
  const { formatCurrency } = useCurrencyDetection();
  
  // Datos simulados de pagos por método
  const paymentMethodData = [
    { name: 'Efectivo', value: 4000 },
    { name: 'Tarjeta de Crédito', value: 3000 },
    { name: 'Tarjeta de Débito', value: 2000 },
    { name: 'Transferencia', value: 2780 },
  ];
  
  // Datos simulados de pagos por mes
  const monthlyData = [
    { name: 'Ene', efectivo: 4000, tarjetaCredito: 2400, tarjetaDebito: 2400, transferencia: 1200 },
    { name: 'Feb', efectivo: 3000, tarjetaCredito: 1398, tarjetaDebito: 2210, transferencia: 3200 },
    { name: 'Mar', efectivo: 2000, tarjetaCredito: 9800, tarjetaDebito: 2290, transferencia: 2200 },
    { name: 'Abr', efectivo: 2780, tarjetaCredito: 3908, tarjetaDebito: 2000, transferencia: 1500 },
    { name: 'May', efectivo: 1890, tarjetaCredito: 4800, tarjetaDebito: 2181, transferencia: 2500 },
    { name: 'Jun', efectivo: 2390, tarjetaCredito: 3800, tarjetaDebito: 2500, transferencia: 1700 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const totalAmount = paymentMethodData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {paymentMethodData.map((item, index) => (
          <Card key={item.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(item.value)}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((item.value / totalAmount) * 100)}% del total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribución de métodos de pago</CardTitle>
            <CardDescription>Porcentaje de pagos por cada método</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Pagos mensuales por método</CardTitle>
            <CardDescription>Comparativa de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="efectivo" name="Efectivo" fill="#0088FE" />
                  <Bar dataKey="tarjetaCredito" name="T. Crédito" fill="#00C49F" />
                  <Bar dataKey="tarjetaDebito" name="T. Débito" fill="#FFBB28" />
                  <Bar dataKey="transferencia" name="Transferencia" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentStatistics;
