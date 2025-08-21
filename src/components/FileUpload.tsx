import React, { useState } from 'react';
import { Upload, X, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface FileUploadProps {
  onFilesUploaded: (urls: string[]) => void;
  maxFiles?: number;
}

export function FileUpload({ onFilesUploaded, maxFiles = 5 }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, url: string}>>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const urls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${file.name}`;
        
        const { data, error } = await supabase.storage
          .from('analysis-files')
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('analysis-files')
          .getPublicUrl(fileName);

        urls.push(publicUrl);
        setUploadedFiles(prev => [...prev, { name: file.name, url: publicUrl }]);
      }

      onFilesUploaded(urls);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles.map(f => f.url));
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Upload analysis files
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              Images, spreadsheets, documents (max {maxFiles} files)
            </span>
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf,.xlsx,.xls,.csv"
            className="sr-only"
            onChange={handleFileUpload}
            disabled={uploading || uploadedFiles.length >= maxFiles}
          />
        </div>
        {uploading && (
          <Button disabled className="mt-2">
            Uploading...
          </Button>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                {file.name.match(/\.(jpg|jpeg|png)$/i) ? (
                  <Image className="h-4 w-4" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}