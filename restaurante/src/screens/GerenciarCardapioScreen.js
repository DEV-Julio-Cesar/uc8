import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ConectarBD, inicializarBanco } from '../../database/database'
import { atualizarPrato, inserirPrato, listarPratos, removerPrato } from '../../reporitory/pratoRepository'
import { formatarPreco } from '../data/cardapio'
import { usePedido } from '../context/PedidoContext'
import { styles } from '../styles/styles'

const FORMULARIO_VAZIO = { nome: '', categoria: '', descricao: '', preco: '' }

export default function GerenciarCardapioScreen() {
  const [pratos, setPratos] = useState([])
  const [pesquisa, setPesquisa] = useState('')
  const [formulario, setFormulario] = useState(FORMULARIO_VAZIO)
  const [idEditando, setIdEditando] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const { recarregarCardapio } = usePedido()

  const carregar = useCallback(async (termo = pesquisa) => {
    try {
      const db = await ConectarBD()
      await inicializarBanco(db)
      setPratos(await listarPratos(db, termo))
    } catch {
      Alert.alert('Erro', 'Não foi possível consultar o cardápio.')
    } finally {
      setCarregando(false)
    }
  }, [pesquisa])

  useEffect(() => { carregar('') }, [])

  function alterarCampo(campo, valor) {
    setFormulario((atual) => ({ ...atual, [campo]: valor }))
  }

  function editar(prato) {
    setIdEditando(prato.id)
    setFormulario({
      nome: prato.nome,
      categoria: prato.categoria,
      descricao: prato.descricao,
      preco: (prato.precoCentavos / 100).toFixed(2).replace('.', ','),
    })
  }

  function cancelarEdicao() {
    setIdEditando(null)
    setFormulario(FORMULARIO_VAZIO)
  }

  async function salvar() {
    const preco = Number(formulario.preco.replace(',', '.'))
    if (!formulario.nome.trim() || !formulario.categoria.trim() || !Number.isFinite(preco) || preco <= 0) {
      Alert.alert('Dados inválidos', 'Informe nome, categoria e um preço maior que zero.')
      return
    }

    const prato = {
      nome: formulario.nome.trim(),
      categoria: formulario.categoria.trim(),
      descricao: formulario.descricao.trim(),
      precoCentavos: Math.round(preco * 100),
    }

    try {
      setSalvando(true)
      const db = await ConectarBD()
      if (idEditando) await atualizarPrato(db, idEditando, prato)
      else await inserirPrato(db, prato)
      cancelarEdicao()
      await carregar('')
      await recarregarCardapio()
      Alert.alert('Sucesso', idEditando ? 'Prato atualizado.' : 'Prato cadastrado.')
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o prato.')
    } finally {
      setSalvando(false)
    }
  }

  function confirmarRemocao(prato) {
    Alert.alert('Remover prato', `Deseja remover “${prato.nome}”?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => {
        try {
          const db = await ConectarBD()
          await removerPrato(db, prato.id)
          if (idEditando === prato.id) cancelarEdicao()
          await carregar(pesquisa)
          await recarregarCardapio()
        } catch {
          Alert.alert('Erro', 'Não foi possível remover o prato.')
        }
      } },
    ])
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={pratos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listaGerenciamento}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={<>
          <Text style={styles.titulo}>Gerenciar cardápio</Text>
          <Text style={styles.subtitulo}>{idEditando ? 'Atualize os dados do prato' : 'Cadastre um novo prato'}</Text>
          {['nome', 'categoria', 'descricao'].map((campo) => (
            <TextInput
              key={campo}
              style={styles.campo}
              value={formulario[campo]}
              onChangeText={(valor) => alterarCampo(campo, valor)}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            />
          ))}
          <TextInput
            style={styles.campo}
            value={formulario.preco}
            onChangeText={(valor) => alterarCampo('preco', valor)}
            placeholder="Preço (ex.: 29,90)"
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={[styles.botaoPrimario, salvando && styles.botaoDesabilitado]} onPress={salvar} disabled={salvando}>
            <Text style={styles.botaoPrimarioTexto}>{salvando ? 'Salvando...' : idEditando ? 'Atualizar prato' : 'Cadastrar prato'}</Text>
          </TouchableOpacity>
          {idEditando && <TouchableOpacity style={styles.botaoSecundario} onPress={cancelarEdicao}><Text style={styles.botaoSecundarioTexto}>Cancelar edição</Text></TouchableOpacity>}
          <Text style={styles.categoria}>Pratos cadastrados</Text>
          <View style={styles.pesquisaLinha}>
            <TextInput style={[styles.campo, styles.pesquisaCampo]} value={pesquisa} onChangeText={setPesquisa} placeholder="Pesquisar nome ou categoria" returnKeyType="search" onSubmitEditing={() => carregar()} />
            <TouchableOpacity style={styles.botaoPesquisar} onPress={() => carregar()}><Text style={styles.botaoPrimarioTexto}>Buscar</Text></TouchableOpacity>
          </View>
        </>}
        ListEmptyComponent={!carregando && <Text style={styles.vazioLista}>Nenhum prato encontrado.</Text>}
        renderItem={({ item }) => <View style={styles.pedidoCard}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemDescricao}>{item.categoria} · {item.descricao || 'Sem descrição'}</Text>
          <Text style={styles.itemPreco}>{formatarPreco(item.precoCentavos)}</Text>
          <View style={styles.acoesLinha}>
            <TouchableOpacity style={styles.botaoEditar} onPress={() => editar(item)}><Text style={styles.botaoEditarTexto}>Editar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.botaoRemover} onPress={() => confirmarRemocao(item)}><Text style={styles.botaoRemoverTexto}>Remover</Text></TouchableOpacity>
          </View>
        </View>}
      />
    </KeyboardAvoidingView>
  )
}
