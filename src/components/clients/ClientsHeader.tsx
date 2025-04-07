
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const ClientsHeader = () => {
  return (
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
  );
};

export default ClientsHeader;
