import * as SQLite from "expo-sqlite"

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
