import { Suspense, Component, ReactNode } from 'react';
import AppFlow from './components/AppFlow';

// Simple fallback component
function AppFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#2D2D2D'}}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-white">Cargando aplicación...</p>
      </div>
    </div>
  );
}

// Error fallback component
function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#2D2D2D'}}>
      <div className="text-center p-8">
        <h1 className="text-xl font-bold text-white mb-4">Oops! Algo salió mal</h1>
        <p className="text-gray-300 mb-4">Ha ocurrido un error inesperado.</p>
        <button 
          onClick={resetError}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
        >
          Intentar de nuevo
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Recargar página
        </button>
        <details className="mt-4 text-left">
          <summary className="text-gray-400 cursor-pointer">Detalles del error</summary>
          <pre className="text-xs text-gray-500 mt-2 p-2 bg-black/20 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error captured by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error || new Error('Error desconocido')} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundaryWrapper>
      <div className="size-full">
        <Suspense fallback={<AppFallback />}>
          <AppFlow />
        </Suspense>
      </div>
    </ErrorBoundaryWrapper>
  );
}