import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-shell',
  template: `
    <div class="portal-shell">
      <router-outlet></router-outlet>
    </div>
  `
})
export class PortalAppShellComponent {}
