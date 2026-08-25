import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';


console.log('MAIN START');

bootstrapApplication(App, appConfig)
  .then(() => {
    console.log('ANGULAR BOOTSTRAPPED');
  })
  .catch((err) => {
    console.error('BOOTSTRAP FAILED', err);
  });