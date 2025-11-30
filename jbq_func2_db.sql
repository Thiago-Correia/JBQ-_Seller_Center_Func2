create schema jbq_func2_db;

use jbq_func2_db;

create table produtos (
	id int not null auto_increment,
    nome varchar(255) not null,
    preco decimal(10, 2) not null,
    estoque int not null,
    ativo boolean default true,
    primary key (id)
);

INSERT INTO produtos (nome, preco, estoque, ativo)
VALUES
('Caderno Universitário', 19.90, 150, true),

('Caneta Azul', 2.50, 500, true),

('Mochila Escolar', 129.90, 40, true),

('Lápis HB', 1.20, 300, true),

('Borracha Branca', 3.00, 200, true),

('Regua 30cm', 4.50, 120, true),

('Livro de Matemática', 59.90, 80, true),

('Apontador Simples', 2.00, 250, true),

('Marcador de Texto', 5.90, 90, true),

('Agenda 2025', 24.90, 60, true);
