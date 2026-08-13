import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  private readonly fb = inject(FormBuilder);

  readonly dialogRef = inject(MatDialogRef<AddProducerComponent>);

  // We'll use this later when wiring the API call.
  // private readonly producerService = inject(ProducerService);

  readonly newProducerForm = this.fb.group({
    producerName: ['', Validators.required],

    address: this.fb.group({
      street1: ['', Validators.required],
      street2: [''],
      city: ['', Validators.required],
      county: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required]
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

    const producer = this.newProducerForm.getRawValue();

    // API call goes here.
    //
    // this.producerService.createProducer(producer).subscribe({
    //   next: (createdProducer) => {
    //     this.dialogRef.close(createdProducer);
    //   }
    // });

    console.log(producer);
  }
  
}