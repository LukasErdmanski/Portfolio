import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  public contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initContactFormGroupOnInit();
  }

  private initContactFormGroupOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['aaa', [Validators.required], []],
      email: ['bbbbbbbbb', [Validators.required, Validators.email], []],
      message: ['ccccccccccccc', [Validators.required], []],
    });
  }
}
