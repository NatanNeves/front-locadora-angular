import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';

@Component({
  selector: 'app-carros-details',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-details.component.html',
  styleUrl: './carros-details.component.scss'
})
export class CarrosDetailsComponent {
  carro: Carro=(new Carro(0, ""));

  save(){
    alert("Carro salvo com sucesso!");
  }
}
