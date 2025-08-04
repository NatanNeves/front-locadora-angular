import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carro.service';
import { CarroDTO } from '../../../models/carro-dto'; 

@Component({
  selector: 'app-carros-details',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carros-details.component.html',
  styleUrls: ['./carros-details.component.scss']
})
export class CarrosDetailsComponent {
  @Input('carro') carro: Carro = new Carro(0, '');
  @Output() retorno = new EventEmitter<any>();

  private router = inject(ActivatedRoute);
  private router2 = inject(Router);
  private carroService = inject(CarroService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.carroService.findById(id).subscribe({
      next: (retorno) => {
        this.carro = retorno;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }
    });
  }

  save() {
  const dto: CarroDTO = {
    nome: this.carro.nome,
    marca: this.carro.marca,
    modelo: this.carro.modelo,
    ano: this.carro.ano
  };

  console.log('DTO enviado:', dto);

  if (this.carro.id > 0) {
    this.carroService.update(dto, this.carro.id).subscribe({
      next: (msg) => {
        Swal.fire({
          title: msg,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        this.router2.navigate(['/admin/carros'], { state: { carroEditado: this.carro } });
        this.retorno.emit(this.carro);
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }
    });
  } else {
    this.carroService.save(dto).subscribe({
      next: (msg) => {
        Swal.fire({
          title: msg,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        this.router2.navigate(['/admin/carros'], { state: { carroNovo: this.carro } });
        this.retorno.emit(this.carro);
      },
      error: () => {
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