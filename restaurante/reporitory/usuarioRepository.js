export async function inserirUsuario(db, { nome, email, senha }){
     const result = await db.runAsync(
         "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
         [nome, email, senha]
     )
         if(result.lastInsertRowId){
            console.log
             ("Usuário inserido com sucesso!")
         }else{
            console.log("Erro ao inserir usuário")
         }

        }
    export async function mostrarUsuarios(db){
     const usuarios = await db.getAllAsync("SELECT * FROM usuarios")
     if(usuarios.length > 0){
     console.log("Usuarios Encontrados:", usuarios)
    
 }else{

    console.log("Nenhum usuario encontrado")

 }
}

export async function mostrarUsuario(db, id){
    try{
    const result = await db.getFirstAsync("SELECT * FROM usuarios WHERE id = ?", id)
    if(result){

        console.log("Usuario encontrado", result)
            }else{
        console.log("Usuario não encontrado")
            }
    } catch(e){
        console.log("Erro ao buscar usuario", e)
    }
 }

export async function atualizarUsuario(db, id, { nome, email, senha }) {
    try{
        const result = await db.runAsync(
            "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
            [nome, email, senha, id]
        )

        if(result.changes > 0){
            console.log("Usuario atualizado com sucesso!")
            return true
        }

        console.log("Usuario nao encontrado")
        return false
    }catch(e){
        console.log("Erro ao atualizar usuario", e)
        return false
    }
}

export async function deletarUsuario(db, id) {
    try {
        const result = await db.runAsync(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        )

        if (result.changes > 0) {
            console.log("Usuario deletado com sucesso!")
            return true
        }

        console.log("Usuario nao encontrado")
        return false
    } catch (e) {
        console.log("Erro ao deletar usuario", e)
        return false
    }
}
