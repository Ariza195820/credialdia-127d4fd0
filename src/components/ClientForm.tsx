
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle, User, Home, Briefcase, CreditCard, Bell, ArrowRight } from 'lucide-react';

const ClientForm = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registro de Cliente</h1>
          <p className="text-muted-foreground">
            Ingresa la información del cliente para su registro
          </p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Datos Personales</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Contacto</span>
          </TabsTrigger>
          <TabsTrigger value="employment" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden md:inline">Información Laboral</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Preferencias</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Ingresa los datos básicos del cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-type">Tipo de Cliente</Label>
                  <Select defaultValue="natural">
                    <SelectTrigger id="client-type">
                      <SelectValue placeholder="Selecciona el tipo de cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Persona Natural</SelectItem>
                      <SelectItem value="juridica">Persona Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document-type">Tipo de Documento</Label>
                  <Select defaultValue="cc">
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Selecciona el tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                      <SelectItem value="passport">Pasaporte</SelectItem>
                      <SelectItem value="nit">NIT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document-number">Número de Documento</Label>
                  <Input id="document-number" placeholder="Ej: 1234567890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first-name">Nombres</Label>
                  <Input id="first-name" placeholder="Nombres completos" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name">Apellidos</Label>
                  <Input id="last-name" placeholder="Apellidos completos" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birth-date">Fecha de Nacimiento</Label>
                  <Input id="birth-date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select defaultValue="male">
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecciona el género" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marital-status">Estado Civil</Label>
                  <Select defaultValue="single">
                    <SelectTrigger id="marital-status">
                      <SelectValue placeholder="Selecciona el estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Soltero/a</SelectItem>
                      <SelectItem value="married">Casado/a</SelectItem>
                      <SelectItem value="divorced">Divorciado/a</SelectItem>
                      <SelectItem value="widowed">Viudo/a</SelectItem>
                      <SelectItem value="free-union">Unión Libre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-finance-600 hover:bg-finance-700">
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Ingresa los datos de contacto del cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" placeholder="correo@ejemplo.com" type="email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono Móvil</Label>
                  <Input id="phone" placeholder="Ej: 3001234567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternative-phone">Teléfono Alternativo</Label>
                  <Input id="alternative-phone" placeholder="Ej: 6011234567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección Residencia</Label>
                  <Input id="address" placeholder="Ej: Calle 123 # 45-67" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" placeholder="Ciudad de residencia" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Departamento</Label>
                  <Input id="department" placeholder="Departamento" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address-notes">Notas Adicionales (Dirección)</Label>
                  <Textarea id="address-notes" placeholder="Ej: Apartamento 302, Torre 1, Edificio Aurora" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Atrás</Button>
              <Button className="bg-finance-600 hover:bg-finance-700">
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Laboral</CardTitle>
              <CardDescription>
                Ingresa los datos laborales y financieros del cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employment-status">Situación Laboral</Label>
                  <Select defaultValue="employed">
                    <SelectTrigger id="employment-status">
                      <SelectValue placeholder="Selecciona la situación laboral" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Empleado</SelectItem>
                      <SelectItem value="self-employed">Independiente</SelectItem>
                      <SelectItem value="business-owner">Empresario</SelectItem>
                      <SelectItem value="retired">Jubilado</SelectItem>
                      <SelectItem value="unemployed">Desempleado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-name">Empresa</Label>
                  <Input id="company-name" placeholder="Nombre de la empresa" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input id="position" placeholder="Cargo actual" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employment-time">Tiempo en el Empleo</Label>
                  <Select defaultValue="1-3">
                    <SelectTrigger id="employment-time">
                      <SelectValue placeholder="Selecciona el tiempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less-1">Menos de 1 año</SelectItem>
                      <SelectItem value="1-3">1 a 3 años</SelectItem>
                      <SelectItem value="3-5">3 a 5 años</SelectItem>
                      <SelectItem value="more-5">Más de 5 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-income">Ingreso Mensual</Label>
                  <Input id="monthly-income" placeholder="Ej: 2000000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-income">Ingresos Adicionales</Label>
                  <Input id="additional-income" placeholder="Ej: 500000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Dirección Empresa</Label>
                  <Input id="company-address" placeholder="Dirección de la empresa" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-phone">Teléfono Empresa</Label>
                  <Input id="company-phone" placeholder="Teléfono de la empresa" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Atrás</Button>
              <Button className="bg-finance-600 hover:bg-finance-700">
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
              <CardDescription>
                Configura cómo le enviaremos notificaciones al cliente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Método de Notificación Preferido</Label>
                <RadioGroup defaultValue="email" className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="notification-email" />
                    <Label htmlFor="notification-email" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Correo Electrónico
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="notification-sms" />
                    <Label htmlFor="notification-sms" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      SMS
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="notification-whatsapp" />
                    <Label htmlFor="notification-whatsapp" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      WhatsApp
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Días de Anticipación para Notificaciones</Label>
                <Select defaultValue="3">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona los días" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 día antes</SelectItem>
                    <SelectItem value="3">3 días antes</SelectItem>
                    <SelectItem value="5">5 días antes</SelectItem>
                    <SelectItem value="7">7 días antes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Horario Preferido para Notificaciones</Label>
                <Select defaultValue="morning">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el horario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Mañana (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Tarde (12pm - 6pm)</SelectItem>
                    <SelectItem value="evening">Noche (6pm - 9pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Atrás</Button>
              <Button className="bg-finance-600 hover:bg-finance-700">
                Guardar Cliente <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientForm;
