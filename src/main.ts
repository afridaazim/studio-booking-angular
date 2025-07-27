import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient} from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(AppComponent, {
//   providers: [provideHttpClient()]
// });
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
