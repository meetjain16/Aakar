import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

import { Button } from './ui/button';
import { company } from '../lib/site';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Without this, any render-time exception unmounts the tree and the visitor is
 * left staring at a blank white page with no way to reach the business.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="grid min-h-svh place-items-center bg-background px-6">
        <div className="max-w-md text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive"
          >
            <AlertTriangle className="h-6 w-6" />
          </span>
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="mt-3 text-muted-foreground">
            Sorry — this page failed to load. Reloading usually fixes it. If it
            doesn't, reach us directly and we'll help.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={() => window.location.reload()}>Reload page</Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${company.email}`}>Email {company.email}</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
