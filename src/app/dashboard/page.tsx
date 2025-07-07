'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        console.log('Loading user from localStorage...');
        
        if (typeof window !== 'undefined') {
          const user = localStorage.getItem('mock-user');
          console.log('Raw localStorage data:', user);
          
          if (user) {
            const parsedUser = JSON.parse(user);
            console.log('Parsed user data:', parsedUser);
            setUserProfile(parsedUser);
          } else {
            console.log('No user found, using default');
            setUserProfile({
              displayName: 'Usuario Demo',
              role: 'user'
            });
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUserProfile({
          displayName: 'Error de usuario',
          role: 'user'
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  const role = userProfile?.role || 'user';
  console.log('Current role:', role);

  const getContent = () => {
    if (role === 'admin') {
      console.log('Showing ADMIN content');
      return {
        title: '👑 Panel de Administrador',
        description: 'Control total de la plataforma',
        bgColor: 'bg-green-50',
        textColor: 'text-green-800',
        stats: [
          'Miembros Activos: 2,847',
          'Eventos Este Mes: 15',
          'Tareas Completadas: 1,234',
          'Mensajes Enviados: 5,678'
        ]
      };
    } else if (role === 'leader') {
      console.log('Showing LEADER content');
      return {
        title: '📊 Panel de Líder Regional',
        description: 'Gestión regional y coordinación',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-800',
        stats: [
          'Mi Región: 156 miembros',
          'Eventos Organizados: 8',
          'Tareas Asignadas: 24',
          'Reportes Enviados: 12'
        ]
      };
    } else {
      console.log('Showing USER content');
      return {
        title: '👤 Panel de Militante',
        description: 'Tu espacio en País Posible Conecta',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-800',
        stats: [
          'Mis Tareas: 12',
          'Eventos Inscritos: 5',
          'Puntos Ganados: 245',
          'Días Activo: 28'
        ]
      };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`p-8 rounded-lg ${content.bgColor} mb-8`}>
          <h1 className={`text-4xl font-bold ${content.textColor} mb-4`}>
            ¡Bienvenido, {userProfile?.displayName}!
          </h1>
          <h2 className={`text-2xl ${content.textColor} mb-2`}>
            {content.title}
          </h2>
          <p className={`text-lg ${content.textColor}`}>
            {content.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="text-lg font-semibold text-gray-800">
                {stat}
              </div>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Información del Usuario</h3>
          <div className="space-y-2">
            <div><strong>Nombre:</strong> {userProfile?.displayName}</div>
            <div><strong>Email:</strong> {userProfile?.email}</div>
            <div><strong>Rol:</strong> {userProfile?.role}</div>
            <div><strong>UID:</strong> {userProfile?.uid}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => window.location.href = '/demo'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            ← Volver a Demo
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('mock-user');
              window.location.href = '/login';
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}