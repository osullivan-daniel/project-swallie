import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-shell',
  template: `
    <div class="admin-shell">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AdminAppShellComponent {}
