
import React from 'react';
import { Input } from '@/components/ui/input';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

interface ClientsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ClientsSearch = ({ searchTerm, onSearchChange }: ClientsSearchProps) => {
  return (
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ClientsSearch;
