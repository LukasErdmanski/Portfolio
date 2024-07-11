import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  contactFormEmailAddressValidatorFn,
  contactFormMessageValidatorFn,
  contactFormNameValidatorFn,
} from '../../utils/contact-form-validator.functions';

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

  protected isFormDisabled = false;

  constructor(private formBuilder: FormBuilder) {
    this.initContactFormGroupOnInit();
  }

  private initContactFormGroupOnInit(): void {
    this.contactFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, contactFormNameValidatorFn()], []],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          contactFormEmailAddressValidatorFn(),
        ],
        [],
      ],
      message: ['', [Validators.required, contactFormMessageValidatorFn()], []],
    });
  }

  protected async sendEmail(): Promise<void> {
    this.isFormDisabled = true;
    this.setContactFormElementsDisabled(true);

    const formData = this.getFormData();

    // TODO: check the final string result value in the POST requst body after setting 'body: formData', if it has to be set just like this 'body: formData' or one method call of FormData interface or foreach iteration of values has been done before setting.
    // await fetch("https://lukaserdmanski.de/send_mail/send_mail.php", {method: 'POST', body: formData});

    // TODO: replace later after setting server with right fetch method
    await this.simulateFetch(formData);

    this.playSendAudio();

    this.setContactFormElementsDisabled(false);
    this.isFormDisabled = false;

    this.contactFormGroup.reset();
  }

  protected getFormData(): FormData {
    const formData = new FormData();
    formData.append('name', this.formName.nativeElement.value);
    formData.append('email', this.formEmail.nativeElement.value);
    formData.append('message', this.formMessage.nativeElement.value);

    // TODO: maybe return here the completed iterated string like in the temporally 'printConsoleOutputFromFormData' method
    return formData;
  }

  // TODO: replace later after setting server with right fetch method
  private async simulateFetch(formData: FormData): Promise<void> {
    return new Promise<void>(
      (resolve, reject, formData2: FormData = formData) => {
        setTimeout(() => {
          debugger;

          function printConsoleOutputFromFormData(formData: FormData): string {
            let output: string = '\n';
            formData.forEach((item: FormDataEntryValue, key: string) => {
              output += `\n[${key}]: ${item}`;
            });
            return output;
          }

          let resolveValue = console.log(
            'Email has beed successfully send with this form data: ',
            printConsoleOutputFromFormData(formData2)
          );

          resolve(resolveValue);

          // TODO: reject() ==> implement error treating and show information / maybe error info component in place of default contact-form component for the user
        }, 3000);
      }
    );
  }

  private playSendAudio(): void {
    const audio = new Audio();
    audio.src = 'src/assets/sounds/swish.mp3';
    audio.load();
    audio.play();
  }

  private setContactFormElementsDisabled(value: boolean): void {
    this.formName.nativeElement.disabled = value;
    this.formEmail.nativeElement.disabled = value;
    this.formMessage.nativeElement.disabled = value;
    this.formBtn.nativeElement.disabled = value;
  }
}
