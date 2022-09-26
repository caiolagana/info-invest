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
('Ana Pereira', 28, 100000),
('Carlos Nogueira', 49, 200000),
('Almir Soares', 37, 300000);

DROP TABLE fixa;
DROP TABLE variavel;
DROP TABLE fundos;
DROP TABLE acoes;
DROP TABLE tesouro;
DROP TABLE poupanca;
DROP TABLE cripto;

CREATE TABLE fixa(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

INSERT INTO fixa
(cliente, ativo, grupo, quantidade, valor)
VALUES
('Ana Pereira', 'CDB', 'fixa', 1, 50000),
('Carlos Nogueira', 'CDB', 'fixa', 1, 100000);

CREATE TABLE variavel(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE fundos(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

INSERT INTO fundos VALUES
('Carlos Nogueira', 'DNO FII', 'fundos', 1, 100000);

CREATE TABLE acoes(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

INSERT INTO acoes
(cliente, ativo, grupo, quantidade, valor)
VALUES
('Ana Pereira', 'PETR4', 'variavel', 1, 50000),
('Almir Soares', 'PETR4', 'variavel', 1, 300000);

CREATE TABLE tesouro(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE poupanca(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

CREATE TABLE cripto(
	cliente TEXT,
	ativo TEXT,
	grupo TEXT,
	quantidade INT,
	valor FLOAT
);

COMMIT;