import React from 'react';
import Logo from './Logo';

const WebsiteFooter: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo size="md" variant="icon" />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional suspension analysis and setup recommendations for track day enthusiasts and racers.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Setup Pro. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/app'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Launch App
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/mobile-setup'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Setup
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => window.location.href = '/nodejs-setup'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Node.js Setup
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/app-store-guide'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  App Store Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => window.location.href = '/next-steps'}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Next Steps
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebsiteFooter;