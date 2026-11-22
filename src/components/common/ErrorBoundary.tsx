import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    // In production, errors can also be sent to a telemetry logger
    console.error('ECHO Uncaught Error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-echo-950 text-slate-100 flex items-center justify-center p-6 selection:bg-cyan-500/30"
        >
          <div className="max-w-xl w-full bg-echo-900 border border-rose-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_35px_rgba(244,63,94,0.15)] space-y-6">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-400"
                aria-hidden="true"
              >
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
                  Security & Integrity Boundary
                </span>
                <h1 className="text-xl font-bold text-white mt-0.5">
                  Intelligence Workspace Error Intercepted
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-echo-950/70 p-4 rounded-xl border border-slate-800">
              An unexpected component exception occurred. To protect analytical integrity and state consistency, ECHO isolated this section from crashing the entire session.
            </p>

            {this.state.error && (
              <div className="bg-echo-950/90 border border-slate-800 rounded-lg p-3 text-xs font-mono text-rose-300/90 overflow-x-auto">
                <span className="text-slate-500 block text-[10px] mb-1">Error Signature:</span>
                {this.state.error.message || 'Unknown runtime error'}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold text-echo-950 bg-gradient-to-r from-cyan-400 to-cyan-350 hover:from-cyan-350 hover:to-cyan-300 transition-all shadow-[0_0_12px_rgba(0,242,254,0.3)] focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Recover State</span>
              </button>

              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-slate-300 bg-echo-950 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none"
              >
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
