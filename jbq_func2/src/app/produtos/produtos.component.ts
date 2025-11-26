
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { Produto } from './produtos.interface';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    FormsModule
  ] 
})

export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  loading: boolean = true;
  error: string | null = null;

  public editandoId: number | null = null;
  private produtoOriginal: Produto | null = null;
  public mudancasPendentes: boolean = false;

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

  onEditar(produto: Produto): void {
    if (!this.produtoOriginal) {
      this.produtoOriginal = { ...produto };
      this.editandoId = produto.id;
      this.mudancasPendentes = false;
    } else if (this.editandoId === produto.id) {
      this.confirmarEdicao(produto);
    } else {
      return;
    }
  }

  confirmarEdicao(produto: Produto): void {
    this.produtosService.atualizarProduto(produto).subscribe({
      next: () => {
        this.editandoId = null;
        this.produtoOriginal = null;
        this.mudancasPendentes = false;
      },
      error: () => {
        this.error = `Falha ao atualizar ${produto.nome}.`;
      }
    });
  }

  onExcluir(produto: Produto): void {
    if (!this.produtoOriginal) {
      if (!confirm(`Tem certeza que deseja excluir ${produto.nome}?`)) {
        return;
      }
      this.produtosService.excluirProduto(produto.id).subscribe({
        next: () => {
          //Filtrar para excluir o produto em questão
          this.produtos = this.produtos.filter(p => p.id != produto.id);
        },
        error: () => {
          this.error = `Falha ao excluir ${produto.nome}`;
        }
      })
    }
  }

  onCancelarEdicao(produto: Produto): void {
    if (this.produtoOriginal) {
      Object.assign(produto, this.produtoOriginal);
    }
    this.editandoId = null; 
    this.produtoOriginal = null;
    this.mudancasPendentes = false;
  }

  onInputNovo(produto: Produto): void {
    if (!this.produtoOriginal) {
      this.mudancasPendentes = false;
    } else {
      this.mudancasPendentes = !this.compararProdutos(produto, this.produtoOriginal);
    }
  }

  compararProdutos(produtoA: Produto, produtoB: Produto): boolean {
    const { id: idA, ...restA } = produtoA;
    const { id: idB, ...restB } = produtoB;
    const jsonProdutoA = JSON.stringify(restA, Object.keys(restA).sort());
    const jsonProdutoB = JSON.stringify(restB, Object.keys(restB).sort());

    return jsonProdutoA === jsonProdutoB;
  }
}