import React from 'react';

interface ToeSettingsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const ToeSettings: React.FC<ToeSettingsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
      <div className="text-center py-8">
        <p className="text-slate-400">Toe settings configuration will be available in a future update.</p>
      </div>
    </div>
  );
};

export default ToeSettings;