import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  formulario!: FormGroup;

  constructor(private fb:FormBuilder){
    this.formulario = fb.group({
      email: '', 
      senha: '',
      nome: '',
      telefone: ''
    });
  }
}
