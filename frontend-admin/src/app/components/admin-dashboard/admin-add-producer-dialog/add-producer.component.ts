import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Producer, ProducerService} from '../../../services/producers.service';

@Component({
  selector: 'app-add-producer',
  styleUrl: './add-producer.component.css',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-producer.component.html'
})
export class AddProducerComponent {

  constructor(
    private readonly producerService: ProducerService
  ) {
    console.log('addProducerComponent constructed');
  }

  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<AddProducerComponent>);

  readonly newProducerForm = this.fb.group({
    producerName: ['', Validators.required],

    address: this.fb.group({
      street1: ['', [Validators.maxLength(200), Validators.required]],
      street2: ['', [Validators.maxLength(200)]],
      city: ['', [Validators.maxLength(100), Validators.required]],
      county: ['', [Validators.maxLength(100), Validators.required]],
      postCode: ['', [Validators.maxLength(20), Validators.required]],
      country: ['', [Validators.maxLength(100), Validators.required]]
    }),

    description: ['', Validators.maxLength(1500)]
  });

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(newProducerForm) : void {
    if (this.newProducerForm.invalid) {
      this.newProducerForm.markAllAsTouched();
      return;
    }

    const producer: Producer = newProducerForm.getRawValue() as Producer;

    this.producerService.createProducer(producer).subscribe({
      next: (createdProducer) => {
        this.dialogRef.close(createdProducer);
      }
    });

    console.log(producer);
  }
  
}