import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// libs javascript
import Swal from 'sweetalert2';
// modules
import { MaterialModule } from '../material/material.module';
// services
import { LoginService } from '../shared/services/login.service';
// Models
import { ILogin } from '../shared/models/login.interface';
import { AppStateService } from '../shared/services/app-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private state: AppStateService,
  ){
    this.iniciarFormulario();
  }

  private iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(2)]]
    });
  } 

  onEntrar(): void{
    const login: ILogin = this.formulario.value;
    this.loginService.autenticacao(login).subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Created){
          this.state.token = response.headers.get('authorization');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        Swal.fire({
          title: "Acesso Negado",
          text: err.error.mensagem,
          icon: "error"
        });
      }
    })
  }
}
