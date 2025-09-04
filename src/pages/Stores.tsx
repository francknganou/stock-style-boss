import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Store, MapPin, Phone, Plus, Edit, Eye, Package, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    phone: "",
    manager: "",
    description: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateStore = () => {
    if (newStore.name && newStore.address && newStore.phone && newStore.manager) {
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
      toast({
        title: "Magasin créé",
        description: "Le nouveau magasin a été ajouté avec succès.",
      });
    }
  };

  const handleDeleteStore = (storeId: number) => {
    setStores(stores.filter(s => s.id !== storeId));
    toast({
      title: "Magasin supprimé",
      description: "Le magasin a été supprimé avec succès.",
      variant: "destructive"
    });
  };

  const handleEditStore = () => {
    setStores(stores.map(s => s.id === selectedStore.id ? {...selectedStore, ...editForm, updatedAt: new Date().toLocaleDateString('fr-FR')} : s));
    setEditModalOpen(false);
    toast({
      title: "Magasin modifié",
      description: "Les modifications ont été sauvegardées avec succès.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Actif":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>;
      case "Inactif":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactif</Badge>;
      case "Maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
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
                      {getStatusBadge(store.status)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{store.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedStore(store);
                            setViewModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer "{store.name}" ? Cette action ne peut pas être annulée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteStore(store.id)}>
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
                {selectedStore?.photo ? (
                  <img 
                    src={selectedStore.photo} 
                    alt={selectedStore.name}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                    <Store className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
                
                {/* Informations générales */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Nom</Label>
                    <p className="mt-1">{selectedStore.name}</p>
                  </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    {selectedStore && getStatusBadge(selectedStore.status)}
                  </div>
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
                  <Label htmlFor="edit-status">Statut</Label>
                  <select
                    id="edit-status"
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-date">Date de modification</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="edit-photo">Photo (URL)</Label>
                  <Input
                    id="edit-photo"
                    placeholder="https://exemple.com/photo.jpg"
                    value={editForm.photo}
                    onChange={(e) => setEditForm({...editForm, photo: e.target.value})}
                  />
                  {editForm.photo && (
                    <div className="mt-2">
                      <img 
                        src={editForm.photo} 
                        alt="Aperçu"
                        className="w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Informations complémentaires..."
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    rows={3}
                  />
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