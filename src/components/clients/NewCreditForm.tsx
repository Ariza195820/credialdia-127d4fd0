
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Client {
  id: number;
  name: string;
  document: string;
  totalDebt: number;
}

interface NewCreditFormProps {
  client: Client;
  onSubmit: (amount: number) => void;
}

const formSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)), { message: 'Debe ser un número válido' })
    .refine(val => Number(val) > 0, { message: 'El monto debe ser mayor a 0' }),
});

const NewCreditForm = ({ client, onSubmit }: NewCreditFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });
  
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(Number(values.amount));
  };

  const calculateNewTotal = () => {
    const currentAmount = form.watch('amount');
    if (!currentAmount || isNaN(Number(currentAmount))) return client.totalDebt;
    return client.totalDebt + Number(currentAmount);
  };

  return (
    <div className="space-y-6 mt-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 mb-4">
            <h3 className="font-medium">Información del Cliente</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-medium">{client.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documento</p>
                <p>{client.document}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Deuda actual</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(client.totalDebt)}
                </p>
              </div>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto del nuevo crédito (COP)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                          {...field} 
                          placeholder="1,000,000" 
                          className="pl-7" 
                          inputMode="numeric"
                          onChange={(e) => {
                            // Remove non-numeric characters except for dot and comma
                            const value = e.target.value.replace(/[^\d.,]/g, '');
                            field.onChange(value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Nueva deuda total:</span>
                  <span className="font-bold">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(calculateNewTotal())}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-finance-600 hover:bg-finance-700">
                  Agregar Crédito
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCreditForm;
