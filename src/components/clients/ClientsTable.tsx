
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';
import ClientsTableRow from './ClientsTableRow';

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

interface ClientsTableProps {
  clients: Client[];
  onViewDetails: (client: Client) => void;
  onNewCredit: (client: Client) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ClientsTable = ({ clients, onViewDetails, onNewCredit, getStatusBadge }: ClientsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead className="hidden md:table-cell">Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Préstamos</TableHead>
              <TableHead className="text-right">Deuda Total</TableHead>
              <TableHead className="w-14"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <ClientsTableRow 
                  key={client.id}
                  client={client}
                  onViewDetails={onViewDetails}
                  onNewCredit={onNewCredit}
                  getStatusBadge={getStatusBadge}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mb-2" />
                    <p>No se encontraron clientes</p>
                    <p className="text-sm">Intenta con otra búsqueda o agrega un nuevo cliente</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientsTable;
