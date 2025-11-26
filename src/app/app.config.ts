import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "madebycypress", appId: "1:570919053588:web:fe862b5c3a136885e97a01", storageBucket: "madebycypress.firebasestorage.app", apiKey: "AIzaSyBDulpUYaZPk_lJMlCAhJzXlanjrDYSI94", authDomain: "madebycypress.firebaseapp.com", messagingSenderId: "570919053588", measurementId: "G-N669RP65ZB" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideFirestore(() => getFirestore())
  ]
};
