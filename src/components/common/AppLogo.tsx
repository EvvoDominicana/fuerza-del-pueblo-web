import type { SVGProps } from 'react';

// Placeholder for a more elaborate SVG logo if available
// For now, using a simple text representation or a generic icon
const PpdLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);


export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2 p-2 transition-all duration-300">
      <PpdLogoIcon className="h-8 w-8 text-primary" />
      {!collapsed && (
        <span className="font-headline text-xl font-bold text-primary">
          PPD Conecta
        </span>
      )}
    </div>
  );
}
