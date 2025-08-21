import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect to the main analysis tool after successful login
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-start pt-2 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center -mb-12">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753201144613_ff80937b.png" 
            alt="Race Setup Pro" 
            className="h-64 w-auto"
          />
        </div>

      </div>

      <div className="-mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-3 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  );
}