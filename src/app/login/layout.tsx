import { AuthProvider } from '@/contexts/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión - País Posible Conecta',
  description: 'Accede a la plataforma oficial del Partido País Posible',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
