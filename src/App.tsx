import { QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';

import ErrorBoundary from './components/ErrorBoundary';
import RouteTransition from './components/RouteTransition';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProductsPage from './pages/Products';
import IndustriesPage from './pages/Industries';
import QualityPage from './pages/Quality';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/not-found';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { queryClient } from './lib/queryClient';
import { routes } from './lib/site';

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={200}>
          <RouteTransition />
          <Switch>
            <Route path={routes.home} component={HomePage} />
            <Route path={routes.about} component={AboutPage} />
            <Route path={routes.products} component={ProductsPage} />
            <Route path={routes.industries} component={IndustriesPage} />
            <Route path={routes.quality} component={QualityPage} />
            <Route path={routes.contact} component={ContactPage} />
            {/* Unmatched paths fall through to this one. */}
            <Route component={NotFoundPage} />
          </Switch>
          {/* Rendered last so toasts stack above page content. */}
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
