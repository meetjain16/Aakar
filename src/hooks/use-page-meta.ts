import { useEffect } from 'react';

import { company } from '../lib/site';

const SITE_ORIGIN = 'https://www.aakarmineral.com';

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps <title>, the meta description, the canonical URL and the Open Graph
 * tags in step with the current route.
 *
 * A single-page app does not update any of these on navigation by itself, so
 * without this every page would share the home page's title in search results,
 * browser history and link previews.
 */
export function usePageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    // The home page already leads with the company name; inner pages get it
    // as a suffix so the distinctive part comes first in a tab or SERP.
    const fullTitle =
      path === '/' ? `${company.name} | ${title}` : `${title} | ${company.name}`;
    const url = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setLink('canonical', url);
  }, [title, description, path]);
}
