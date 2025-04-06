import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Users, BarChart3, FileText, Settings, Menu, CreditCard, Bell, Calculator, FolderOpen, Wallet } from 'lucide-react';
const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  const menuItems = [{
    name: 'Inicio',
    icon: <Home size={20} />,
    path: '/',
    section: 'general'
  }, {
    name: 'Clientes',
    icon: <Users size={20} />,
    path: '/clients',
    section: 'client'
  }, {
    name: 'Solicitudes',
    icon: <FileText size={20} />,
    path: '/applications',
    section: 'client'
  }, {
    name: 'Créditos',
    icon: <CreditCard size={20} />,
    path: '/loans',
    section: 'financial'
  }, {
    name: 'Calculadora',
    icon: <Calculator size={20} />,
    path: '/calculator',
    section: 'financial'
  }, {
    name: 'Pagos',
    icon: <Wallet size={20} />,
    path: '/payments',
    section: 'financial'
  }, {
    name: 'Reportes',
    icon: <BarChart3 size={20} />,
    path: '/reports',
    section: 'admin'
  }, {
    name: 'Documentos',
    icon: <FolderOpen size={20} />,
    path: '/documents',
    section: 'admin'
  }, {
    name: 'Notificaciones',
    icon: <Bell size={20} />,
    path: '/notifications',
    section: 'admin'
  }, {
    name: 'Configuración',
    icon: <Settings size={20} />,
    path: '/settings',
    section: 'admin'
  }];
  const clientItems = menuItems.filter(item => item.section === 'client');
  const financialItems = menuItems.filter(item => item.section === 'financial');
  const adminItems = menuItems.filter(item => item.section === 'admin');
  const generalItems = menuItems.filter(item => item.section === 'general');
  const renderMenuItems = (items: typeof menuItems) => {
    return items.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center gap-2 px-3 py-2 rounded-md transition-colors", location.pathname === item.path ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground")}>
        {item.icon}
        {expanded && <span>{item.name}</span>}
      </Link>);
  };
  return <aside className={cn("bg-card border-r border-border flex flex-col transition-all duration-300 z-10", expanded ? "w-64" : "w-16")}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-slate-50">
        {expanded && <h1 className="text-lg font-bold text-green-900">Credialdia</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-green-900">
          <Menu size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4 bg-finance-50">
        <div className="space-y-1">
          {renderMenuItems(generalItems)}
        </div>

        {expanded && <h2 className="font-semibold text-xs uppercase px-3 pt-4 text-green-900">Gestión de Clientes</h2>}
        <div className="space-y-1">
          {renderMenuItems(clientItems)}
        </div>

        {expanded && <h2 className="font-semibold text-xs uppercase px-3 pt-4 text-green-900">Gestión Financiera</h2>}
        <div className="space-y-1">
          {renderMenuItems(financialItems)}
        </div>
        
        {expanded && <h2 className="font-semibold text-xs uppercase px-3 pt-4 text-green-900">Gestión Administrativa</h2>}
        <div className="space-y-1">
          {renderMenuItems(adminItems)}
        </div>
      </div>
    </aside>;
};
export default Sidebar;