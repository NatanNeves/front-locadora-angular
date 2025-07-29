import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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

  lista: Carro[] = [];

  constructor() {
    this.lista.push(new Carro(1, 'Fusca'));
    this.lista.push(new Carro(2, 'Civic'));
    this.lista.push(new Carro(3, 'Corolla'));
    this.lista.push(new Carro(4, 'Onix'));

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }
    if (carroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }
  }

  editar() {

  }

  deleteById(carro: Carro) {
  Swal.fire({
    title: 'Tem certeza que deseja excluir?',
    text: 'Esta ação não poderá ser desfeita.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const indice = this.lista.findIndex(x => x.id === carro.id);
      this.lista.splice(indice, 1);

      Swal.fire({
        title: 'Excluído!',
        text: 'Carro deletado com sucesso.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
  });
}
}
