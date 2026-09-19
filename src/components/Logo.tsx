/**
 * The Aakar Mineral mark — the twin mineral peaks from the brand logo, traced
 * off the master artwork as paths so it stays sharp at every size and can be
 * recoloured by the theme instead of shipping two raster files.
 *
 * The mark paints in `currentColor`; `LogoTile` is the standard lockup used in
 * the header and footer — the mark set into a brand-coloured plate, which is
 * how the logo is presented on its own artwork.
 */

import { cn } from '../lib/utils';

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LogoMark({ className, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100.45"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Foreground peak (left, smaller) */}
      <path d="M26.52,45.17 29.44,45.84 35.28,53.48 39.10,61.12 41.80,70.11 42.92,77.75 42.92,86.52 42.02,92.36 39.78,98.43 38.88,99.55 37.30,100.22 3.37,100.45 1.35,99.78 0,97.98 0,95.73 3.15,88.54 9.44,77.75 24.72,46.29 26.52,45.39Z" />
      {/* Main peak (right, taller) */}
      <path d="M49.21,0 51.01,0 52.81,1.57 100,95.96 100,98.20 98.65,100 62.25,99.78 60.22,98.20 42.25,62.70 39.33,54.38 37.53,45.39 37.08,40.22 37.30,30.34 39.55,18.43 42.02,11.46 44.72,5.84 47.42,1.57 49.21,0.22Z" />
    </svg>
  );
}

interface LogoTileProps {
  className?: string;
  /** Tailwind size classes for the plate; the mark is inset within it. */
  size?: string;
}

export function LogoTile({ className, size = 'h-11 w-11' }: LogoTileProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground',
        size,
        className,
      )}
    >
      <LogoMark className="h-[58%] w-auto" />
    </span>
  );
}

export default LogoMark;
