import Image from 'next/image';

export function AppLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2 p-2 transition-all duration-300">
      {/*
        Instrucciones para el usuario:
        1. Coloca la imagen de tu logo (por ejemplo, 'partido-logo.png') en el directorio '/public'.
        2. Si usas un nombre o ruta diferente, actualiza el atributo 'src' abajo.
        3. Para el tamaño de 32x32px, se recomienda una versión del logo centrada en el icono.
      */}
      <Image
        src="/partido-logo.png" // Esta ruta asume que la imagen está en 'public/partido-logo.png'
        alt="Partido País Posible Logo"
        width={32}
        height={32}
        className="object-contain" // Preserva la relación de aspecto de la imagen
      />
      {!collapsed && (
        <span className="font-headline text-xl font-bold text-primary">
          PPD Conecta
        </span>
      )}
    </div>
  );
}
