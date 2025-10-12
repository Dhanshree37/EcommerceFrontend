import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from './app/app-routing.module'; // update for standalone

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)  // your routes
  ]
}).catch(err => console.error(err));
