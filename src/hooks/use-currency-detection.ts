
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type CurrencyInfo = {
  currency: string;
  currencySymbol: string;
};

export function useCurrencyDetection() {
  const { toast } = useToast();
  const [currency, setCurrency] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      setIsLoading(true);
      try {
        // Try to get geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use coordinates to get country info
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                
                // Set currency based on country
                if (data.countryCode) {
                  switch(data.countryCode) {
                    case 'CO':
                      setCurrency('COP');
                      setCurrencySymbol('$');
                      break;
                    case 'MX':
                      setCurrency('MXN');
                      setCurrencySymbol('$');
                      break;
                    case 'BR':
                      setCurrency('BRL');
                      setCurrencySymbol('R$');
                      break;
                    case 'AR':
                      setCurrency('ARS');
                      setCurrencySymbol('$');
                      break;
                    case 'CL':
                      setCurrency('CLP');
                      setCurrencySymbol('$');
                      break;
                    case 'PE':
                      setCurrency('PEN');
                      setCurrencySymbol('S/');
                      break;
                    case 'ES':
                      setCurrency('EUR');
                      setCurrencySymbol('€');
                      break;
                    default:
                      setCurrency('USD');
                      setCurrencySymbol('$');
                  }
                  
                  toast({
                    title: "Ubicación detectada",
                    description: `Ubicación: ${data.countryName}. Moneda: ${currency}`,
                  });
                }
              } catch (error) {
                console.error("Error fetching country data:", error);
                toast({
                  variant: "destructive",
                  title: "Error de localización",
                  description: "No se pudo determinar la moneda local. Usando USD por defecto.",
                });
              }
              setIsLoading(false);
            },
            (error) => {
              console.error("Geolocation error:", error);
              toast({
                variant: "destructive",
                title: "Error de localización",
                description: "No se pudo acceder a su ubicación. Usando USD por defecto.",
              });
              setIsLoading(false);
            }
          );
        } else {
          toast({
            variant: "destructive",
            title: "Geolocalización no soportada",
            description: "Su navegador no soporta geolocalización. Usando USD por defecto.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in geolocation process:", error);
        setIsLoading(false);
      }
    };

    detectCurrency();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return { 
    currency, 
    currencySymbol, 
    isLoading, 
    formatCurrency 
  };
}
