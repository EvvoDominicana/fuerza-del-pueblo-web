import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - PPD Conecta',
  description: 'Accede a la plataforma oficial del Partido País Posible',
};

// Este layout se asegura de que el AuthProvider envuelva solo la página de login.
// El layout principal tendrá su propio manejo del contexto.
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
