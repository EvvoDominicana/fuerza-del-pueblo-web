'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { usePartySettings } from '@/contexts/PartySettingsContext';
import { 
  Settings, 
  Save, 
  Upload, 
  Eye, 
  EyeOff,
  RefreshCw,
  Shield,
  Palette,
  Type,
  Image as ImageIcon
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminSettingsPage() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const { settings: partySettings, updateSettings, resetSettings } = usePartySettings();
  
  const [settings, setSettings] = useState(partySettings);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      toast({
        title: "Acceso denegado",
        description: "Solo los administradores pueden acceder a esta página.",
        variant: "destructive",
      });
    }
  }, [userProfile, toast]);

  useEffect(() => {
    setSettings(partySettings);
  }, [partySettings]);

  const handleInputChange = (field: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "Error", description: "El logo debe ser menor a 5MB.", variant: "destructive" });
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let finalSettings = { ...settings };
    if (logoFile && logoPreview) {
      finalSettings.partyLogo = logoPreview;
    }
    
    updateSettings(finalSettings);
    
    toast({ title: "Configuración guardada", description: "Los cambios se han aplicado exitosamente." });
    
    setLogoFile(null);
    setLogoPreview(null);
    setIsLoading(false);
  };

  const handleReset = () => {
    resetSettings();
    setLogoFile(null);
    setLogoPreview(null);
    toast({ title: "Configuración restaurada", description: "Se han restaurado los valores predeterminados." });
  };

  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Acceso denegado. Solo los administradores pueden acceder a esta página.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Configuración del Partido
          </h1>
          <p className="text-muted-foreground mt-2">
            Personaliza la información y apariencia de la plataforma
          </p>
        </div>
        <Button onClick={() => setShowPreview(!showPreview)} variant="outline" className="flex items-center gap-2">
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Ocultar Vista Previa' : 'Mostrar Vista Previa'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Información General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="partyName">Nombre del Partido</Label>
              <Input id="partyName" value={settings.partyName} onChange={(e) => handleInputChange('partyName', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partySlogan">Slogan del Partido</Label>
              <Input id="partySlogan" value={settings.partySlogan} onChange={(e) => handleInputChange('partySlogan', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" value={settings.description} onChange={(e) => handleInputChange('description', e.target.value)} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Sitio Web</Label>
              <Input id="websiteUrl" value={settings.websiteUrl} onChange={(e) => handleInputChange('websiteUrl', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email de Contacto</Label>
              <Input id="contactEmail" type="email" value={settings.contactEmail} onChange={(e) => handleInputChange('contactEmail', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Apariencia Visual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo del Partido</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="cursor-pointer" />
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG. Máx 5MB.</p>
                </div>
                {(logoPreview || settings.partyLogo) && (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logoPreview || settings.partyLogo} alt="Logo preview" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Color Primario</Label>
                <div className="flex items-center gap-2">
                  <Input id="primaryColor" type="color" value={settings.primaryColor} onChange={(e) => handleInputChange('primaryColor', e.target.value)} className="w-12 h-10 p-1" />
                  <Input value={settings.primaryColor} onChange={(e) => handleInputChange('primaryColor', e.target.value)} className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Color Secundario</Label>
                <div className="flex items-center gap-2">
                  <Input id="secondaryColor" type="color" value={settings.secondaryColor} onChange={(e) => handleInputChange('secondaryColor', e.target.value)} className="w-12 h-10 p-1" />
                  <Input value={settings.secondaryColor} onChange={(e) => handleInputChange('secondaryColor', e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showPreview && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" />Vista Previa</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-teal-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
                    <img src={logoPreview || settings.partyLogo} alt="Logo preview" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: settings.primaryColor }}>{settings.partyName}</h3>
                    <p className="text-sm text-gray-600 italic">{settings.partySlogan}</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-2" style={{ color: settings.secondaryColor }}>Acerca de nosotros</h4>
                  <p className="text-sm text-gray-700 mb-3">{settings.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-500">🌐 {settings.websiteUrl}</span>
                    <span className="text-gray-500">📧 {settings.contactEmail}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />Restaurar
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isLoading ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
