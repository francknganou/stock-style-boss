import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Palette, 
  Database, 
  Shield,
  Save,
  Download,
  Upload
} from "lucide-react";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Profil utilisateur
    companyName: "StockManager Pro",
    userEmail: "admin@stockmanager.com",
    userName: "Administrateur",
    
    // Notifications
    emailNotifications: true,
    stockAlerts: true,
    salesReports: false,
    
    // Interface
    darkMode: false,
    language: "fr",
    currency: "FCFA",
    
    // Sécurité
    twoFactorAuth: false,
    sessionTimeout: "30",
    
    // Système
    autoBackup: true,
    backupFrequency: "daily"
  });

  const handleSaveSettings = () => {
    // Simulation de sauvegarde
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export en cours",
      description: "Vos données sont en cours d'export...",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Import disponible",
      description: "Sélectionnez un fichier de données à importer.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
              <p className="text-sm text-muted-foreground">Configuration de l'application</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profil & Entreprise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profil & Entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({...prev, companyName: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="userName">Nom utilisateur</Label>
                <Input
                  id="userName"
                  value={settings.userName}
                  onChange={(e) => setSettings(prev => ({...prev, userName: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={settings.userEmail}
                  onChange={(e) => setSettings(prev => ({...prev, userEmail: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">Recevoir les notifications importantes</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, emailNotifications: checked}))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alertes de stock</Label>
                  <p className="text-sm text-muted-foreground">Notifications de stock faible</p>
                </div>
                <Switch
                  checked={settings.stockAlerts}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, stockAlerts: checked}))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Rapports de ventes</Label>
                  <p className="text-sm text-muted-foreground">Rapports automatiques hebdomadaires</p>
                </div>
                <Switch
                  checked={settings.salesReports}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, salesReports: checked}))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Mode sombre</Label>
                  <p className="text-sm text-muted-foreground">Interface en mode sombre</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, darkMode: checked}))}
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="language">Langue</Label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({...prev, language: e.target.value}))}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div>
                <Label htmlFor="currency">Devise</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => setSettings(prev => ({...prev, currency: e.target.value}))}
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Authentification à deux facteurs</Label>
                  <p className="text-sm text-muted-foreground">Sécurité renforcée</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings(prev => ({...prev, twoFactorAuth: checked}))}
                />
              </div>
              <Separator />
              <div>
                <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({...prev, sessionTimeout: e.target.value}))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Données & Sauvegarde */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Données & Sauvegarde
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sauvegarde automatique</Label>
                    <p className="text-sm text-muted-foreground">Backup quotidien des données</p>
                  </div>
                  <Switch
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => setSettings(prev => ({...prev, autoBackup: checked}))}
                  />
                </div>
                <div>
                  <Label>Dernière sauvegarde</Label>
                  <Badge variant="outline" className="mt-1">
                    {new Date().toLocaleDateString('fr-FR')}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button onClick={handleExportData} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter les données
                </Button>
                <Button onClick={handleImportData} variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Importer les données
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Statistiques</Label>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">Produits: <span className="font-medium">156</span></p>
                    <p className="text-sm">Transactions: <span className="font-medium">1,234</span></p>
                    <p className="text-sm">Magasins: <span className="font-medium">3</span></p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end mt-8">
          <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder les paramètres
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;