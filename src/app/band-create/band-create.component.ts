import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-band-create',
  templateUrl: './band-create.component.html',
  styleUrls: ['./band-create.component.scss'],
})
export class BandCreateComponent implements OnInit {
  formData: FormGroup;
  readonly localStorageKey = 'band-key';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.formData = this.fb.group({
      name: ['', Validators.required],
      formationYear: [currentYear, Validators.max(currentYear)],
      isActive: false,
      biography: '',
    });

    const lStorage = localStorage.getItem(this.localStorageKey);
    if (lStorage !== null) {
      const formState = JSON.parse(lStorage);
      this.formData.patchValue(formState);
    }

    this.formData.valueChanges.subscribe((formState) =>
      localStorage.setItem(this.localStorageKey, JSON.stringify(formState))
    );
  }
}
