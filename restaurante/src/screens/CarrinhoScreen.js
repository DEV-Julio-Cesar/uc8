import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { usePedido } from '../context/PedidoContext'
import { formatarPreco } from '../data/cardapio'
import ControleQuantidade from '../components/ControleQuantidade'
import { styles } from '../styles/styles'

export default function CarrinhoScreen({ navigation }) {
  const { itensCarrinho, totalCentavos, alterarQuantidade } = usePedido()

  function renderizarItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardConteudo}>
          <Text style={styles.itemNome}>{item.nome}</Text>
          <Text style={styles.itemDescricao}>
            {formatarPreco(item.precoCentavos)} cada
          </Text>
          <Text style={styles.itemPreco}>
            Subtotal: {formatarPreco(item.precoCentavos * item.quantidade)}
          </Text>
        </View>
        <ControleQuantidade
          quantidade={item.quantidade}
          aoDiminuir={() => alterarQuantidade(item.id, -1)}
          aoAumentar={() => alterarQuantidade(item.id, 1)}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>
      <FlatList
        data={itensCarrinho}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.vazio}>Seu carrinho está vazio.</Text>}
      />
      {itensCarrinho.length > 0 && (
        <View style={styles.rodape}>
          <Text style={styles.total}>Total: {formatarPreco(totalCentavos)}</Text>
          <TouchableOpacity style={styles.botaoPrimario} onPress={() => navigation.navigate('Resumo')}>
            <Text style={styles.botaoPrimarioTexto}>Revisar pedido</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
