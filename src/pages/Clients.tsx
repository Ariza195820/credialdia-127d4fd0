
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, MoreHorizontal, UserPlus, FileText, Eye, Edit, CreditCard, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import ClientDetails from '@/components/clients/ClientDetails';
import NewCreditForm from '@/components/clients/NewCreditForm';

// Mock data for the table
const clients = [
  { id: 1, name: 'Juan Pérez', document: '79845632', email: 'juan.perez@example.com', phone: '3001234567', status: 'active', loans: 2, totalDebt: 4500000, registrationDate: '2023-01-15', creditHistory: [
    { id: 1, amount: 2500000, date: '2023-01-20', status: 'active', remainingAmount: 1800000, payments: 6 },
    { id: 2, amount: 2000000, date: '2023-06-10', status: 'active', remainingAmount: 1700000, payments: 4 }
  ] },
  { id: 2, name: 'María García', document: '52789123', email: 'maria.garcia@example.com', phone: '3109876543', status: 'active', loans: 1, totalDebt: 2000000, registrationDate: '2023-03-22', creditHistory: [
    { id: 3, amount: 2000000, date: '2023-03-25', status: 'active', remainingAmount: 2000000, payments: 2 }
  ] },
  { id: 3, name: 'Carlos Rodríguez', document: '80123456', email: 'carlos.rodriguez@example.com', phone: '3207894561', status: 'inactive', loans: 0, totalDebt: 0, registrationDate: '2023-05-05', creditHistory: [] },
  { id: 4, name: 'Laura Martínez', document: '1020304050', email: 'laura.martinez@example.com', phone: '3152345678', status: 'pending', loans: 1, totalDebt: 1500000, registrationDate: '2023-02-18', creditHistory: [
    { id: 4, amount: 1500000, date: '2023-02-20', status: 'pending', remainingAmount: 1500000, payments: 0 }
  ] },
  { id: 5, name: 'Pedro Sánchez', document: '71234567', email: 'pedro.sanchez@example.com', phone: '3043216789', status: 'active', loans: 3, totalDebt: 7800000, registrationDate: '2022-11-10', creditHistory: [
    { id: 5, amount: 2500000, date: '2022-11-15', status: 'active', remainingAmount: 2300000, payments: 8 },
    { id: 6, amount: 3000000, date: '2023-02-10', status: 'active', remainingAmount: 2800000, payments: 5 },
    { id: 7, amount: 2300000, date: '2023-07-05', status: 'active', remainingAmount: 2700000, payments: 2 }
  ] },
  { id: 6, name: 'Ana López', document: '52345678', email: 'ana.lopez@example.com', phone: '3167891234', status: 'overdue', loans: 1, totalDebt: 2300000, registrationDate: '2023-04-12', creditHistory: [
    { id: 8, amount: 2300000, date: '2023-04-15', status: 'overdue', remainingAmount: 2300000, payments: 0 }
  ] },
  { id: 7, name: 'Roberto Díaz', document: '80987654', email: 'roberto.diaz@example.com', phone: '3001472583', status: 'active', loans: 2, totalDebt: 5600000, registrationDate: '2022-12-20', creditHistory: [
    { id: 9, amount: 3000000, date: '2022-12-22', status: 'active', remainingAmount: 2600000, payments: 7 },
    { id: 10, amount: 3000000, date: '2023-06-15', status: 'active', remainingAmount: 3000000, payments: 2 }
  ] },
  { id: 8, name: 'Sofía Castro', document: '1098765432', email: 'sofia.castro@example.com', phone: '3209638527', status: 'inactive', loans: 0, totalDebt: 0, registrationDate: '2023-08-01', creditHistory: [] },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newCreditOpen, setNewCreditOpen] = useState(false);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleAddCredit = (clientId: number, amount: number) => {
    // In a real app, this would make an API call to update the database
    console.log(`Added new credit of ${amount} to client ${clientId}`);
    setNewCreditOpen(false);
  };

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gestiona tus clientes y deudores
          </p>
        </div>
        <Link to="/clients/new">
          <Button className="bg-finance-600 hover:bg-finance-700">
            <UserPlus className="mr-2 h-4 w-4" /> Nuevo Cliente
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Activos</TabsTrigger>
            <TabsTrigger value="overdue">En Mora</TabsTrigger>
            <TabsTrigger value="inactive">Inactivos</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, documento, email..."
              className="pl-8 w-full md:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
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
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
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
                            <DropdownMenuItem onClick={() => {
                              setSelectedClient(client);
                              setDetailsOpen(true);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver detalles</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedClient(client);
                              setNewCreditOpen(true);
                            }}>
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
                  ))}
                  {filteredClients.length === 0 && (
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
        </TabsContent>

        <TabsContent value="active">
          {/* Similar content as "all" but filtered for active clients */}
          <Card>
            <CardContent className="p-6">
              <p>Clientes con créditos activos</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          {/* Similar content as "all" but filtered for overdue clients */}
          <Card>
            <CardContent className="p-6">
              <p>Clientes con pagos atrasados</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          {/* Similar content as "all" but filtered for inactive clients */}
          <Card>
            <CardContent className="p-6">
              <p>Clientes inactivos o sin créditos vigentes</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cliente Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogDescription>
              Información detallada del cliente y sus créditos
            </DialogDescription>
          </DialogHeader>
          {selectedClient && <ClientDetails client={selectedClient} />}
        </DialogContent>
      </Dialog>

      {/* New Credit Sheet */}
      <Sheet open={newCreditOpen} onOpenChange={setNewCreditOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Nuevo Crédito</SheetTitle>
            <SheetDescription>
              Añadir un nuevo crédito para {selectedClient?.name}
            </SheetDescription>
          </SheetHeader>
          {selectedClient && (
            <NewCreditForm 
              client={selectedClient} 
              onSubmit={(amount) => handleAddCredit(selectedClient.id, amount)} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Clients;
