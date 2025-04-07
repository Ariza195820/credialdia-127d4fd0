
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Eye, Edit, CreditCard, FileText, MoreHorizontal } from 'lucide-react';

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

interface ClientsTableRowProps {
  client: Client;
  onViewDetails: (client: Client) => void;
  onNewCredit: (client: Client) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ClientsTableRow = ({ client, onViewDetails, onNewCredit, getStatusBadge }: ClientsTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{client.name}</span>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="p-2">
                <p className="font-medium mb-1">Información Personal</p>
                <p>Documento: {client.document}</p>
                <p>Email: {client.email}</p>
                <p>Teléfono: {client.phone}</p>
                <p>Cliente desde: {client.registrationDate}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>{client.document}</TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex flex-col">
          <span className="text-sm font-medium">{client.email}</span>
          <span className="text-xs text-muted-foreground">{client.phone}</span>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(client.status)}</TableCell>
      <TableCell className="hidden md:table-cell">{client.loans}</TableCell>
      <TableCell className="text-right font-medium">
        {client.totalDebt > 0 
          ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(client.totalDebt)
          : '-'}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails(client)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNewCredit(client)}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Nuevo crédito</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Historial</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Historial de Créditos</h4>
                    <p className="text-sm text-muted-foreground">Cliente desde: {client.registrationDate}</p>
                    
                    {client.creditHistory.length > 0 ? (
                      <div className="space-y-2 mt-2">
                        {client.creditHistory.map((credit: any) => (
                          <div key={credit.id} className="bg-muted p-2 rounded-md">
                            <div className="flex justify-between">
                              <span className="font-medium">Crédito #{credit.id}</span>
                              <span>{credit.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Monto:</span>
                              <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(credit.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Saldo:</span>
                              <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(credit.remainingAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Pagos realizados:</span>
                              <span>{credit.payments}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Estado:</span>
                              <span>{getStatusBadge(credit.status)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm italic">No hay créditos registrados.</p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default ClientsTableRow;
