import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @ViewChild('contact') contactForm!: HTMLFormElement;
  @ViewChild('name') nameForm!: HTMLInputElement;
  @ViewChild('email') emailForm!: HTMLInputElement;
  @ViewChild('message') messageForm!: HTMLTextAreaElement;
  @ViewChild('button') btnForm!: HTMLButtonElement;

  public contactFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initContactFormGroupOnInit();
  }

  private initContactFormGroupOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: ['', [Validators.required], []],
      email: ['', [Validators.required, Validators.email], []],
      message: ['', [Validators.required], []],
    });
  }
}
