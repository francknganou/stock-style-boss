import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, TrendingDown, ShoppingCart, Users, AlertTriangle, Store, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Données simulées pour le tableau de bord
  const dashboardData = {
    totalStock: 1250,
    stockValue: 45600,
    lowStockItems: 8,
    todaySales: 12,
    weeklyEntries: 45,
    weeklyExits: 38,
    totalCategories: 4
  };

  const recentTransactions = [
    { id: 1, type: "Entrée", product: "Nike Air Max", quantity: 10, date: "2024-01-15" },
    { id: 2, type: "Sortie", product: "Adidas Sneakers", quantity: 3, date: "2024-01-15" },
    { id: 3, type: "Entrée", product: "Polo Lacoste", quantity: 15, date: "2024-01-14" },
    { id: 4, type: "Sortie", product: "Jean Levis", quantity: 2, date: "2024-01-14" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">StockManager Pro</h1>
            <nav className="flex gap-2">
              <Button variant="outline" asChild className="hover:bg-primary/10 hover:text-primary border-primary/20">
                <Link to="/products">Produits</Link>
              </Button>
              <Button variant="outline" asChild className="hover:bg-accent/10 hover:text-accent border-accent/20">
                <Link to="/stock">Stock</Link>
              </Button>
              <Button variant="outline" asChild className="hover:bg-secondary/20 hover:text-secondary-foreground border-secondary/30">
                <Link to="/stores">Magasins</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/transactions">Transactions</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tableau de Bord</h2>
          <p className="text-muted-foreground">Vue d'ensemble de votre boutique de vêtements et chaussures</p>
        </div>

        {/* Métriques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{dashboardData.totalStock}</div>
              <p className="text-xs text-muted-foreground">articles en stock</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{dashboardData.stockValue.toLocaleString()} €</div>
              <p className="text-xs text-muted-foreground">valeur totale</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes Aujourd'hui</CardTitle>
              <ShoppingCart className="h-4 w-4 text-secondary-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-foreground">{dashboardData.todaySales}</div>
              <p className="text-xs text-muted-foreground">articles vendus</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Faible</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{dashboardData.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">articles à réapprovisionner</p>
            </CardContent>
          </Card>
        </div>

        {/* Entrées/Sorties cette semaine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Mouvements cette semaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Entrées</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      +{dashboardData.weeklyEntries}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sorties</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                      -{dashboardData.weeklyExits}
                    </Badge>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center font-medium">
                    <span>Solde net</span>
                    <Badge variant="outline" className="text-primary">
                      +{dashboardData.weeklyEntries - dashboardData.weeklyExits}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={transaction.type === "Entrée" ? "secondary" : "outline"}>
                        {transaction.type}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{transaction.product}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {transaction.type === "Entrée" ? "+" : "-"}{transaction.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions rapides */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col gap-2 bg-primary hover:bg-primary/90" asChild>
                <Link to="/products">
                  <Package className="h-6 w-6" />
                  Gérer Produits
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-accent hover:bg-accent/10 hover:text-accent" asChild>
                <Link to="/stock">
                  <BarChart3 className="h-6 w-6" />
                  Voir Stock
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-secondary hover:bg-secondary/20 hover:text-secondary-foreground" asChild>
                <Link to="/stores">
                  <Store className="h-6 w-6" />
                  Gérer Magasins
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 border-warning hover:bg-warning/20 hover:text-warning-foreground" asChild>
                <Link to="/transactions">
                  <ShoppingCart className="h-6 w-6" />
                  Transactions
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
