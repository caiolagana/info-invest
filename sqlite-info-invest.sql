/*
 * Create DB
 */

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE ativos;
DROP TABLE gerentes;
DROP TABLE clientes;

CREATE TABLE ativos(
	nome TEXT,
	grupo TEXT
);

INSERT INTO ativos
(nome, grupo)
VALUES
('ALFA MIX', 'Fundos'),
('DNO FII', 'Fundos'),
('Bitcoin', 'Criptomoedas'),
('PETR4', 'Ações');

CREATE TABLE gerentes(
	nome TEXT,
	idade TEXT
);

INSERT INTO gerentes
(nome, idade)
VALUES
('Arnaldo de Souza', '42'),
('Jorge Alcantara', '50');

CREATE TABLE clientes(
	nome TEXT,
	idade INT,
	saldo FLOAT
);

INSERT INTO clientes
(nome, idade, saldo)
VALUES
('Ana Pereira', 28, 94809.10),
('Carlos Nogueira', 49, 1114719.28),
('Almir Soares', 37, 6798111.42);

DROP TABLE fixa;
DROP TABLE variavel;
DROP TABLE fundos;
DROP TABLE acoes;
DROP TABLE tesouro;
DROP TABLE poupanca;
DROP TABLE cripto;

CREATE TABLE fixa(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

INSERT INTO fixa
(cliente, titulo, quantidade, valor)
VALUES
('Ana Pereira', 'CDB', 1, 10000);

CREATE TABLE variavel(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE fundos(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE acoes(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

INSERT INTO acoes
(cliente, titulo, quantidade, valor)
VALUES
('Ana Pereira', 'PETR4', 100, 23.50);

CREATE TABLE tesouro(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE poupanca(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE cripto(
	cliente TEXT,
	titulo TEXT,
	quantidade INT,
	valor FLOAT
);

COMMIT;