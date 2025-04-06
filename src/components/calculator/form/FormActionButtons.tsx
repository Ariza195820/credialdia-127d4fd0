
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon, CreditCard } from 'lucide-react';

interface FormActionButtonsProps {
  onRecalculate: () => void;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({ onRecalculate }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <Button variant="outline" className="w-full" onClick={onRecalculate}>
        <CalculatorIcon className="mr-2 h-4 w-4" /> Recalcular
      </Button>
      <Button className="w-full bg-finance-600 hover:bg-finance-700">
        <CreditCard className="mr-2 h-4 w-4" /> Solicitar
      </Button>
    </div>
  );
};

export default FormActionButtons;
