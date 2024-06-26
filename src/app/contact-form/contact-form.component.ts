import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @ViewChild('contactForm') contactForm!: HTMLFormElement;
  @ViewChild('formName') formName!: ElementRef;
  @ViewChild('formEmail') formEmail!: ElementRef;
  @ViewChild('formMessage') formMessage!: ElementRef;
  @ViewChild('formButton') formBtn!: ElementRef;

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

  protected async sendEmail(): Promise<void> {
    this.setContactFormElementsDisabled(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
        console.log('Email has beed successfully send.');
        this.setContactFormElementsDisabled(false);
      }, 10000);
    });
  }

  private setContactFormElementsDisabled(value: boolean) {
    this.formName.nativeElement.disabled = value;
    this.formEmail.nativeElement.disabled = value;
    this.formMessage.nativeElement.disabled = value;
    this.formBtn.nativeElement.disabled = value;
  }
}
