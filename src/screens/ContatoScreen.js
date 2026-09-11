import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import { styles } from '../styles/clinicaStyles'

const CONTATOS = {
  whatsapp: 'https://wa.me/5584999999999?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.',
  email: 'mailto:contato@clinicasaudeintegral.com.br?subject=Informa%C3%A7%C3%B5es%20sobre%20atendimento',
  telefone: 'tel:+5584999999999',
}

export default function ContatoScreen() {
  async function abrirContato(url) {
    try {
      const podeAbrir = await Linking.canOpenURL(url)
      if (!podeAbrir) {
        Alert.alert('Indisponível', 'Nenhum aplicativo compatível foi encontrado.')
        return
      }
      await Linking.openURL(url)
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir este contato.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contato</Text>
      <Text style={styles.descricao}>Fale com a Clínica Saúde Integral:</Text>

      <TouchableOpacity style={styles.contatoItem} onPress={() => abrirContato(CONTATOS.whatsapp)}>
        <Text style={styles.contatoIcone}>💬</Text>
        <View><Text style={styles.contatoTitulo}>WhatsApp</Text><Text style={styles.contatoTexto}>(84) 99999-9999</Text></View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contatoItem} onPress={() => abrirContato(CONTATOS.email)}>
        <Text style={styles.contatoIcone}>✉️</Text>
        <View><Text style={styles.contatoTitulo}>E-mail</Text><Text style={styles.contatoTexto}>contato@clinicasaudeintegral.com.br</Text></View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contatoItem} onPress={() => abrirContato(CONTATOS.telefone)}>
        <Text style={styles.contatoIcone}>☎️</Text>
        <View><Text style={styles.contatoTitulo}>Telefone</Text><Text style={styles.contatoTexto}>(84) 99999-9999</Text></View>
      </TouchableOpacity>
    </View>
  )
}
