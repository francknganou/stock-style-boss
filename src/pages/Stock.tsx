import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Search, Package, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Données simulées des mouvements de stock
  const stockMovements = [
    { id: 1, product: "Nike Air Max 90", type: "Entrée", quantity: 20, date: "2024-01-15", user: "Admin", reason: "Réapprovisionnement" },
    { id: 2, product: "Adidas Ultraboost", type: "Sortie", quantity: 5, date: "2024-01-15", user: "Vendeur1", reason: "Vente en magasin" },
    { id: 3, product: "Polo Lacoste Classic", type: "Entrée", quantity: 30, date: "2024-01-14", user: "Admin", reason: "Nouvelle collection" },
    { id: 4, product: "Jean Levi's 501", type: "Sortie", quantity: 8, date: "2024-01-14", user: "Vendeur2", reason: "Rupture suite ventes" },
    { id: 5, product: "T-shirt Hugo Boss", type: "Entrée", quantity: 15, date: "2024-01-13", user: "Admin", reason: "Réapprovisionnement" },
    { id: 6, product: "Converse Chuck Taylor", type: "Sortie", quantity: 3, date: "2024-01-13", user: "Vendeur1", reason: "Vente en ligne" },
  ];

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

  return (
    <div className="min-h-screen bg-background">
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
            <CardTitle>Mouvements de Stock ({filteredMovements.length})</CardTitle>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Stock;