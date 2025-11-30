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

  atualizarProduto(produto: Produto): Observable<any> {
    return this.http.patch(`/api/produtos/atualizar/${produto.id}`, produto);
    //Usar <any> ou o tipo de resposta que o backend retorna após a atualização.
  }

  excluirProduto(id: number): Observable<any> {
    const body = { ativo: false };
    return this.http.patch(`/api/produtos/excluir/${id}`, body);
  }
 //exclui múltiplos produtos definindo o campo "ativo" como falso no banco.

excluirVariosProdutos(ids: number[]): Observable<any> {
  const body = { ids, ativo: false };

  return this.http.patch(`/api/produtos/excluir-varios`, body);
}

}
