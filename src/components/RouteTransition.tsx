import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * On navigation a browser restores scroll for real page loads, but a client
 * router does not — without this you land halfway down the next page.
 *
 * It also moves focus to the main landmark so screen-reader and keyboard users
 * are told the page changed; a client-side route change is otherwise silent.
 */
export default function RouteTransition() {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't fight the browser's own restoration on the very first paint, and
    // don't steal focus before the visitor has done anything.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const main = document.getElementById('main');
    if (main) {
      // tabindex -1 makes it programmatically focusable without adding it to
      // the tab order; removing it afterwards keeps the DOM clean.
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      main.removeAttribute('tabindex');
    }
  }, [location]);

  return null;
}
