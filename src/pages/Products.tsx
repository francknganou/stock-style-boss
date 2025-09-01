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
import { Package, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Données simulées des produits
  const products = [
    { id: 1, name: "Nike Air Max 90", category: "Chaussures", brand: "Nike", price: 120, stock: 25, minStock: 5, status: "En stock" },
    { id: 2, name: "Adidas Ultraboost", category: "Chaussures", brand: "Adidas", price: 180, stock: 3, minStock: 5, status: "Stock faible" },
    { id: 3, name: "Polo Lacoste Classic", category: "Vêtements", brand: "Lacoste", price: 85, stock: 45, minStock: 10, status: "En stock" },
    { id: 4, name: "Jean Levi's 501", category: "Vêtements", brand: "Levi's", price: 95, stock: 0, minStock: 8, status: "Rupture" },
    { id: 5, name: "T-shirt Hugo Boss", category: "Vêtements", brand: "Hugo Boss", price: 65, stock: 18, minStock: 5, status: "En stock" },
    { id: 6, name: "Converse Chuck Taylor", category: "Chaussures", brand: "Converse", price: 70, stock: 32, minStock: 8, status: "En stock" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) return <Badge variant="destructive">Rupture</Badge>;
    if (stock <= minStock) return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock faible</Badge>;
    return <Badge variant="secondary" className="bg-primary/10 text-primary">En stock</Badge>;
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
              <h1 className="text-xl font-semibold">Produits</h1>
            </div>
            <Button asChild>
              <Link to="/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Produit
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
                <Package className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-sm text-muted-foreground">Total Produits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.stock > p.minStock).length}</p>
                  <p className="text-sm text-muted-foreground">En Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold">!</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.stock <= p.minStock && p.stock > 0).length}</p>
                  <p className="text-sm text-muted-foreground">Stock Faible</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <span className="text-destructive font-bold">✕</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</p>
                  <p className="text-sm text-muted-foreground">Rupture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recherche et filtres */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher un produit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, marque ou catégorie..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Liste des produits */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Produits ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Stock Min</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price} €</TableCell>
                    <TableCell>
                      <span className={product.stock <= product.minStock ? "font-bold text-destructive" : ""}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{product.minStock}</TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock, product.minStock)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
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

export default Products;