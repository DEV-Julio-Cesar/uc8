import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles/styles'

export default function ControleQuantidade({ quantidade, aoDiminuir, aoAumentar }) {
  return (
    <View style={styles.controleQuantidade}>
      <TouchableOpacity style={styles.botaoQuantidade} onPress={aoDiminuir} accessibilityLabel="Diminuir quantidade">
        <Text style={styles.botaoQuantidadeTexto}>−</Text>
      </TouchableOpacity>
      <Text style={styles.quantidade}>{quantidade}</Text>
      <TouchableOpacity style={styles.botaoQuantidade} onPress={aoAumentar} accessibilityLabel="Aumentar quantidade">
        <Text style={styles.botaoQuantidadeTexto}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
