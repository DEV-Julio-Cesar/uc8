import * as SQLite from "expo-sqlite"
import { CARDAPIO } from '../src/data/cardapio'

export async function ConectarBD(){
 const db = await SQLite.openDatabaseAsync("database.db")
 if(db){
        console.log
("Banco de dados aberto com sucesso")
return db

    }else{
        console.log("Erro ao abrir o banco de dados")
    }
}

export async function inicializarBanco(db) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            senha TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS pratos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            categoria TEXT NOT NULL,
            nome TEXT NOT NULL,
            descricao TEXT NOT NULL DEFAULT '',
            preco_centavos INTEGER NOT NULL CHECK (preco_centavos > 0)
        );
        CREATE TABLE IF NOT EXISTS configuracoes (
            chave TEXT PRIMARY KEY NOT NULL,
            valor TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_pratos_nome ON pratos(nome);
    `)

    const cardapioInicializado = await db.getFirstAsync(
        "SELECT valor FROM configuracoes WHERE chave = 'cardapio_inicializado'"
    )
    if (!cardapioInicializado) {
        await db.withExclusiveTransactionAsync(async (transacao) => {
            const { total } = await transacao.getFirstAsync('SELECT COUNT(*) AS total FROM pratos')
            if (total === 0) {
                for (const prato of CARDAPIO) {
                    await transacao.runAsync(
                        'INSERT INTO pratos (categoria, nome, descricao, preco_centavos) VALUES (?, ?, ?, ?)',
                        [prato.categoria, prato.nome, prato.descricao, prato.precoCentavos]
                    )
                }
            }
            await transacao.runAsync(
                "INSERT INTO configuracoes (chave, valor) VALUES ('cardapio_inicializado', '1')"
            )
        })
    }
}

export async function criarTabelaUsuarios(db){
    try {
        await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        email TEXT,
        senha TEXT
    );
    CREATE TABLE IF NOT EXISTS agendamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        paciente TEXT,
        medico TEXT
        )`)

        const tabelaUsuarios = await db.getFirstAsync(
            "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'usuarios'"
        )

        if (tabelaUsuarios?.sql?.includes("senha UNIQUE")) {
            await db.withTransactionAsync(async () => {
                await db.execAsync(`
                    DROP TABLE IF EXISTS usuarios_migracao;
                    CREATE TABLE usuarios_migracao (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nome TEXT,
                        email TEXT,
                        senha TEXT
                    );
                    INSERT INTO usuarios_migracao (id, nome, email, senha)
                    SELECT id, nome, email, senha FROM usuarios;
                    DROP TABLE usuarios;
                    ALTER TABLE usuarios_migracao RENAME TO usuarios;
                `)
            })
        }

        console.log("Tabela usuarios criada com sucesso")
    } catch {
        console.log("Erro ao criar tabela usuarios")
    }
}

export async function apagarTabelaUsuarios(db){
    if (db) {
        await db.execAsync(`
    DROP TABLE IF EXISTS usuarios
`)
        console.log("Tabela usuarios apagada com sucesso")
    } else {
        console.log("Erro ao apagar tabela usuarios")
    }
}
