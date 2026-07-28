import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,              // ✅ EKLE (Çok önemli!)
  imports: [],                   // Şimdilik boş
  templateUrl: './home.html',    // ✅ SADECE BURASI KALMALI, template satırını SİL!
  styleUrl: './home.scss',
})
export class Home {}