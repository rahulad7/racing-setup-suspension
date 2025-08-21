import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Gift, CreditCard, Users, Settings } from 'lucide-react';

const AccessControlGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-500" />
            Access Control System Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-300">
          <p>
            The app uses a comprehensive access control system that manages user permissions 
            based on payment status and license types. Here's how it works:
          </p>

          <div className="grid gap-4">
            <Card className="bg-gray-800/50 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Gift className="h-5 w-5 text-green-500" />
                  Free Trial Access
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    1 Vehicle
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Before Payment:</strong> Users get one free analysis</p>
                <p><strong>Access Level:</strong> Limited to 1 vehicle setup</p>
                <p><strong>Duration:</strong> One-time use only</p>
                <p><strong>Components:</strong> FreeAnalysisButton, FreeTrialBlock</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-500" />
                  Premium Feature Blocks
                  <Badge variant="destructive">Paid Required</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Blocked Content:</strong> Advanced features, multiple vehicles</p>
                <p><strong>Display:</strong> PremiumFeatureBlock component</p>
                <p><strong>Action:</strong> Redirects to license purchase</p>
                <p><strong>Fallback:</strong> Shows free trial option if available</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-600">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  Paid Access Levels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-gray-700/50 rounded">
                    <h4 className="font-semibold text-orange-400">2-Day Pass</h4>
                    <p className="text-sm">1 Vehicle • $14.95</p>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded">
                    <h4 className="font-semibold text-blue-400">Monthly</h4>
                    <p className="text-sm">4 Vehicles • $29.95</p>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded">
                    <h4 className="font-semibold text-green-400">Annual</h4>
                    <p className="text-sm">8 Vehicles • $99.95</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-500" />
            Implementation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Key Components:</h3>
            <ul className="space-y-1 list-disc pl-5">
              <li><code className="bg-gray-800 px-2 py-1 rounded">LicenseContext</code> - Manages license state and validation</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">PremiumFeatureBlock</code> - Blocks premium content</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">FreeTrialBlock</code> - Handles free trial flow</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">PaymentSuccess</code> - Processes payment completion</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Access Control Methods:</h3>
            <ul className="space-y-1 list-disc pl-5">
              <li><code className="bg-gray-800 px-2 py-1 rounded">canAccessApp()</code> - General app access</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">canUseFreeAdvice()</code> - Free trial eligibility</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">checkLicense()</code> - Valid license verification</li>
              <li><code className="bg-gray-800 px-2 py-1 rounded">vehicleLimit</code> - Vehicle count restrictions</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Database Integration:</h3>
            <ul className="space-y-1 list-disc pl-5">
              <li><code className="bg-gray-800 px-2 py-1 rounded">user_licenses</code> table stores license data</li>
              <li>PayPal integration via Supabase Edge Functions</li>
              <li>Real-time license validation and expiration checking</li>
              <li>Automatic license refresh after payment</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            Admin Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <p>
            Administrators can manage user access through the admin dashboard at <code className="bg-gray-800 px-2 py-1 rounded">/admin</code>
          </p>
          <div className="space-y-2">
            <p><strong>Admin Login:</strong> racesetuppro+1@gmail.com / racesetup2024</p>
            <p><strong>Capabilities:</strong> View user licenses, manage access levels, monitor payments</p>
            <p><strong>Database Access:</strong> Direct Supabase queries for license management</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControlGuide;