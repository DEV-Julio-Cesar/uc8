import { Alert, ScrollView, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { styles } from '../styles/styles'
import * as Device from 'expo-device'

export default function Info({ navigation }) {
  function vibrarDispositivo() {
    if (!Device.isDevice) {
      const mensagem = 'A vibração não está disponível em dispositivo virtual.'
      console.log(mensagem)
      Alert.alert('Dispositivo virtual', mensagem)
      return
    }

    Vibration.vibrate(500)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formulario}>
        <Text style={styles.titulo}>Informações</Text>
        <Text style={styles.subtitulo}>Restaurante Sabor da Casa</Text>

        <View style={styles.infoCard}>
          <Text style={styles.itemNome}>Sobre o aplicativo</Text>
          <Text style={styles.itemDescricao}>
            Aplicativo mobile para gerenciamento de cardápio, carrinho e pedidos.
          </Text>
          <Text style={styles.itemDescricao}>
            Os pratos são armazenados localmente com SQLite e as credenciais administrativas com AsyncStorage.
          </Text>
        </View>

        <Text style={styles.infoDispositivo}>
          Nome do dispositivo: {Device.deviceName}{'\n'}
          SO: {Device.osName}{'\n'}
          Marca: {Device.manufacturer}{'\n'}
          Modelo: {Device.modelName}{'\n'}
          Versão: {Device.osVersion}{'\n'}
          Dispositivo virtual: {Device.isDevice ? 'Não' : 'Sim'}
        </Text>

        <TouchableOpacity style={styles.botaoPrimario} onPress={vibrarDispositivo}>
          <Text style={styles.botaoPrimarioTexto}>Vibrar dispositivo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoSecundarioTexto}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
