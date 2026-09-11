import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../styles/agendamentoStyles'
import { useClinica } from '../context/ClinicaContext'

export default function AgendamentoScreen({ navigation }) {
  const { agendamentos } = useClinica()

  function renderizarItem({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.id}>Consulta #{item.id}</Text>
        <Text style={styles.nome}>{item.especialidade}</Text>
        <Text style={styles.tarefa}>{item.medico}</Text>
        <Text style={styles.data}>📅 {item.data} às {item.hora}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agendamentos</Text>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        ListEmptyComponent={<Text style={styles.listaVazia}>Nenhuma consulta agendada.</Text>}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('NovoAgendamento')}
      >
        <Text style={styles.botaoAdicionarTexto}>+ Novo Agendamento</Text>
      </TouchableOpacity>
    </View>
  )
}
