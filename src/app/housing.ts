import { Injectable } from '@angular/core';
import { HousinglocationInfo } from './housinglocation';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() {}

  async getAllHousingLocations(): Promise<HousinglocationInfo[]> {
    const querySnapshot = await getDocs(collection(db, 'housingLocations'));
    return querySnapshot.docs.map(doc => doc.data() as HousinglocationInfo);
  }

  async getHousingLocationById(id: number): Promise<HousinglocationInfo | undefined> {
    const querySnapshot = await getDocs(collection(db, 'housingLocations'));
    const houses = querySnapshot.docs.map(doc => doc.data() as HousinglocationInfo);
    return houses.find(house => house.id === id);
  }

  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log('Ad:', firstName);
    console.log('Soyad:', lastName);
    console.log('Email:', email);
  }
}