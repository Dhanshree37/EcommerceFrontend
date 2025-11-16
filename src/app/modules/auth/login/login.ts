import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from 'src/app/shared/material/material.imports';


@Component({
  selector: 'app-login',
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
