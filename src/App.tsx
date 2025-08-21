import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LicenseProvider } from '@/contexts/LicenseContext';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import LicenseSync from '@/components/LicenseSync';
import Index from '@/pages/Index';
import Website from '@/pages/Website';
import SampleDemo from '@/pages/SampleDemo';
import Login from '@/pages/Login';
import MobileSetup from '@/pages/MobileSetup';
import NodeJSSetup from '@/pages/NodeJSSetup';
import AppStore from '@/pages/AppStore';
import AppStoreGuide from '@/pages/AppStoreGuide';
import DataEntryPoints from '@/pages/DataEntryPoints';
import ActionableItems from '@/pages/ActionableItems';
import Troubleshooting from '@/pages/Troubleshooting';
import NotFound from '@/pages/NotFound';
import PaymentSuccess from '@/components/PaymentSuccess';
import License from '@/pages/License';
import ChoosePlan from '@/pages/ChoosePlan';
import SetupChoice from '@/pages/SetupChoice';
import SavedSetups from '@/pages/SavedSetups';
import DatabaseTestComponent from '@/components/DatabaseTestComponent';
import { VehicleGarage } from '@/components/VehicleGarage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <LicenseProvider>
            <AppProvider>
              <LicenseSync />
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/website" element={<Website />} />
                  <Route path="/app" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sample-demo" element={<SampleDemo />} />
                  <Route path="/mobile-setup" element={<MobileSetup />} />
                  <Route path="/nodejs-setup" element={<NodeJSSetup />} />
                  <Route path="/app-store" element={<AppStore />} />
                  <Route path="/app-store-guide" element={<AppStoreGuide />} />
                  <Route path="/data-entry" element={<DataEntryPoints />} />
                  <Route path="/actionable-items" element={<ActionableItems />} />
                  <Route path="/troubleshooting" element={<Troubleshooting />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/license" element={<License />} />
                  <Route path="/choose-plan" element={<ChoosePlan />} />
                  <Route path="/setup-choice" element={<SetupChoice />} />
                  <Route path="/saved-setups" element={<SavedSetups />} />
                  <Route path="/test-db" element={<DatabaseTestComponent />} />
                  <Route path="/vehicles" element={<VehicleGarage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </AppProvider>
          </LicenseProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;