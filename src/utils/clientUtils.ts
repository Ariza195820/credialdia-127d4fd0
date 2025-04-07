
import { Badge } from '@/components/ui/badge';
import React from 'react';

export interface Credit {
  id: number;
  amount: number;
  date: string;
  status: string;
  remainingAmount: number;
  payments: number;
}

export interface Client {
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

// Mock data for the table
export const clients = [
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

export const getStatusBadge = (status: string) => {
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

export const filterClients = (clients: Client[], searchTerm: string) => {
  return clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.document.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );
};
