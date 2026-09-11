import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { CARDAPIO, formatarPreco } from '../data/cardapio'
import { usePedido } from '../context/PedidoContext'
import ControleQuantidade from '../components/ControleQuantidade'
import { styles } from '../styles/styles'

export default function CardapioScreen() {
  const { carregando, erroArmazenamento, itensCarrinho, alterarQuantidade } = usePedido()

  function quantidadeDoProduto(produtoId) {
    return itensCarrinho.find((item) => item.id === produtoId)?.quantidade || 0
  }

  function renderizarItem({ item, index }) {
    const mostrarCategoria = index === 0 || CARDAPIO[index - 1].categoria !== item.categoria
    const quantidade = quantidadeDoProduto(item.id)

    return (
      <View>
        {mostrarCategoria && <Text style={styles.categoria}>{item.categoria}</Text>}
        <View style={styles.card}>
          <View style={styles.cardConteudo}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemDescricao}>{item.descricao}</Text>
            <Text style={styles.itemPreco}>{formatarPreco(item.precoCentavos)}</Text>
          </View>
          <ControleQuantidade
            quantidade={quantidade}
            aoDiminuir={() => alterarQuantidade(item.id, -1)}
            aoAumentar={() => alterarQuantidade(item.id, 1)}
          />
        </View>
      </View>
    )
  }

  if (carregando) {
    return <View style={styles.centralizado}><ActivityIndicator size="large" color="#b23a20" /></View>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sabor da Casa</Text>
      <Text style={styles.subtitulo}>Escolha seus itens</Text>
      {!!erroArmazenamento && <Text style={styles.erro}>{erroArmazenamento}</Text>}
      <FlatList
        data={CARDAPIO}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  )
}
