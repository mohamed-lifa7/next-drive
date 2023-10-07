import { env } from '@/env.mjs';
import type { FirebaseAdapterConfig } from '@auth/firebase-adapter';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig:FirebaseAdapterConfig = {
    name:'next-drive-62347',
    namingStrategy:'snake_case',
    credential: cert({
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,        
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY
      })
}

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}