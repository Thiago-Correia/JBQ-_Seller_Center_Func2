import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from './produtos/produtos.interface';

@Injectable()
export class ProdutosService {
  // A URL do seu backend. Pode precisar de um proxy ou configurar a URL completa.
  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>('/api/produtos');
  }

  excluirProduto(id: number): Observable<any> {
    const body = { ativo: false };
    return this.http.patch(`/api/produtos/excluir/${id}`, body);
  }
}
