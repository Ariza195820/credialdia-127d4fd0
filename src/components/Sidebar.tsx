
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  Menu, 
  CreditCard, 
  Bell, 
  Calculator
} from 'lucide-react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: <Home size={20} />, 
      path: '/',
      section: 'general' 
    },
    { 
      name: 'Clientes', 
      icon: <Users size={20} />, 
      path: '/clients',
      section: 'client' 
    },
    { 
      name: 'Solicitudes', 
      icon: <FileText size={20} />, 
      path: '/applications',
      section: 'client' 
    },
    { 
      name: 'Créditos', 
      icon: <CreditCard size={20} />, 
      path: '/loans',
      section: 'financial' 
    },
    { 
      name: 'Calculadora', 
      icon: <Calculator size={20} />, 
      path: '/calculator',
      section: 'financial' 
    },
    { 
      name: 'Reportes', 
      icon: <BarChart3 size={20} />, 
      path: '/reports',
      section: 'admin' 
    },
    { 
      name: 'Notificaciones', 
      icon: <Bell size={20} />, 
      path: '/notifications',
      section: 'admin' 
    },
    { 
      name: 'Configuración', 
      icon: <Settings size={20} />, 
      path: '/settings',
      section: 'admin' 
    }
  ];

  // Group the menu items by section
  const clientItems = menuItems.filter(item => item.section === 'client');
  const financialItems = menuItems.filter(item => item.section === 'financial');
  const adminItems = menuItems.filter(item => item.section === 'admin');
  const generalItems = menuItems.filter(item => item.section === 'general');

  const renderMenuItems = (items: typeof menuItems) => {
    return items.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          location.pathname === item.path 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {item.icon}
        {expanded && <span>{item.name}</span>}
      </Link>
    ));
  };

  return (
    <aside
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 z-10",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        {expanded && (
          <h1 className="text-lg font-bold text-finance-700">FinanciaMate</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        <div className="space-y-1">
          {renderMenuItems(generalItems)}
        </div>

        {expanded && <h2 className="font-semibold text-xs uppercase text-muted-foreground px-3 pt-4">Gestión de Clientes</h2>}
        <div className="space-y-1">
          {renderMenuItems(clientItems)}
        </div>

        {expanded && <h2 className="font-semibold text-xs uppercase text-muted-foreground px-3 pt-4">Gestión Financiera</h2>}
        <div className="space-y-1">
          {renderMenuItems(financialItems)}
        </div>
        
        {expanded && <h2 className="font-semibold text-xs uppercase text-muted-foreground px-3 pt-4">Gestión Administrativa</h2>}
        <div className="space-y-1">
          {renderMenuItems(adminItems)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
