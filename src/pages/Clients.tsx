
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ClientDetails from '@/components/clients/ClientDetails';
import NewCreditForm from '@/components/clients/NewCreditForm';
import ClientsHeader from '@/components/clients/ClientsHeader';
import ClientsSearch from '@/components/clients/ClientsSearch';
import ClientsTable from '@/components/clients/ClientsTable';
import { clients, filterClients, getStatusBadge, type Client } from '@/utils/clientUtils';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [newCreditOpen, setNewCreditOpen] = useState(false);

  const filteredClients = filterClients(clients, searchTerm);

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setDetailsOpen(true);
  };

  const handleNewCredit = (client: Client) => {
    setSelectedClient(client);
    setNewCreditOpen(true);
  };

  const handleAddCredit = (clientId: number, amount: number) => {
    // In a real app, this would make an API call to update the database
    console.log(`Added new credit of ${amount} to client ${clientId}`);
    setNewCreditOpen(false);
  };

  return (
    <div className="space-y-6">
      <ClientsHeader />

      <Tabs defaultValue="all" className="w-full">
        <ClientsSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <TabsContent value="all" className="space-y-4">
          <ClientsTable
            clients={filteredClients}
            onViewDetails={handleViewDetails}
            onNewCredit={handleNewCredit}
            getStatusBadge={getStatusBadge}
          />
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

      {/* Cliente Details Dialog - Tamaño ajustado y centrado */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[800px] w-[90%] sm:max-h-[90vh] overflow-y-auto mx-auto my-4">
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
