import { Moon, Sun } from 'lucide-react';

import { cn } from '../../lib/utils';
import { useTheme } from '../../hooks/use-theme';

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      // The control is a switch, so expose its state rather than relying on the
      // icon alone; the label says what pressing it will do.
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border',
        'bg-card text-foreground hover-elevate active-elevate-2',
        className,
      )}
      data-testid="button-theme-toggle"
    >
      {isDark ? (
        <Sun className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
      ) : (
        <Moon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
      )}
    </button>
  );
}
