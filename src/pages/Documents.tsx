
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Folder, FolderPlus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';

const Documents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
        <p className="text-muted-foreground">Gestiona los documentos del sistema.</p>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="creditos">Créditos</TabsTrigger>
          <TabsTrigger value="contratos">Contratos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="todos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Folder className="h-4 w-4 mr-2" />
                Nueva Carpeta
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Subir Archivos
              </Button>
            </div>
            <Button size="sm">
              <FolderPlus className="h-4 w-4 mr-2" />
              Añadir Documento
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length: 6}).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Documento {i + 1}
                  </CardTitle>
                  <CardDescription>Actualizado: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Descripción breve del documento y su contenido.</p>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted-foreground">PDF · 2.5MB</span>
                    <Button variant="ghost" size="sm">Ver detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clientes" className="space-y-4">
          <p className="text-muted-foreground">Documentación relacionada con los clientes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length: 3}).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-green-500" />
                    Cliente Doc {i + 1}
                  </CardTitle>
                  <CardDescription>Actualizado: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Documentación de cliente.</p>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted-foreground">PDF · 1.2MB</span>
                    <Button variant="ghost" size="sm">Ver detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="creditos" className="space-y-4">
          <p className="text-muted-foreground">Documentación relacionada con créditos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length: 2}).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-amber-500" />
                    Crédito Doc {i + 1}
                  </CardTitle>
                  <CardDescription>Actualizado: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Documentación de crédito.</p>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted-foreground">PDF · 0.8MB</span>
                    <Button variant="ghost" size="sm">Ver detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="contratos" className="space-y-4">
          <p className="text-muted-foreground">Contratos y documentos legales.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({length: 4}).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Contrato {i + 1}
                  </CardTitle>
                  <CardDescription>Actualizado: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Contrato legal.</p>
                  <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted-foreground">PDF · 1.5MB</span>
                    <Button variant="ghost" size="sm">Ver detalles</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
