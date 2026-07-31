import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing';
import { HousinglocationInfo } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {

  route = inject(ActivatedRoute);
  housingService = inject(HousingService);
  cdr = inject(ChangeDetectorRef);
  housingLocation: HousinglocationInfo | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const id = Number(this.route.snapshot.params['id']);

    this.housingService
      .getHousingLocationById(id)
      .then(data => {
        this.housingLocation = data;
        this.cdr.detectChanges();
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