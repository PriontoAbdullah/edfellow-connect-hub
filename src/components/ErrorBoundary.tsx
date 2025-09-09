import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className='bg-white border border-red-200 shadow-sm rounded-xl'>
          <CardContent className='p-8 text-center'>
            <div className='max-w-md mx-auto'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <AlertTriangle className='h-8 w-8 text-red-500' />
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Something went wrong
              </h3>
              <p className='text-gray-600 mb-6'>
                {this.state.error?.message ||
                  'An unexpected error occurred. Please try again.'}
              </p>
              <Button
                onClick={this.handleRetry}
                className='inline-flex items-center gap-2'
              >
                <RefreshCw className='h-4 w-4' />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
