import { useCallback, useEffect, useState } from 'react';

export const THEME_STORAGE_KEY = 'aakar-theme';

export type Theme = 'light' | 'dark';

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    // Storage can throw in private mode or when site data is blocked.
    return null;
  }
}

function systemTheme(): Theme {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Reads the theme the inline script in index.html already applied, keeps
 * <html class="dark"> in sync, and follows the OS until the user picks a theme
 * explicitly.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => readStoredTheme() ?? systemTheme(),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Follow the OS only while the user has not made an explicit choice.
  useEffect(() => {
    if (readStoredTheme() !== null) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) =>
      setThemeState(e.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Preference simply won't persist; the UI still updates.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* non-fatal */
      }
      return next;
    });
  }, []);

  return { theme, setTheme, toggleTheme };
}
