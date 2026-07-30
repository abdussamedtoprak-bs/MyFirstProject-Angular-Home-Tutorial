import { Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousinglocationInfo } from '../housinglocation';
import { HousingService } from '../housing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter (input)="filterResults(filter.value)" />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <!-- Düzeltme: 'filteredLocationList' üzerinden döngü kurduk -->
      @for (housingLocation of filteredLocationList; track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation" />
      }
    </section>
  `,
  styles: `
    .results {
      display: grid;
      column-gap: 14px;
      row-gap: 14px;
      grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
      margin-top: 50px;
      justify-content: space-around;
    }
    input[type="text"] {
      border: solid 1px var(--primary-color);
      padding: 10px;
      border-radius: 8px;
      margin-right: 4px;
      display: inline-block;
      width: 30%;
    }
    button {
      padding: 10px;
      border: solid 1px var(--primary-color);
      background: var(--primary-color);
      color: white;
      border-radius: 8px;
    }
    @media (min-width: 500px) and (max-width: 768px) {
      .results {
        grid-template-columns: repeat(2, 1fr);
      }
      input[type="text"] {
        width: 70%;
      }
    }
    @media (max-width: 499px) {
      .results {
        grid-template-columns: 1fr;
      }
    }
  `
})
export class Home {
  readonly baseUrl = '/';

  // 1. Yeni liste değişkenini ekledik
  housingLocationList: HousinglocationInfo[] = [];
  filteredLocationList: HousinglocationInfo[] = [];

  housingService = inject(HousingService);

  constructor() {
    // 2. Constructor'da ikisini de doldurduk
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  // 3. Filtreleme fonksiyonunu ekledik
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}