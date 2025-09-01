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
import { Search, Calendar, Euro, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Données simulées des transactions
  const transactions = [
    { 
      id: "TXN-001", 
      type: "Vente", 
      customer: "Marie Dupont", 
      items: [
        { product: "Nike Air Max 90", quantity: 1, price: 120 },
        { product: "T-shirt Hugo Boss", quantity: 2, price: 65 }
      ],
      total: 250, 
      date: "2024-01-15", 
      time: "14:30",
      paymentMethod: "Carte Bancaire",
      status: "Complétée"
    },
    { 
      id: "TXN-002", 
      type: "Retour", 
      customer: "Jean Martin", 
      items: [
        { product: "Jean Levi's 501", quantity: 1, price: 95 }
      ],
      total: -95, 
      date: "2024-01-15", 
      time: "11:15",
      paymentMethod: "Remboursement CB",
      status: "Complétée"
    },
    { 
      id: "TXN-003", 
      type: "Vente", 
      customer: "Sophie Laurent", 
      items: [
        { product: "Polo Lacoste Classic", quantity: 1, price: 85 },
        { product: "Converse Chuck Taylor", quantity: 1, price: 70 }
      ],
      total: 155, 
      date: "2024-01-14", 
      time: "16:45",
      paymentMethod: "Espèces",
      status: "Complétée"
    },
    { 
      id: "TXN-004", 
      type: "Vente", 
      customer: "Pierre Dubois", 
      items: [
        { product: "Adidas Ultraboost", quantity: 1, price: 180 }
      ],
      total: 180, 
      date: "2024-01-14", 
      time: "10:20",
      paymentMethod: "Carte Bancaire",
      status: "En attente"
    },
    { 
      id: "TXN-005", 
      type: "Vente", 
      customer: "Alice Bernard", 
      items: [
        { product: "T-shirt Hugo Boss", quantity: 3, price: 65 }
      ],
      total: 195, 
      date: "2024-01-13", 
      time: "15:10",
      paymentMethod: "Carte Bancaire",
      status: "Complétée"
    },
  ];

  // Calcul des statistiques
  const stats = {
    totalSales: transactions
      .filter(t => t.type === "Vente" && t.status === "Complétée")
      .reduce((sum, t) => sum + t.total, 0),
    totalReturns: Math.abs(transactions
      .filter(t => t.type === "Retour")
      .reduce((sum, t) => sum + t.total, 0)),
    todayTransactions: transactions.filter(t => t.date === "2024-01-15").length,
    pendingTransactions: transactions.filter(t => t.status === "En attente").length
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.items.some(item => 
        item.product.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDate = !dateFilter || transaction.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Complétée":
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Complétée</Badge>;
      case "En attente":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">En attente</Badge>;
      case "Annulée":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Vente" ? 
      <ShoppingCart className="h-4 w-4 text-primary" /> : 
      <div className="h-4 w-4 text-destructive">↩</div>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-foreground">StockManager Pro</Link>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-xl font-semibold">Transactions</h1>
            </div>
            <Button asChild>
              <Link to="/transactions/new">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Nouvelle Vente
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Euro className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.totalSales.toLocaleString()} €</p>
                  <p className="text-sm text-muted-foreground">Ventes Totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 text-destructive">↩</div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{stats.totalReturns.toLocaleString()} €</p>
                  <p className="text-sm text-muted-foreground">Retours</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar className="h-10 w-10 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{stats.todayTransactions}</p>
                  <p className="text-sm text-muted-foreground">Transactions Aujourd'hui</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <User className="h-10 w-10 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-500">{stats.pendingTransactions}</p>
                  <p className="text-sm text-muted-foreground">En Attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recherche et filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher et Filtrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par ID, client ou produit..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-auto"
                />
                <Button 
                  variant="outline" 
                  onClick={() => setDateFilter("")}
                  size="sm"
                >
                  Effacer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Transactions ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date/Heure</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        {transaction.type}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {transaction.items.map((item, index) => (
                          <div key={index} className="text-muted-foreground">
                            {item.product} (x{item.quantity})
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={transaction.total >= 0 ? "text-primary font-medium" : "text-destructive font-medium"}>
                        {transaction.total >= 0 ? "+" : ""}{transaction.total.toLocaleString()} €
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{transaction.date}</div>
                        <div className="text-muted-foreground">{transaction.time}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
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

export default Transactions;