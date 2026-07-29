import {Component} from '@angular/core';
import { Home } from './home/home';
import {RouterLink , RouterOutlet} from '@angular/router';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, RouterModule],
  standalone: true,
  template: ` <main>
  <a [routerLink]="['/']">
    <header class="brand-name">
      <img class="brand-logo" src="/logo.svg" alt="logo" aria-hidden="true" />
    </header>
  </a>
  <section class="content">
    <router-outlet></router-outlet>
  </section>
</main>`,
  
  
})
export class App { 
  title = 'homes';
}
