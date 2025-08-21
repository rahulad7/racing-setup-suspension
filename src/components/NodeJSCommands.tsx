import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Copy, Terminal, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Command {
  title: string;
  command: string;
  description: string;
  category: 'verification' | 'development' | 'package';
}

const NodeJSCommands: React.FC = () => {
  const { toast } = useToast();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const commands: Command[] = [
    {
      title: 'Check Node.js Version',
      command: 'node --version',
      description: 'Verify Node.js installation and version',
      category: 'verification'
    },
    {
      title: 'Check npm Version',
      command: 'npm --version',
      description: 'Verify npm installation and version',
      category: 'verification'
    },
    {
      title: 'Install Dependencies',
      command: 'npm install',
      description: 'Install all project dependencies',
      category: 'development'
    },
    {
      title: 'Start Development Server',
      command: 'npm run dev',
      description: 'Start the Vite development server',
      category: 'development'
    },
    {
      title: 'Build for Production',
      command: 'npm run build',
      description: 'Build the app for production deployment',
      category: 'development'
    },
    {
      title: 'Install Global Package',
      command: 'npm install -g <package-name>',
      description: 'Install a package globally',
      category: 'package'
    }
  ];

  const copyToClipboard = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      toast({
        title: 'Copied to clipboard',
        description: `Command: ${command}`,
      });
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy the command manually',
        variant: 'destructive'
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'verification': return 'bg-blue-100 text-blue-800';
      case 'development': return 'bg-green-100 text-green-800';
      case 'package': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Essential Node.js Commands
        </CardTitle>
        <CardDescription>
          Common commands you'll use with Node.js and npm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {commands.map((cmd, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{cmd.title}</h4>
                  <Badge className={getCategoryColor(cmd.category)}>
                    {cmd.category}
                  </Badge>
                </div>
                <Button
                  onClick={() => copyToClipboard(cmd.command)}
                  variant="outline"
                  size="sm"
                >
                  {copiedCommand === cmd.command ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono text-sm">
                {cmd.command}
              </div>
              <p className="text-sm text-muted-foreground">{cmd.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeJSCommands;