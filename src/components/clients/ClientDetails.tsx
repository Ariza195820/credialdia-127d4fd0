
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Credit {
  id: number;
  amount: number;
  date: string;
  status: string;
  remainingAmount: number;
  payments: number;
}

interface Client {
  id: number;
  name: string;
  document: string;
  email: string;
  phone: string;
  status: string;
  loans: number;
  totalDebt: number;
  registrationDate: string;
  creditHistory: Credit[];
}

interface ClientDetailsProps {
  client: Client;
}

const ClientDetails = ({ client }: ClientDetailsProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Activo</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactivo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case 'overdue':
        return <Badge variant="destructive">En Mora</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nombre</p>
            <p>{client.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Documento</p>
            <p>{client.document}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{client.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
            <p>{client.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Estado</p>
            <p>{getStatusBadge(client.status)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Cliente desde</p>
            <p>{client.registrationDate}</p>
          </div>
        </CardContent>
      </Card>

      {/* Credit Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen de Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-sm font-medium text-muted-foreground">Créditos Activos</p>
              <p className="text-2xl font-bold">{client.loans}</p>
            </div>
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-sm font-medium text-muted-foreground">Deuda Total</p>
              <p className="text-2xl font-bold">
                {client.totalDebt > 0 
                  ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(client.totalDebt)
                  : '-'}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-sm font-medium text-muted-foreground">Estado</p>
              <div className="flex justify-center mt-1">
                {getStatusBadge(client.status)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalle de Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          {client.creditHistory.length > 0 ? (
            <div className="space-y-4">
              {client.creditHistory.map((credit) => (
                <div key={credit.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Crédito #{credit.id}</h3>
                    <div>{getStatusBadge(credit.status)}</div>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fecha de inicio</p>
                      <p>{credit.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Monto original</p>
                      <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(credit.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Saldo pendiente</p>
                      <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(credit.remainingAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pagos realizados</p>
                      <p>{credit.payments}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No hay créditos registrados para este cliente.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
