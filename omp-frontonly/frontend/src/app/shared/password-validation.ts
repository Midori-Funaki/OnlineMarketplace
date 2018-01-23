import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let passwordCheck = AC.get('passwordCheck').value; // to get value in input tag
        if(password != passwordCheck) {
            //console.log('false');
            AC.get('passwordCheck').setErrors( {MatchPassword: true} )
        } else {
            //console.log('true');
            return null;
        }
    }
}