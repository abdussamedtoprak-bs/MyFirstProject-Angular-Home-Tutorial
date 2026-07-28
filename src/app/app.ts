import {Component} from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Home],
  standalone: true,
  template: ` <main>
    <header class="brand-name">
      <img class="brand-logo" src="logo.svg" alt="logo" aria-hidden="true"/>

    </header>
  <section class="content">
    <app-home/>
  </section>
  
  </main>`
  
  
})
export class App { 
  title = 'homes';
}
