import Image from 'next/image';

export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2 p-2 transition-all duration-300">
      <Image
        src="/partido-logo.png"
        alt="País Posible Logo"
        width={56}
        height={56}
        className="object-contain"
      />
      {!collapsed && (
        <span className="font-headline text-xl font-bold text-primary">
          País Posible Conecta
        </span>
      )}
    </div>
  );
}
