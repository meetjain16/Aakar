import { ArrowLeft, FileQuestion } from 'lucide-react';

import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-background px-6">
      <div className="max-w-md text-center">
        <span
          aria-hidden="true"
          className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground"
        >
          <FileQuestion className="h-6 w-6" />
        </span>
        <p className="mt-6 font-heading text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button className="mt-8" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </a>
        </Button>
      </div>
    </main>
  );
}
