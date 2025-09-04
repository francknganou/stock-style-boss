import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Search, Package, AlertCircle, Edit, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [stockMovements, setStockMovements] = useState([
    { id: 1, product: "Nike Air Max 90", type: "Entrée", quantity: 20, date: "2024-01-15", user: "Admin", reason: "Réapprovisionnement" },
    { id: 2, product: "Adidas Ultraboost", type: "Sortie", quantity: 5, date: "2024-01-15", user: "Vendeur1", reason: "Vente en magasin" },
    { id: 3, product: "Polo Lacoste Classic", type: "Entrée", quantity: 30, date: "2024-01-14", user: "Admin", reason: "Nouvelle collection" },
    { id: 4, product: "Jean Levi's 501", type: "Sortie", quantity: 8, date: "2024-01-14", user: "Vendeur2", reason: "Rupture suite ventes" },
    { id: 5, product: "T-shirt Hugo Boss", type: "Entrée", quantity: 15, date: "2024-01-13", user: "Admin", reason: "Réapprovisionnement" },
    { id: 6, product: "Converse Chuck Taylor", type: "Sortie", quantity: 3, date: "2024-01-13", user: "Vendeur1", reason: "Vente en ligne" },
  ]);
  const [editMovement, setEditMovement] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { toast } = useToast();

  const stockStats = {
    totalEntries: stockMovements.filter(m => m.type === "Entrée").reduce((sum, m) => sum + m.quantity, 0),
    totalExits: stockMovements.filter(m => m.type === "Sortie").reduce((sum, m) => sum + m.quantity, 0),
    todayMovements: stockMovements.filter(m => m.date === "2024-01-15").length,
    lowStockAlerts: 8
  };

  const filteredMovements = stockMovements.filter(movement => {
    const matchesSearch = movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || 
                         (filter === "entries" && movement.type === "Entrée") ||
                         (filter === "exits" && movement.type === "Sortie");
    return matchesSearch && matchesFilter;
  });

  const handleEditMovement = (movement: any) => {
    setEditMovement(movement);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setStockMovements(stockMovements.map(m => m.id === editMovement.id ? editMovement : m));
    setIsEditOpen(false);
    toast({
      title: "Mouvement modifié",
      description: "Les modifications ont été sauvegardées avec succès.",
    });
  };

  const handlePrintMovements = (type?: string) => {
    const movementsToPrint = type ? stockMovements.filter(m => m.type === type) : stockMovements;
    const title = type ? `Mouvements - ${type}s` : "Tous les Mouvements de Stock";
    
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="text-align: center; color: #333;">${title}</h1>
        <h2 style="text-align: center; color: #666;">${new Date().toLocaleDateString('fr-FR')}</h2>
        <br/>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Produit</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Type</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantité</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Utilisateur</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Motif</th>
            </tr>
          </thead>
          <tbody>
            ${movementsToPrint.map(movement => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${movement.date}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${movement.product}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${movement.type}</td>
                <td style="border: 1px solid #ddd; padding: 8px; color: ${movement.type === 'Entrée' ? '#2563eb' : '#dc2626'};">
                  ${movement.type === 'Entrée' ? '+' : '-'}${movement.quantity}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px;">${movement.user}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${movement.reason}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
    
    toast({
      title: "Impression lancée",
      description: `Le rapport des ${type ? type.toLowerCase() + 's' : 'mouvements'} est en cours d'impression.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-foreground">StockManager Pro</Link>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-xl font-semibold">Gestion du Stock</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/stock/entry">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Entrée Stock
                </Link>
              </Button>
              <Button asChild>
                <Link to="/stock/exit">
                  <TrendingDown className="h-4 w-4 mr-2" />
                  Sortie Stock
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">+{stockStats.totalEntries}</p>
                  <p className="text-sm text-muted-foreground">Entrées Totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingDown className="h-10 w-10 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-destructive">-{stockStats.totalExits}</p>
                  <p className="text-sm text-muted-foreground">Sorties Totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Package className="h-10 w-10 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{stockStats.todayMovements}</p>
                  <p className="text-sm text-muted-foreground">Mouvements Aujourd'hui</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-10 w-10 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-500">{stockStats.lowStockAlerts}</p>
                  <p className="text-sm text-muted-foreground">Alertes Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recherche et filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Historique des Mouvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par produit ou motif..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={filter === "all" ? "default" : "outline"} 
                  onClick={() => setFilter("all")}
                  size="sm"
                >
                  Tous
                </Button>
                <Button 
                  variant={filter === "entries" ? "default" : "outline"} 
                  onClick={() => setFilter("entries")}
                  size="sm"
                >
                  Entrées
                </Button>
                <Button 
                  variant={filter === "exits" ? "default" : "outline"} 
                  onClick={() => setFilter("exits")}
                  size="sm"
                >
                  Sorties
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des mouvements */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Mouvements de Stock ({filteredMovements.length})</CardTitle>
              <div className="flex gap-2">
                <Button onClick={() => handlePrintMovements("Entrée")} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer Entrées
                </Button>
                <Button onClick={() => handlePrintMovements("Sortie")} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer Sorties
                </Button>
                <Button onClick={() => handlePrintMovements()} variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer Tout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell className="font-medium">{movement.product}</TableCell>
                    <TableCell>
                      <Badge variant={movement.type === "Entrée" ? "secondary" : "outline"}>
                        {movement.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={movement.type === "Entrée" ? "text-primary font-medium" : "text-destructive font-medium"}>
                        {movement.type === "Entrée" ? "+" : "-"}{movement.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{movement.user}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{movement.reason}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditMovement(movement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Dialog d'édition */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le mouvement</DialogTitle>
          </DialogHeader>
          {editMovement && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="product">Produit</Label>
                <Input
                  id="product"
                  value={editMovement.product}
                  onChange={(e) => setEditMovement({...editMovement, product: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantité</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editMovement.quantity}
                  onChange={(e) => setEditMovement({...editMovement, quantity: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="reason">Motif</Label>
                <Input
                  id="reason"
                  value={editMovement.reason}
                  onChange={(e) => setEditMovement({...editMovement, reason: e.target.value})}
                />
              </div>
            </div>
          )}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveEdit}>
              Sauvegarder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stock;