import admin from 'firebase-admin';

let adminAuth, adminDb;

if (!admin.apps.length) {
  try {
    // Check if required environment variables are present
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('Firebase Admin SDK environment variables are not fully configured. Using mock services for development.');
      
      // Create mock objects for development when Firebase is not configured
      adminAuth = {
        verifyIdToken: async (token: string) => {
          console.warn('Mock verifyIdToken called. In production, this would verify the token with Firebase.');
          // Return a mock decoded token for development
          return { uid: 'mock-user-id', email: 'mock@example.com' };
        }
      };
      
      adminDb = {
        collection: (collectionName: string) => ({
          doc: (docId: string) => ({
            get: async () => ({
              exists: false,
              data: () => ({}),
            }),
          }),
          limit: (num: number) => ({
            get: async () => ({
              docs: [],
            }),
          }),
        }),
      };
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      
      adminAuth = admin.auth();
      adminDb = admin.firestore();
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    console.warn('Using mock Firebase services for development.');
    
    // Create mock objects for development when Firebase initialization fails
    adminAuth = {
      verifyIdToken: async (token: string) => {
        console.warn('Mock verifyIdToken called due to Firebase initialization error.');
        return { uid: 'mock-user-id', email: 'mock@example.com' };
      }
    };
    
    adminDb = {
      collection: (collectionName: string) => ({
        doc: (docId: string) => ({
          get: async () => ({
            exists: false,
            data: () => ({}),
          }),
        }),
        limit: (num: number) => ({
          get: async () => ({
            docs: [],
          }),
        }),
      }),
    };
  }
} else {
  // If already initialized, use the existing instance
  adminAuth = admin.auth();
  adminDb = admin.firestore();
}

export { adminAuth, adminDb };
export default admin;