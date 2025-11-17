import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from 'src/app/shared/material/material.imports';

@Component({
  selector: 'app-register',
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

}
