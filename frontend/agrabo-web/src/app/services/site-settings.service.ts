import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SiteSettings {
  businessName: string;
  whatsappNumber: string;
  phonePrimary?: string;
  email?: string;
  location?: string;
  deliveryFee: number;
  deliveryAreas?: string;
}

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(`${environment.apiUrl}/settings`).pipe(
      catchError(() =>
        of({
          businessName: 'AGRABO Enterprises Limited',
          whatsappNumber: environment.whatsappNumber,
          phonePrimary: '0706506319',
          email: 'sales@agrabo.co.ug',
          location: 'Kampala, Uganda',
          deliveryFee: 5000,
          deliveryAreas: 'Kampala and nearby areas'
        })
      )
    );
  }
}
