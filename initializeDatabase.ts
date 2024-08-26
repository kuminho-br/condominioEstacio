import {type SQLiteDatabase } from "expo-sqlite";

export async function criarTabela(database: SQLiteDatabase){
    await database.execAsync(
        //'DROP TABLE AP;'+
        'CREATE TABLE IF NOT EXISTS MORADOR (' +
            'CPF VARCHAR(15) PRIMARY KEY, ' +
            'NOME VARCHAR(50), TELEFONE VARCHAR(15), EMAIL VARCHAR(50)'+
        ');'+
        'CREATE TABLE IF NOT EXISTS AP (' +
            'NUMERO VARCHAR(5) NOT NULL, '+
            'BLOCO VARCHAR(5) NOT NULL, '+
            'ANDAR INTEGER NOT NULL, '+
            'MORADOR_CPF VARCHAR(15), '+
            'TEM_ENTREGA INTEGER DEFAULT 0, '+
            'PRIMARY KEY (NUMERO, BLOCO, ANDAR), '+
            'FOREIGN KEY (MORADOR_CPF) REFERENCES MORADOR(CPF)'+
        ')'
    )
}