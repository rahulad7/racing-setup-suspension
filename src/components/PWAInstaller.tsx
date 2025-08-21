import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Smartphone, CheckCircle } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone || isInWebAppiOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(() => console.log('Service Worker registration failed'));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  if (isInstalled) {
    return (
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>App Installed!</strong> RaceSetup Pro is now available on your device.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Install RaceSetup Pro
        </CardTitle>
        <CardDescription>
          Add to your home screen for the best experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isInstallable ? (
          <Button onClick={handleInstallClick} className="w-full" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Install App
          </Button>
        ) : (
          <div className="space-y-2">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                To install this app, use your browser's install option or add to home screen.
              </AlertDescription>
            </Alert>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>iOS Safari:</strong> Tap Share → Add to Home Screen</p>
              <p><strong>Android Chrome:</strong> Tap Menu → Install App</p>
              <p><strong>Desktop:</strong> Look for install icon in address bar</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}