import { useState, useEffect } from 'react';

interface FormData {
  [key: string]: any;
}

export function useFormPersistence(formKey: string) {
  const [formData, setFormData] = useState<FormData>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`analysis-form-${formKey}`);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, [formKey]);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(`analysis-form-${formKey}`, JSON.stringify(formData));
    }
  }, [formData, formKey]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetFormData = () => {
    setFormData({});
    localStorage.removeItem(`analysis-form-${formKey}`);
  };

  const clearAllSavedData = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('analysis-form-')) {
        localStorage.removeItem(key);
      }
    });
    setFormData({});
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    clearAllSavedData,
    setFormData
  };
}