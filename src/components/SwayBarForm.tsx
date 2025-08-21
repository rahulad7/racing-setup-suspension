import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3 } from 'lucide-react';

interface SwayBarFormProps {
  data: any;
  onChange: (field: string, value: string | boolean) => void;
}

const SwayBarForm: React.FC<SwayBarFormProps> = ({ data = {}, onChange }) => {
  const {
    frontSwayBar = false,
    rearSwayBar = false,
    frontSwayBarBrand = '',
    frontSwayBarSetting = '',
    frontSwayBarDiameter = '',
    rearSwayBarBrand = '',
    rearSwayBarSetting = '',
    rearSwayBarDiameter = ''
  } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-current" />
          Full Sway Bars Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Sway Bars Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="frontSwayBar"
                checked={frontSwayBar}
                onCheckedChange={(checked) => onChange('frontSwayBar', !!checked)}
              />
              <Label htmlFor="frontSwayBar">Front Sway Bars</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rearSwayBar"
                checked={rearSwayBar}
                onCheckedChange={(checked) => onChange('rearSwayBar', !!checked)}
              />
              <Label htmlFor="rearSwayBar">Rear Sway Bars</Label>
            </div>
          </div>
        </div>
        
        {frontSwayBar && (
          <div className="space-y-4">
            <h4 className="font-medium">Front Sway Bar Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frontSwayBarBrand">Brand</Label>
                <Input
                  id="frontSwayBarBrand"
                  value={frontSwayBarBrand}
                  onChange={(e) => onChange('frontSwayBarBrand', e.target.value)}
                  placeholder="e.g., Hotchkis, Eibach, H&R"
                />
              </div>
              <div>
                <Label htmlFor="frontSwayBarDiameter">Diameter (mm)</Label>
                <Input
                  id="frontSwayBarDiameter"
                  value={frontSwayBarDiameter}
                  onChange={(e) => onChange('frontSwayBarDiameter', e.target.value)}
                  placeholder="e.g., 25, 28, 32"
                  type="number"
                />
              </div>
            </div>
          </div>
        )}

        {rearSwayBar && (
          <div className="space-y-4">
            <h4 className="font-medium">Rear Sway Bar Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rearSwayBarBrand">Brand</Label>
                <Input
                  id="rearSwayBarBrand"
                  value={rearSwayBarBrand}
                  onChange={(e) => onChange('rearSwayBarBrand', e.target.value)}
                  placeholder="e.g., Hotchkis, Eibach, H&R"
                />
              </div>
              <div>
                <Label htmlFor="rearSwayBarDiameter">Diameter (mm)</Label>
                <Input
                  id="rearSwayBarDiameter"
                  value={rearSwayBarDiameter}
                  onChange={(e) => onChange('rearSwayBarDiameter', e.target.value)}
                  placeholder="e.g., 22, 25, 28"
                  type="number"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SwayBarForm;