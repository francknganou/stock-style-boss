import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Store, MapPin, Phone, Plus, Edit, Eye, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const Stores = () => {
  const [stores, setStores] = useState([
    { 
      id: 1, 
      name: "Boutique Centre-Ville", 
      address: "123 Avenue Principale, Kinshasa",
      phone: "+243 81 234 5678",
      manager: "Marie Mukendi",
      status: "Actif",
      createdAt: "2024-01-10",
      photo: "/placeholder.svg",
      products: ["Nike Air Max 90", "T-shirt Hugo Boss", "Jean Levi's 501"]
    },
    { 
      id: 2, 
      name: "Boutique Gombe", 
      address: "456 Bd du 30 Juin, Gombe",
      phone: "+243 82 345 6789",
      manager: "Jean Kabila",
      status: "Actif",
      createdAt: "2024-01-15",
      photo: "/placeholder.svg", 
      products: ["Adidas Ultraboost", "Polo Lacoste Classic", "Converse Chuck Taylor"]
    },
  ]);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    status: "",
    statusDate: new Date(),
    photo: "",
    description: ""
  });

  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    phone: "",
    manager: "",
    description: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateStore = () => {
    if (newStore.name && newStore.address) {
      const store = {
        id: stores.length + 1,
        name: newStore.name,
        address: newStore.address,
        phone: newStore.phone,
        manager: newStore.manager,
        status: "Actif",
        createdAt: new Date().toISOString().split('T')[0],
        photo: "/placeholder.svg",
        products: []
      };
      setStores([...stores, store]);
      setNewStore({ name: "", address: "", phone: "", manager: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-primary">StockManager Pro</Link>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Gestion des Magasins
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau Magasin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Créer un nouveau magasin</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="name">Nom du magasin *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Boutique Centre-Ville"
                      value={newStore.name}
                      onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Textarea
                      id="address"
                      placeholder="Adresse complète du magasin"
                      value={newStore.address}
                      onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      placeholder="+243 81 234 5678"
                      value={newStore.phone}
                      onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="manager">Responsable</Label>
                    <Input
                      id="manager"
                      placeholder="Nom du responsable"
                      value={newStore.manager}
                      onChange={(e) => setNewStore({...newStore, manager: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description du magasin (optionnel)"
                      value={newStore.description}
                      onChange={(e) => setNewStore({...newStore, description: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateStore} className="bg-primary hover:bg-primary/90">
                    Créer le magasin
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stores.length}</p>
                  <p className="text-sm text-muted-foreground">Magasins Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/20">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">3</p>
                  <p className="text-sm text-muted-foreground">Villes Couvertes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary/30">
                  <Phone className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-foreground">100%</p>
                  <p className="text-sm text-muted-foreground">Connectivité</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des magasins */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Liste des Magasins ({stores.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Magasin</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date Création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {store.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {store.phone}
                      </div>
                    </TableCell>
                    <TableCell>{store.manager}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        {store.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{store.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          asChild
                        >
                          <Link to={`/stores/${store.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedStore(store);
                            setEditForm({
                              status: store.status,
                              statusDate: new Date(),
                              photo: store.photo || "",
                              description: ""
                            });
                            setEditModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Modal de visualisation */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Détails du Magasin
              </DialogTitle>
            </DialogHeader>
            {selectedStore && (
              <div className="space-y-6">
                {/* Photo du magasin */}
                <div className="flex justify-center">
                  <img
                    src={selectedStore.photo}
                    alt={selectedStore.name}
                    className="w-32 h-32 rounded-lg object-cover border-2 border-border"
                  />
                </div>
                
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Nom</Label>
                    <p className="mt-1">{selectedStore.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Statut</Label>
                    <Badge variant="secondary" className="mt-1 bg-accent text-accent-foreground">
                      {selectedStore.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="font-semibold">Responsable</Label>
                    <p className="mt-1">{selectedStore.manager}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Téléphone</Label>
                    <p className="mt-1">{selectedStore.phone}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="font-semibold">Adresse</Label>
                  <p className="mt-1">{selectedStore.address}</p>
                </div>

                <Separator />

                {/* Articles en stock */}
                <div>
                  <Label className="font-semibold text-lg">Articles en stock</Label>
                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {selectedStore.products?.map((product: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                        <Package className="h-4 w-4 text-primary" />
                        <span>{product}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de modification */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Modifier le Magasin</DialogTitle>
            </DialogHeader>
            {selectedStore && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={editForm.status} 
                    onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actif">Actif</SelectItem>
                      <SelectItem value="Inactif">Inactif</SelectItem>
                      <SelectItem value="Maintenance">En maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="photo">Photo (URL)</Label>
                  <Input
                    id="photo"
                    placeholder="URL de la photo"
                    value={editForm.photo}
                    onChange={(e) => setEditForm(prev => ({ ...prev, photo: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Informations complémentaires..."
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                    Annuler
                  </Button>
                  <Button 
                    onClick={() => {
                      // Mise à jour simulée
                      setStores(prev => prev.map(store => 
                        store.id === selectedStore.id 
                          ? { ...store, status: editForm.status, photo: editForm.photo }
                          : store
                      ));
                      setEditModalOpen(false);
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Sauvegarder
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Stores;