import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carros-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss'
})
export class CarrosListComponent {

  id!: number;
  nome!: string;

  lista: Carro []=[];

  constructor(){
    this.lista.push(new Carro(1, 'Fusca'));
    this.lista.push(new Carro(2, 'Civic'));
    this.lista.push(new Carro(3, 'Corolla'));
    this.lista.push(new Carro(4, 'Onix'));
  }

  editar(){

  }

  excluir(){

  }
}
