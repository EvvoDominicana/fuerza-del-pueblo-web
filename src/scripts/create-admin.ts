import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function createAdminUser() {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@paisposible.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'AdminTotal2024!';
    
    console.log('Creando usuario administrador...');
    
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    
    // Crear perfil de administrador en Firestore
    const adminProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email!,
      displayName: 'Administrador General',
      role: 'admin',
      createdAt: new Date(),
      permissions: {
        all: true,
        manageUsers: true,
        manageTasks: true,
        manageEvents: true,
        manageNews: true,
        manageTraining: true,
        manageOrganization: true,
        viewAnalytics: true
      }
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), adminProfile);
    
    console.log('Usuario administrador creado exitosamente:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('UID:', userCredential.user.uid);
    
    return userCredential;
  } catch (error: any) {
    console.error('Error al crear usuario administrador:', error.message);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  require('dotenv').config({ path: '.env.local' });
  createAdminUser().catch(console.error);
}