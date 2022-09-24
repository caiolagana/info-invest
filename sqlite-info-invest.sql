/*
 * Create DB
 */

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

DROP TABLE ativos;

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

COMMIT;