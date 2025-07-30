import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carros-details',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-details.component.html',
  styleUrl: './carros-details.component.scss'
})
export class CarrosDetailsComponent {
  @Input("carro") carro: Carro = new Carro(0, "");
  @Output() retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  carroService = inject(CarroService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {

    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },
      error: (err) => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
    });

  }

  save() {

    console.log('Carro enviado:', this.carro);

    if (this.carro.id > 0) {

      //atualizar carro
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: msg => {
          Swal.fire({
            title: msg,
            icon: 'success',
            confirmButtonText: 'ok',
          });
          this.router2.navigate(['/admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);

        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
      });


    } else {
      //cadastrar carro
      this.carroService.save(this.carro).subscribe({
        next: msg => {
          Swal.fire({
            title: msg,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['/admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);

        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
      });
    }
  }

}
