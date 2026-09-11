import { View, Text, FlatList } from 'react-native'
import { usePedido } from '../context/PedidoContext'
import { formatarPreco } from '../data/cardapio'
import { styles } from '../styles/styles'

function formatarData(dataIso) {
  const data = new Date(dataIso)
  if (Number.isNaN(data.getTime())) return 'Data indisponível'
  return data.toLocaleString('pt-BR')
}

export default function PedidosScreen() {
  const { pedidos } = usePedido()

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum pedido finalizado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.pedidoCard}>
            <Text style={styles.pedidoData}>{formatarData(item.data)}</Text>
            {item.itens.slice(0, 30).map((produto) => (
              <Text key={`${item.id}-${produto.produtoId}`} style={styles.pedidoItem}>
                {produto.quantidade}x {produto.nome}
              </Text>
            ))}
            <Text style={styles.itemPreco}>Total: {formatarPreco(item.totalCentavos)}</Text>
          </View>
        )}
      />
    </View>
  )
}
