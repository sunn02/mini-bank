import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: 
  [ 
    DialogService,
    ConfirmationService,
    MessageService,
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(), 
    providePrimeNG({ theme: { preset: Aura, options: { primaryColor: 'noir', darkModeSelector: ''} }})
  ]
};
