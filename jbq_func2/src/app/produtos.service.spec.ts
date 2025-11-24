import { TestBed } from '@angular/core/testing';
//Módulos de Teste para simular o HTTP
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProdutosService } from './produtos.service'; 
import { Produto } from './produtos/produtos.interface';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpMock: HttpTestingController; // Controlador para simular respostas HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      //Módulo de teste HTTP
      imports: [HttpClientTestingModule], 
      providers: [ProdutosService]
    });
    
    service = TestBed.inject(ProdutosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //Garante que não há requisições HTTP pendentes após cada teste
  afterEach(() => {
    httpMock.verify();
  });

  //Teste unitário
  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });
  
  it('deve retornar uma lista de produtos (via GET)', () => {
    // Dados simulados que o servidor retornaria
    const mockProdutos: Produto[] = [
      { id: 1, nome: 'Mouse', preco: 50, estoque: 200},
      { id: 2, nome: 'Teclado', preco: 150, estoque: 250}
    ];

    service.getProdutos().subscribe(produtos => {
      expect(produtos).toEqual(mockProdutos);
    });

    //Crias uma requisição HTTP falsa
    const req = httpMock.expectOne('api/produtos');
    expect(req.request.method).toBe('GET');

    //Responde à requisição falsa com os dados simulados
    req.flush(mockProdutos);
  });

});