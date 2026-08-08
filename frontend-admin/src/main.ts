// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// bootstrapApplication(App, appConfig).catch((err) => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, isDevMode } from '@angular/core';

import { appConfig } from './app/app.config';
import { App } from './app/app';

console.log('MAIN START');

bootstrapApplication(App, appConfig)
  .then(() => {
    console.log('ANGULAR BOOTSTRAPPED');
  })
  .catch((err) => {
    console.error('BOOTSTRAP FAILED', err);
  });