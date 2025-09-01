import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Store } from "lucide-react";

interface Store {
  id: number;
  name: string;
}

interface StoreSelectorProps {
  stores: Store[];
  selectedStore: number | null;
  onStoreChange: (storeId: number) => void;
  label?: string;
  placeholder?: string;
}

const StoreSelector = ({ 
  stores, 
  selectedStore, 
  onStoreChange, 
  label = "Magasin",
  placeholder = "Sélectionner un magasin..."
}: StoreSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Store className="h-4 w-4" />
        {label}
      </Label>
      <Select 
        value={selectedStore?.toString()} 
        onValueChange={(value) => onStoreChange(parseInt(value))}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {stores.map((store) => (
            <SelectItem key={store.id} value={store.id.toString()}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StoreSelector;