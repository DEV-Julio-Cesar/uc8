function mapearPrato(prato) {
  return {
    id: String(prato.id),
    categoria: prato.categoria,
    nome: prato.nome,
    descricao: prato.descricao,
    precoCentavos: prato.preco_centavos,
  }
}

export async function listarPratos(db, pesquisa = '') {
  const termo = pesquisa.trim()
  const registros = termo
    ? await db.getAllAsync(
      `SELECT * FROM pratos
       WHERE nome LIKE ? COLLATE NOCASE OR categoria LIKE ? COLLATE NOCASE
       ORDER BY categoria, nome`,
      [`%${termo}%`, `%${termo}%`]
    )
    : await db.getAllAsync('SELECT * FROM pratos ORDER BY categoria, nome')
  return registros.map(mapearPrato)
}

export async function buscarPrato(db, id) {
  const registro = await db.getFirstAsync('SELECT * FROM pratos WHERE id = ?', Number(id))
  return registro ? mapearPrato(registro) : null
}

export async function inserirPrato(db, prato) {
  return db.runAsync(
    'INSERT INTO pratos (categoria, nome, descricao, preco_centavos) VALUES (?, ?, ?, ?)',
    [prato.categoria, prato.nome, prato.descricao, prato.precoCentavos]
  )
}

export async function atualizarPrato(db, id, prato) {
  return db.runAsync(
    `UPDATE pratos SET categoria = ?, nome = ?, descricao = ?, preco_centavos = ?
     WHERE id = ?`,
    [prato.categoria, prato.nome, prato.descricao, prato.precoCentavos, Number(id)]
  )
}

export async function removerPrato(db, id) {
  return db.runAsync('DELETE FROM pratos WHERE id = ?', Number(id))
}
