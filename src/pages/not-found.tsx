import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Link } from 'wouter';

import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import { navItems, routes } from '../lib/site';

export default function NotFoundPage() {
  return (
    // Reuses the home page's metadata; a 404 should not be indexed under its
    // own title, and the nav gives visitors a way back.
    <Layout page="home">
      <div className="grid min-h-[60svh] place-items-center px-6 py-20">
        <div className="max-w-lg text-center">
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
            That page doesn't exist or has moved. Here's everything on the site:
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="inline-flex rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {item.shortLabel}
                </Link>
              </li>
            ))}
          </ul>

          <Button className="mt-8" asChild>
            <Link href={routes.home}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
