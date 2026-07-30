import { Component, inject, ChangeDetectorRef } from '@angular/core'; // ChangeDetectorRef eklendi
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing'; 
import { HousinglocationInfo } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ ReactiveFormsModule],
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

        <!-- (submit) yerine (ngSubmit) kullanıldı! -->
        <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
          <label for="firstName">First Name</label>
          <input id="firstName" type="text" formControlName="firstName" />

          <label for="lastName">Last Name</label>
          <input id="lastName" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />

          <button class="primary" type="submit">Apply Now</button>
        </form>

      </section>
  </article> 
`,
  styleUrl: './details.scss',
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  changeDetectorRef = inject(ChangeDetectorRef); // ChangeDetectorRef enjekte edildi

  housingLocation: HousinglocationInfo | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    
    // Veriyi asenkron olarak çek
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
        this.changeDetectorRef.markForCheck(); // Ekranı güncellemesini söyle
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '', 
      this.applyForm.value.email ?? ''
    );
  }
}