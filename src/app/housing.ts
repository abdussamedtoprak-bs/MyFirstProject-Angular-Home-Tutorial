import { Injectable } from '@angular/core';
import { HousinglocationInfo } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // 1. Eski veri listesini sildik, yerine API adresini koyduk
  url = 'http://localhost:3000/locations';

  // 2. Tüm verileri çeken asenkron fonksiyon
  async getAllHousingLocations(): Promise<HousinglocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // 3. ID'ye göre tek veri çeken asenkron fonksiyon
  async getHousingLocationById(id: number): Promise<HousinglocationInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson ?? {};
  }

  // 4. Başvuru fonksiyonu (Konsola yazdırma)
  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`Application submitted for ${firstName} ${lastName} with email: ${email}`);
  }

  constructor() { }
}