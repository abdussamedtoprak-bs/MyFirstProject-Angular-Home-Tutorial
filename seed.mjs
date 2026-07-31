import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7xvWUjXU9X_ThUuJsdAeBmCTJxGD12qE",
  authDomain: "angular-homes-first-projects.firebaseapp.com",
  projectId: "angular-homes-first-projects",
  storageBucket: "angular-homes-first-projects.firebasestorage.app",
  messagingSenderId: "952386379290",
  appId: "1:952386379290:web:c548927e5a69c461f7bba3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const locations = [
  { id: 0, name: "Acme Fresh Start Housing", city: "Chicago", state: "IL", photo: "bernard-hermant-CLKGGwIBTaY-unsplash.jpg", availableUnits: 4, wifi: true, laundry: true },
  { id: 1, name: "A113 Transitional Housing", city: "Santa Monica", state: "CA", photo: "brandon-griggs-wR11KBaB86U-unsplash.jpg", availableUnits: 0, wifi: false, laundry: true },
  { id: 2, name: "Warm Beds Housing Support", city: "Juneau", state: "AK", photo: "i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg", availableUnits: 1, wifi: false, laundry: false },
  { id: 3, name: "Homesteady Housing", city: "Chicago", state: "IL", photo: "ian-macdonald-W8z6aiwfi1E-unsplash.jpg", availableUnits: 1, wifi: true, laundry: false },
  { id: 4, name: "Happy Homes Group", city: "Gary", state: "IN", photo: "krzysztof-hepner-978RAXoXnH4-unsplash.jpg", availableUnits: 1, wifi: true, laundry: false },
  { id: 5, name: "Hopeful Apartment Group", city: "Oakland", state: "CA", photo: "r-architecture-JvQ0Q5IkeMM-unsplash.jpg", availableUnits: 2, wifi: true, laundry: true },
  { id: 6, name: "Seriously Safe Towns", city: "Oakland", state: "CA", photo: "phil-hearing-IYfp2Ixe9nM-unsplash.jpg", availableUnits: 5, wifi: true, laundry: true },
  { id: 7, name: "Hopeful Housing Solutions", city: "Oakland", state: "CA", photo: "ev.webp", availableUnits: 2, wifi: true, laundry: true },
  { id: 8, name: "Seriously Safe Towns", city: "Oakland", state: "CA", photo: "saru-robert-9rP3mxf8qWI-unsplash.jpg", availableUnits: 10, wifi: false, laundry: false },
  { id: 9, name: "Capital Safe Towns", city: "Portland", state: "OR", photo: "webaliser-_TPTXZd9mOo-unsplash.jpg", availableUnits: 6, wifi: true, laundry: true }
];

async function seed() {
  for (const location of locations) {
    await setDoc(
      doc(db, "housingLocations", location.id.toString()),
      location
    );
    console.log("Eklendi:", location.name, "→ ID:", location.id);
  }
  console.log("Tüm evler eklendi! ✅");
  process.exit(0);
}

seed();