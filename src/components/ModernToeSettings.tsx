import React from 'react';

interface ModernToeSettingsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const ModernToeSettings: React.FC<ModernToeSettingsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <p className="text-slate-400">Toe settings configuration will be available in a future update.</p>
      </div>
    </div>
  );
};

export default ModernToeSettings;