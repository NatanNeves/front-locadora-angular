import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';
import { CarroDTO } from '../models/carro-dto'; 

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

  API = "http://localhost:8080/api/carros";

  constructor() { }

  listAll(): Observable<Carro[]> {
    return this.http.get<Carro[]>(this.API);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/' + id, {responseType: 'text' as 'json'});
  }

 
  save(carro: CarroDTO): Observable<string> {
    return this.http.post<string>(this.API, carro, {responseType: 'text' as 'json'});
  }

  update(carro: CarroDTO, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, carro, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + "/" + id);
  }

}
