import { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../styles/fluxoAgendamentoStyles'
import { useClinica } from '../context/ClinicaContext'

export default function ConfirmacaoScreen({ navigation, route }) {
  const { adicionarAgendamento } = useClinica()
  const agendamento = route.params?.agendamento
  const [confirmando, setConfirmando] = useState(false)

  function confirmar() {
    if (confirmando) return

    if (!agendamento) {
      Alert.alert('Erro', 'Os dados do agendamento não foram encontrados.')
      navigation.goBack()
      return
    }

    setConfirmando(true)
    adicionarAgendamento(agendamento)
    Alert.alert('Agendamento confirmado!', 'Sua consulta foi adicionada com sucesso.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('App', { screen: 'Agendamentos' }),
      },
    ])
  }

  if (!agendamento) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Dados indisponíveis</Text>
        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoSecundarioTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Confirme sua consulta</Text>
      <View style={styles.resumo}>
        <Text style={styles.resumoLabel}>Especialidade</Text>
        <Text style={styles.resumoValor}>{agendamento.especialidade}</Text>
        <Text style={styles.resumoLabel}>Médico</Text>
        <Text style={styles.resumoValor}>{agendamento.medico}</Text>
        <Text style={styles.resumoLabel}>Data</Text>
        <Text style={styles.resumoValor}>{agendamento.data}</Text>
        <Text style={styles.resumoLabel}>Hora</Text>
        <Text style={styles.resumoValor}>{agendamento.hora}</Text>
      </View>

      <TouchableOpacity style={styles.botaoPrimario} onPress={confirmar} disabled={confirmando}>
        <Text style={styles.botaoPrimarioTexto}>Confirmar Agendamento</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoSecundarioTexto}>Voltar e corrigir</Text>
      </TouchableOpacity>
    </View>
  )
}
