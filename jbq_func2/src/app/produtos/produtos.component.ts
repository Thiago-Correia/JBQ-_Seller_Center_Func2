
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { ProdutosService } from '../produtos.service';
import { Produto } from './produtos.interface';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ] 
})

export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  loading: boolean = true;
  error: string | null = null;

  //Injeção de dependência:
  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar os produtos: ' + err.message;
        this.loading = false;
        console.error('Houve um erro na chamada de API:', err);
      }
    });
  }

  onExcluir(id: number, nome: string): void {
    if (!confirm(`Tem certeza que deseja excluir ${nome}?`)) {
      return;
    }
    this.produtosService.excluirProduto(id).subscribe({
      next: () => {
        //Filtrar para excluir o produto em questão
        this.produtos = this.produtos.filter(p => p.id != id);
        console.log(`${nome} foi excluído.`);
      },
      error: (err: any) => {
        this.error = `Falha ao excluir ${nome}`;
        console.error('Erro na exclusão: ', err);
      }
    })
  }
}