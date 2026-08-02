import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PortalAppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(PortalAppModule)
  .catch((err) => console.error(err));
