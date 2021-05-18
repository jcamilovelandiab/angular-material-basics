import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide: Boolean = true;
  
  signInForm: FormGroup;

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  loading: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }
    console.log(this.signInForm.value);
    this.loading = true;
    this.openSnackBar();
    setTimeout(()=> {
      this.loading = false;
    }, 5000 );
  }

  openSnackBar(){
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      duration: 5000
    });
  }

}

@Component({
  selector: 'app-snackbar',
  template: `
    <div class='root-snackbar'>
      You logged in!
    </div>
  `,
  styles: [`
    .root-snackbar {
      color: hotpink;
    }
  `]
})
export class SnackbarComponent {}
