import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;

  validation_messages = {
    'dni': [
      { type: 'required', message: 'DNI requerido.' },
      { type: 'minlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'maxlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'pattern', message: 'El DNI debe estar formado por 8 números y 1 letra final.' },
      { type: 'invalidDNI', message: 'Letra no corresponde a DNI válido.' }
    ],
    'codigoIban': [
      { type: 'required', message: 'IBAN requerido.' },
      { type: 'minlength', message: 'El IBAN debe contener 24 caracteres.' },
      { type: 'maxlength', message: 'El IBAN debe contener 24 caracteres.' },
      { type: 'pattern', message: 'El IBAN debe empezar por 2 letras (ES para España) seguido de 22 números.' },
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({

      dni: new FormControl('', Validators.compose([
        this.invalidDNI,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('^[0-9]{8}[a-zA-Z]$'),
        Validators.required
      ])),
      codigoIban: new FormControl('', Validators.compose([
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.pattern('^[a-zA-Z]{2}[0-9]{22}$'),
        Validators.required
      ]))
    },
    );
  }

  invalidDNI(fc: FormControl) {
    var numero;
    var letra;
    var letraLista;
    var bool = true;
    numero = fc.value.substr(0, fc.value.length - 1);
    letra = fc.value.substr(fc.value.length - 1, 1);
    numero = numero % 23;
    letraLista = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letraLista = letraLista.substring(numero, numero + 1);
    if (letraLista != letra.toUpperCase()) {
      bool = true;
    } else {
      bool = false;
    }

    if (bool) {
      return ({ invalidDNI: true });
    } else {
      return (null);
    }
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }
}