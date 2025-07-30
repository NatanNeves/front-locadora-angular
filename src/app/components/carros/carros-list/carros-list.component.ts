import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosDetailsComponent } from '../carros-details/carros-details.component';
import { CarroService } from '../../../services/carro.service';


@Component({
  selector: 'app-carros-list',
  standalone: true,
  imports: [MdbModalModule, CarrosDetailsComponent],
  templateUrl: './carros-list.component.html',
  styleUrl: './carros-list.component.scss'
})
export class CarrosListComponent {

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir o modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>; //referência ao modal
  modalRef!: MdbModalRef<any>; //referência ao modal aberto

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "");

  carroService = inject(CarroService);

  constructor() {
    this.listAll();

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

  listAll() {

    this.carroService.listAll().subscribe({
      next: (bancoDados) => {
        this.lista = bancoDados;
      },
      error: (err) => {
        alert('Erro ao listar carros:' + err.message);
      }
    });
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

        this.carroService.delete(carro.id).subscribe({
          next: (lista) => { //quando o back retorna a lista atualizada
            Swal.fire({
          title: 'Excluído!',
          text: 'Carro deletado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.listAll(); //atualiza a lista de carros
          },
          error: (err) => {
            alert('Erro ao excluir carro: ' + err.message);
          }
        });
      }
    });
  }

  new() {
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe); // <- aqui
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe); // <- aqui
  }


  retornoDetalhe(carro: Carro) {
    this.listAll();
    this.modalRef.close();
  }
}