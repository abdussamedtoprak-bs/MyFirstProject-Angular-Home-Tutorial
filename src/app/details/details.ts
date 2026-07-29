import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing'; 
import { HousinglocationInfo } from '../housinglocation'; 

@Component({
  selector: 'app-details',
  standalone: true, 
  imports: [CommonModule],
  template: `
  <article>
    <img class="listing-photo" [src]=" '/' + housingLocation?.photo" />
    <section class="listing-description">
      <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
      <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>

      <section class="listing-features">
        <h2 class="listing-heading">About this housing location</h2> 
        <ul>
          <li>Available Units: {{ housingLocation?.availableUnits }}</li>
          <li>Wifi: {{ housingLocation?.wifi ? 'Yes' : 'No' }}</li>
          <li>Laundry: {{ housingLocation?.laundry ? 'Yes' : 'No' }}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <h2 class="listing-heading">Apply now to live here!</h2>
        <button class="primary">Apply Now</button>
      </section>
  </article> 
`,
  styleUrl: './details.scss',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  housingLocation: HousinglocationInfo | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}