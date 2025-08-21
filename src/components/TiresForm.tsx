import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';

interface TiresFormProps {
  data: {
    frontTireSize?: string;
    rearTireSize?: string;
    tireMake?: string;
    tireModel?: string;
    heatCycles?: string;
    tirePressureColdFL?: string;
    tirePressureColdFR?: string;
    tirePressureColdRL?: string;
    tirePressureColdRR?: string;
    tirePressureHotFL?: string;
    tirePressureHotFR?: string;
    tirePressureHotRL?: string;
    tirePressureHotRR?: string;
    tireTempInsideFL?: string;
    tireTempMiddleFL?: string;
    tireTempOutsideFL?: string;
    tireTempInsideFR?: string;
    tireTempMiddleFR?: string;
    tireTempOutsideFR?: string;
    tireTempInsideRL?: string;
    tireTempMiddleRL?: string;
    tireTempOutsideRL?: string;
    tireTempInsideRR?: string;
    tireTempMiddleRR?: string;
    tireTempOutsideRR?: string;
  };
  onChange: (field: string, value: string) => void;
}

const TiresForm: React.FC<TiresFormProps> = ({ data = {}, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-current" />
          Full Tire Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tire Specifications */}
        <div className="space-y-4">
          <h4 className="font-medium">Tire Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frontTireSize">Front Tire Size *</Label>
              <Input
                id="frontTireSize"
                value={data.frontTireSize || ''}
                onChange={(e) => onChange('frontTireSize', e.target.value)}
                placeholder="e.g., 225/45R17"
                required
              />
            </div>
            <div>
              <Label htmlFor="rearTireSize">Rear Tire Size *</Label>
              <Input
                id="rearTireSize"
                value={data.rearTireSize || ''}
                onChange={(e) => onChange('rearTireSize', e.target.value)}
                placeholder="e.g., 245/40R17"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tireMake">Tire Make *</Label>
              <Input
                id="tireMake"
                value={data.tireMake || ''}
                onChange={(e) => onChange('tireMake', e.target.value)}
                placeholder="e.g., Michelin, Toyo, Hoosier"
                required
              />
            </div>
            <div>
              <Label htmlFor="tireModel">Tire Model *</Label>
              <Input
                id="tireModel"
                value={data.tireModel || ''}
                onChange={(e) => onChange('tireModel', e.target.value)}
                placeholder="e.g., Pilot Sport Cup 2, R888R, A7"
                required
              />
            </div>
          </div>
        </div>

        {/* Cold Tire Pressures */}
        <div className="space-y-4">
          <h4 className="font-medium">Cold Tire Pressures (PSI)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="tirePressureColdFL">Front Left</Label>
              <Input
                id="tirePressureColdFL"
                value={data.tirePressureColdFL || ''}
                onChange={(e) => onChange('tirePressureColdFL', e.target.value)}
                placeholder="32"
                type="number"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="tirePressureColdFR">Front Right</Label>
              <Input
                id="tirePressureColdFR"
                value={data.tirePressureColdFR || ''}
                onChange={(e) => onChange('tirePressureColdFR', e.target.value)}
                placeholder="32"
                type="number"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="tirePressureColdRL">Rear Left</Label>
              <Input
                id="tirePressureColdRL"
                value={data.tirePressureColdRL || ''}
                onChange={(e) => onChange('tirePressureColdRL', e.target.value)}
                placeholder="30"
                type="number"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="tirePressureColdRR">Rear Right</Label>
              <Input
                id="tirePressureColdRR"
                value={data.tirePressureColdRR || ''}
                onChange={(e) => onChange('tirePressureColdRR', e.target.value)}
                placeholder="30"
                type="number"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TiresForm;