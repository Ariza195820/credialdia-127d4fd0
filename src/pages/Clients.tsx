
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

// Mock data for the table
const clients = [
  { id: 1, name: 'Juan Pérez', document: '79845632', email: 'juan.perez@example.com', phone: '3001234567', status: 'active', loans: 2, totalDebt: 4500000 },
  { id: 2, name: 'María García', document: '52789123', email: 'maria.garcia@example.com', phone: '3109876543', status: 'active', loans: 1, totalDebt: 2000000 },
  { id: 3, name: 'Carlos Rodríguez', document: '80123456', email: 'carlos.rodriguez@example.com', phone: '3207894561', status: 'inactive', loans: 0, totalDebt: 0 },
  { id: 4, name: 'Laura Martínez', document: '1020304050', email: 'laura.martinez@example.com', phone: '3152345678', status: 'pending', loans: 1, totalDebt: 1500000 },
  { id: 5, name: 'Pedro Sánchez', document: '71234567', email: 'pedro.sanchez@example.com', phone: '3043216789', status: 'active', loans: 3, totalDebt: 7800000 },
  { id: 6, name: 'Ana López', document: '52345678', email: 'ana.lopez@example.com', phone: '3167891234', status: 'overdue', loans: 1, totalDebt: 2300000 },
  { id: 7, name: 'Roberto Díaz', document: '80987654', email: 'roberto.diaz@example.com', phone: '3001472583', status: 'active', loans: 2, totalDebt: 5600000 },
  { id: 8, name: 'Sofía Castro', document: '1098765432', email: 'sofia.castro@example.com', phone: '3209638527', status: 'inactive', loans: 0, totalDebt: 0 },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

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
                      <TableCell className="font-medium">{client.name}</TableCell>
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
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver detalles</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Nuevo crédito</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Historial</span>
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
    </div>
  );
};

export default Clients;
