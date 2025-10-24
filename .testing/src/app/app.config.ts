import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app.routes';
import { provideOUIIon } from 'oui-ion';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(CommonModule),
    provideHttpClient(withFetch()),
    provideIonicAngular({backButtonIcon: 'chevron-back'}),
    provideBrowserGlobalErrorListeners(),
    // provideZonelessChangeDetection(),
    provideRouter(routes),
    provideOUIIon({
      multiMediaServerURL: '',
      appId: 'xxxxxx',
      serverUrl: 'http://localhost',
      appPackage: '',
      appSecret: 'xxxxx',
      pageViewRoute: '',
      lateSetup: true,
    } as any),
  ]
};
