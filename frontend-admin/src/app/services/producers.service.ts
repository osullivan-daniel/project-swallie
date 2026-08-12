import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Producer {
  producerId: uuid;
  producerName: string;
  address: JSON;
  description: string | null;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })

export class ProducerService {
  constructor(private readonly http: HttpClient) {}

  private readonly apiUrl = 'http://127.0.0.1:8000';

  private producersSubject = new BehaviorSubject<Producer[]>([]);

  producers$ = this.producersSubject.asObservable();

  private producersLoaded = false;

  loadProducers(): void {
    if (this.producersLoaded) {
      return;
    }

    console.log('Loading Producers');
    this.http.get<Producer[]>(`${this.apiUrl}/producers/producers`).subscribe({
      next: (producers) => {

        console.log(producers)

        this.producersSubject.next(producers);
        this.producersLoaded = true;

      },
      error: (error) => {
        console.error('Failed to load producers:', error);
      },
    });
  }
}
