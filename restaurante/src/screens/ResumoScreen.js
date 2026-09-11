import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { usePedido } from '../context/PedidoContext'
import { formatarPreco } from '../data/cardapio'
import { styles } from '../styles/styles'

export default function ResumoScreen({ navigation }) {
  const { itensCarrinho, totalCentavos, finalizarPedido } = usePedido()
  const [finalizando, setFinalizando] = useState(false)

  function confirmar() {
    if (finalizando || itensCarrinho.length === 0) return
    setFinalizando(true)

    if (!finalizarPedido()) {
      setFinalizando(false)
      Alert.alert('Carrinho vazio', 'Adicione itens antes de finalizar.')
      return
    }

    Alert.alert('Pedido finalizado!', 'Seu pedido foi registrado com sucesso.', [
      { text: 'OK', onPress: () => navigation.navigate('Restaurante', { screen: 'Pedidos' }) },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do pedido</Text>
      <FlatList
        data={itensCarrinho}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.resumoLinha}>
            <Text style={styles.resumoItem}>{item.quantidade}x {item.nome}</Text>
            <Text style={styles.resumoValor}>{formatarPreco(item.precoCentavos * item.quantidade)}</Text>
          </View>
        )}
      />
      <View style={styles.rodape}>
        <Text style={styles.total}>Total: {formatarPreco(totalCentavos)}</Text>
        <TouchableOpacity style={styles.botaoPrimario} onPress={confirmar} disabled={finalizando}>
          <Text style={styles.botaoPrimarioTexto}>Finalizar pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()} disabled={finalizando}>
          <Text style={styles.botaoSecundarioTexto}>Voltar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
