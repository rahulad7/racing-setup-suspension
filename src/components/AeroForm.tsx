import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wind } from 'lucide-react';

interface AeroFormProps {
  data: any;
  onChange: (field: string, value: string | boolean) => void;
}

const AeroForm: React.FC<AeroFormProps> = ({ data = {}, onChange }) => {
  const {
    frontSplitterBrand = '',
    frontSplitterModel = '',
    frontSplitterHeight = '',
    frontSplitterMaterial = '',
    frontSplitterAngle = '',
    frontSplitterWickerBill = '',
    frontCanards = '',
    frontCanardAngle = '',
    rearWingBrand = '',
    rearWingModel = '',
    rearWingAngle = '',
    rearWingMaterial = '',
    rearWingEndplates = '',
    rearWingWickerBill = '',
    rearDiffuser = '',
    rearDiffuserAngle = '',
    sideSplitters = '',
    frontDownforce = '',
    rearDownforce = '',
    customAeroDescription = ''
  } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-current" />
          Full Aero Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Front Splitter Section */}
        <div className="space-y-4">
          <h4 className="font-medium">Front Splitter Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frontSplitterBrand">Splitter Brand *</Label>
              <Input
                id="frontSplitterBrand"
                value={frontSplitterBrand}
                onChange={(e) => onChange('frontSplitterBrand', e.target.value)}
                placeholder="e.g., APR, Voltex, Custom"
                required
              />
            </div>
            <div>
              <Label htmlFor="frontSplitterModel">Splitter Model</Label>
              <Input
                id="frontSplitterModel"
                value={frontSplitterModel}
                onChange={(e) => onChange('frontSplitterModel', e.target.value)}
                placeholder="e.g., Performance, Track"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="frontSplitterHeight">Height (inches)</Label>
              <Input
                id="frontSplitterHeight"
                value={frontSplitterHeight}
                onChange={(e) => onChange('frontSplitterHeight', e.target.value)}
                placeholder="e.g., 2.5"
                type="number"
                step="0.1"
              />
            </div>
            <div>
              <Label htmlFor="frontSplitterAngle">Angle (degrees)</Label>
              <Input
                id="frontSplitterAngle"
                value={frontSplitterAngle}
                onChange={(e) => onChange('frontSplitterAngle', e.target.value)}
                placeholder="e.g., 5"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="frontSplitterMaterial">Material</Label>
              <Select value={frontSplitterMaterial} onValueChange={(value) => onChange('frontSplitterMaterial', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carbon-fiber">Carbon Fiber</SelectItem>
                  <SelectItem value="fiberglass">Fiberglass</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
                  <SelectItem value="abs-plastic">ABS Plastic</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Rear Wing Section */}
        <div className="space-y-4">
          <h4 className="font-medium">Rear Wing Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rearWingBrand">Wing Brand *</Label>
              <Input
                id="rearWingBrand"
                value={rearWingBrand}
                onChange={(e) => onChange('rearWingBrand', e.target.value)}
                placeholder="e.g., APR, Voltex, NinetyNine"
                required
              />
            </div>
            <div>
              <Label htmlFor="rearWingModel">Wing Model</Label>
              <Input
                id="rearWingModel"
                value={rearWingModel}
                onChange={(e) => onChange('rearWingModel', e.target.value)}
                placeholder="e.g., GTC-300, Type-7"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="customAeroDescription">Additional Notes</Label>
          <Textarea
            id="customAeroDescription"
            value={customAeroDescription}
            onChange={(e) => onChange('customAeroDescription', e.target.value)}
            placeholder="Any additional details about your aero setup..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AeroForm;