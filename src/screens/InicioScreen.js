import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../styles/clinicaStyles'
import { useClinica } from '../context/ClinicaContext'

export default function InicioScreen({ navigation }) {
  const { nomePaciente } = useClinica()

  function handleSair() {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
      },
    ])
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.titulo}>Clínica Saúde Integral</Text>
      <Text style={styles.saudacao}>Bem-vindo(a), {nomePaciente}!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Cuidado completo para você</Text>
        <Text style={styles.cardTexto}>
          Atendimento humanizado, profissionais qualificados e consultas com horário marcado.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Horário de atendimento</Text>
        <Text style={styles.cardTexto}>Segunda a sexta: 08h às 18h</Text>
        <Text style={styles.cardTexto}>Sábado: 08h às 12h</Text>
      </View>

      <TouchableOpacity style={styles.botaoPrimario} onPress={() => navigation.navigate('Agendamentos')}>
        <Text style={styles.botaoPrimarioTexto}>Ver meus agendamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSair} onPress={handleSair}>
        <Text style={styles.botaoSairTexto}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
