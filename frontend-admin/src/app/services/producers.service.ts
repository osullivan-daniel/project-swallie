import { v4 as uuid } from 'uuid';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from './product.service';



interface Address {
  street1: string;
  street2?: string;
  city: string;
  county: string;
  postCode: string;
  country: string;
}


export interface Producer {
  producerId?: uuid;
  producerName: string;
  address: Address;
  description: string | null;
  isActive?: boolean;
  products: Product[] | null;
}

@Injectable({ providedIn: 'root' })
export class ProducerService {
  constructor(private readonly http: HttpClient) {}

  private producersSubject = new BehaviorSubject<Producer[]>([]);

  producers$ = this.producersSubject.asObservable();

  private producersLoaded = false;

  loadProducers(forceReload = false): void {
    if (this.producersLoaded && !forceReload) {
      return;
    }

    console.log('Loading Producers');
    this.http.get<Producer[]>(`/producers/producers`).subscribe({
      next: (producers) => {
        console.log(producers);

        this.producersSubject.next(producers);
        this.producersLoaded = true;
      },
      error: (error) => {
        console.error('Failed to load producers:', error);
      },
    });
  }

  createProducer(newProducer: Producer): Observable<Producer> {
    return this.http
      .post<Producer>(`/producers/createProducer`, newProducer)
      .pipe(
        tap((producer) => {

          const currentProducers = this.producersSubject.value;
          console.log('Created new producer', producer);

          this.producersSubject.next([
            ...currentProducers,
            producer,
          ]);
        }),
      );
  }
}
