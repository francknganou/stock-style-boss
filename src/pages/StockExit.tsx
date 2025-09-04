import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import BackButton from "@/components/BackButton";
import StoreSelector from "@/components/StoreSelector";
import { useToast } from "@/hooks/use-toast";

const StockExit = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  
  const stores = [
    { id: 1, name: "Boutique Centre-Ville" },
    { id: 2, name: "Boutique Gombe" },
    { id: 3, name: "Boutique Lemba" }
  ];
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    reason: "",
    customer: "",
    unitPrice: "",
    notes: ""
  });
  const [exitDate, setExitDate] = useState<Date>(new Date());

  const products = [
    "Nike Air Max 90",
    "Adidas Ultraboost", 
    "Polo Lacoste Classic",
    "Jean Levi's 501",
    "T-shirt Hugo Boss",
    "Converse Chuck Taylor"
  ];

  const reasons = [
    "Vente en magasin",
    "Vente en ligne",
    "Retour fournisseur",
    "Transfert entre magasins",
    "Perte/Vol",
    "Promotion",
    "Autre"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStore || !formData.product || !formData.quantity || !formData.reason) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sortie de stock enregistrée",
      description: `-${formData.quantity} ${formData.product} retiré du stock`,
    });
    
    navigate("/stock");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <BackButton />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="text-center bg-gradient-to-r from-destructive/10 to-orange-500/10 rounded-t-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-destructive/20">
                  <TrendingDown className="h-8 w-8 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Sortie de Stock</CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sélection du magasin */}
                <div>
                  <Label htmlFor="store">Magasin *</Label>
                  <div className="mt-1">
                    <StoreSelector 
                      stores={stores}
                      selectedStore={selectedStore}
                      onStoreChange={setSelectedStore}
                    />
                  </div>
                </div>

                {/* Date de sortie */}
                <div>
                  <Label htmlFor="exitDate">Date de sortie *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !exitDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {exitDate ? format(exitDate, "PPP", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={exitDate}
                        onSelect={(date) => date && setExitDate(date)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Produit */}
                <div>
                  <Label htmlFor="product">Produit *</Label>
                  <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionner un produit" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product} value={product}>{product}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantité et Prix unitaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantité *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="5"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitPrice">Prix unitaire (FCFA)</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      placeholder="60000"
                      value={formData.unitPrice}
                      onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Raison et Client */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reason">Motif *</Label>
                    <Select value={formData.reason} onValueChange={(value) => handleInputChange("reason", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionner un motif" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="customer">Client</Label>
                    <Input
                      id="customer"
                      placeholder="Nom du client"
                      value={formData.customer}
                      onChange={(e) => handleInputChange("customer", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Informations complémentaires..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Total */}
                {formData.quantity && formData.unitPrice && (
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total de la vente:</span>
                      <span className="text-lg font-bold text-accent">
                        {(parseInt(formData.quantity) * parseInt(formData.unitPrice)).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                )}

                {/* Boutons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/stock")}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-destructive to-orange-500">
                    Enregistrer la sortie
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockExit;