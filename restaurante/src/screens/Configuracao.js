import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/styles'

export default function Configuracao({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Configurações</Text>
        <Text style={styles.subtitulo}>Preferências do aplicativo</Text>

        <TouchableOpacity style={styles.botaoPrimario} onPress={() => navigation.navigate('Info')}>
          <Text style={styles.botaoPrimarioTexto}>Informações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoSecundarioTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
