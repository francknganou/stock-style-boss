import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Store, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Printer, 
  MapPin,
  Phone,
  User 
} from "lucide-react";
import BackButton from "@/components/BackButton";

const StoreDetail = () => {
  const { id } = useParams();
  
  // Données simulées - remplacer par vraies données
  const store = {
    id: parseInt(id || "1"),
    name: "Boutique Centre-Ville",
    address: "123 Avenue Principale, Kinshasa",
    phone: "+243 81 234 5678",
    manager: "Marie Mukendi",
    status: "Actif",
    createdAt: "2024-01-10",
    photo: "/placeholder.svg"
  };

  const [stockData] = useState({
    entries: [
      { id: 1, product: "Nike Air Max 90", quantity: 10, price: 75000, date: "2024-01-15", supplier: "Nike RDC" },
      { id: 2, product: "T-shirt Hugo Boss", quantity: 20, price: 35000, date: "2024-01-14", supplier: "Fashion Import" },
      { id: 3, product: "Jean Levi's 501", quantity: 15, price: 45000, date: "2024-01-13", supplier: "Levi's Store" },
    ],
    exits: [
      { id: 1, product: "Nike Air Max 90", quantity: 3, price: 85000, date: "2024-01-15", customer: "Vente directe" },
      { id: 2, product: "T-shirt Hugo Boss", quantity: 5, price: 40000, date: "2024-01-14", customer: "Client VIP" },
    ],
    current: [
      { id: 1, product: "Nike Air Max 90", quantity: 7, price: 75000, minStock: 5, status: "Disponible" },
      { id: 2, product: "T-shirt Hugo Boss", quantity: 15, price: 35000, minStock: 10, status: "Disponible" },
      { id: 3, product: "Jean Levi's 501", quantity: 2, price: 45000, minStock: 5, status: "Stock Faible" },
    ]
  });

  const handlePrint = (type: 'entries' | 'exits' | 'current') => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const title = type === 'entries' ? 'Entrées' : type === 'exits' ? 'Sorties' : 'Stock Actuel';
    const data = stockData[type];
    
    let tableHeaders = '';
    let tableRows = '';

    if (type === 'entries') {
      tableHeaders = '<th>Produit</th><th>Quantité</th><th>Prix Unitaire</th><th>Date</th><th>Fournisseur</th>';
      tableRows = data.map((item: any) => 
        `<tr>
          <td>${item.product}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toLocaleString()} FCFA</td>
          <td>${item.date}</td>
          <td>${item.supplier}</td>
        </tr>`
      ).join('');
    } else if (type === 'exits') {
      tableHeaders = '<th>Produit</th><th>Quantité</th><th>Prix Unitaire</th><th>Date</th><th>Client</th>';
      tableRows = data.map((item: any) => 
        `<tr>
          <td>${item.product}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toLocaleString()} FCFA</td>
          <td>${item.date}</td>
          <td>${item.customer}</td>
        </tr>`
      ).join('');
    } else {
      tableHeaders = '<th>Produit</th><th>Quantité</th><th>Prix Unitaire</th><th>Stock Min</th><th>Statut</th>';
      tableRows = data.map((item: any) => 
        `<tr>
          <td>${item.product}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toLocaleString()} FCFA</td>
          <td>${item.minStock}</td>
          <td>${item.status}</td>
        </tr>`
      ).join('');
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rapport ${title} - ${store.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .store-info { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .date { text-align: right; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport ${title}</h1>
            <h2>${store.name}</h2>
          </div>
          <div class="store-info">
            <p><strong>Adresse:</strong> ${store.address}</p>
            <p><strong>Téléphone:</strong> ${store.phone}</p>
            <p><strong>Responsable:</strong> ${store.manager}</p>
          </div>
          <div class="date">
            <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <table>
            <thead>
              <tr>${tableHeaders}</tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Store className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">{store.name}</h1>
                <p className="text-sm text-muted-foreground">Détails et gestion du stock</p>
              </div>
            </div>
            <div className="ml-auto">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {store.status}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Informations du magasin */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Informations du Magasin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{store.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{store.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Responsable</p>
                  <p className="text-sm text-muted-foreground">{store.manager}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Résumé des stocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stockData.entries.length}</p>
                  <p className="text-sm text-muted-foreground">Entrées ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-destructive/20">
                  <TrendingDown className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{stockData.exits.length}</p>
                  <p className="text-sm text-muted-foreground">Sorties ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{stockData.current.length}</p>
                  <p className="text-sm text-muted-foreground">Articles en stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gestion des stocks avec onglets */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Gestion des Stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Stock Actuel</TabsTrigger>
                <TabsTrigger value="entries">Entrées</TabsTrigger>
                <TabsTrigger value="exits">Sorties</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Stock Actuel</h3>
                  <Button onClick={() => handlePrint('current')} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix Unitaire</TableHead>
                      <TableHead>Stock Minimum</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockData.current.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>{item.minStock}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "Disponible" ? "secondary" : "destructive"}>
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="entries" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Entrées de Stock</h3>
                  <Button onClick={() => handlePrint('entries')} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix Unitaire</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Fournisseur</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockData.entries.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-primary">+{item.quantity}</TableCell>
                        <TableCell>{item.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="exits" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Sorties de Stock</h3>
                  <Button onClick={() => handlePrint('exits')} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Prix Unitaire</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockData.exits.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-destructive">-{item.quantity}</TableCell>
                        <TableCell>{item.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.customer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StoreDetail;