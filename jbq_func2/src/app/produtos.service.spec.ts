import { TestBed } from '@angular/core/testing';
// 1. Módulos de Teste para simular o HTTP
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// 2. Importe o Service real e a Interface Produto
import { ProdutosService } from './produtos.service'; 
import { Produto } from './produtos/produtos.interface';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpMock: HttpTestingController; // Controlador para simular respostas HTTP

  beforeEach(() => {
    TestBed.configureTestingModule({
      // 3. Importe o módulo de teste HTTP
      imports: [HttpClientTestingModule], 
      // 4. Declare o Service (Opcional, mas boa prática)
      providers: [ProdutosService]
    });
    
    // Injeta a instância do Service e do Mock HTTP
    service = TestBed.inject(ProdutosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // 5. Garante que não há requisições HTTP pendentes após cada teste
  afterEach(() => {
    httpMock.verify();
  });

  // --- Exemplo de um teste unitário ---
  it('deve ser criado', () => {
    expect(service).toBeTruthy(); // Verifica se o Service foi criado com sucesso
  });
  
  it('deve retornar uma lista de produtos (via GET)', () => {
    // Dados simulados que o servidor retornaria
    const mockProdutos: Produto[] = [
      { id: 1, nome: 'Mouse', preco: 50, estoque: 200},
      { id: 2, nome: 'Teclado', preco: 150, estoque: 250}
    ];

    // Chamamos o método do nosso service
    service.getProdutos().subscribe(produtos => {
      // Verificamos se o array retornado é igual aos dados simulados
      expect(produtos).toEqual(mockProdutos);
    });

    // Criamos uma requisição HTTP Falsa (Mock)
    const req = httpMock.expectOne('api/produtos'); // Verifique se a URL está correta
    expect(req.request.method).toBe('GET');

    // Respondemos à requisição falsa com os dados simulados
    req.flush(mockProdutos);
  });

});