import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FolderOpen, ArrowLeft } from 'lucide-react';
import AppHeader from '@/components/AppHeader';

const SetupChoice: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            className="text-white hover:text-blue-400 mb-8"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Setup Type
            </h1>
            <p className="text-xl text-slate-300">
              Start a new setup or load a previously saved one
            </p>
          </div>

          {/* Choice cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/data-entry')}>
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <Plus className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white">New Setup</CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  Create a fresh vehicle setup from scratch
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3"
                  onClick={() => navigate('/data-entry')}
                >
                  Start New Setup
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer"
                  onClick={() => navigate('/saved-setups')}>
              <CardHeader className="text-center pb-4">
                <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <FolderOpen className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-2xl text-white">Saved Setup</CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  Load and modify a previously saved setup
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-3"
                  onClick={() => navigate('/saved-setups')}
                >
                  View Saved Setups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupChoice;