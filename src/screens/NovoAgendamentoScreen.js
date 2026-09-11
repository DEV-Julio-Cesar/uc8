import { useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../styles/fluxoAgendamentoStyles'

const especialidades = ['Clínica Geral', 'Cardiologia', 'Dermatologia']
const medicosPorEspecialidade = {
  'Clínica Geral': ['Dra. Ana Souza', 'Dr. Paulo Reis'],
  Cardiologia: ['Dr. Carlos Lima', 'Dra. Marina Alves'],
  Dermatologia: ['Dra. Beatriz Costa', 'Dr. Lucas Rocha'],
}

function formatarData(data) {
  return data.toLocaleDateString('pt-BR')
}

function formatarHora(data) {
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function NovoAgendamentoScreen({ navigation }) {
  const [especialidade, setEspecialidade] = useState('')
  const [medico, setMedico] = useState('')
  const [data, setData] = useState(null)
  const [hora, setHora] = useState(null)

  function selecionarEspecialidade(valor) {
    setEspecialidade(valor)
    setMedico('')
  }

  function abrirData() {
    DateTimePickerAndroid.open({
      value: data || new Date(),
      mode: 'date',
      minimumDate: new Date(),
      onChange: (evento, valor) => {
        if (evento.type === 'set' && valor instanceof Date) setData(valor)
      },
    })
  }

  function abrirHora() {
    DateTimePickerAndroid.open({
      value: hora || new Date(),
      mode: 'time',
      is24Hour: true,
      onChange: (evento, valor) => {
        if (evento.type === 'set' && valor instanceof Date) setHora(valor)
      },
    })
  }

  function avancar() {
    if (!especialidade || !medico || !data || !hora) {
      Alert.alert('Atenção', 'Selecione especialidade, médico, data e hora.')
      return
    }

    const instanteConsulta = new Date(
      data.getFullYear(), data.getMonth(), data.getDate(), hora.getHours(), hora.getMinutes()
    )
    if (instanteConsulta <= new Date()) {
      Alert.alert('Data inválida', 'Selecione um horário futuro.')
      return
    }

    navigation.navigate('Confirmacao', {
      agendamento: {
        especialidade,
        medico,
        data: formatarData(data),
        hora: formatarHora(hora),
      },
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.titulo}>Novo Agendamento</Text>

      <Text style={styles.label}>Especialidade:</Text>
      <View style={styles.opcoes}>
        {especialidades.map((item) => (
          <TouchableOpacity key={item} style={[styles.opcao, especialidade === item && styles.opcaoSelecionada]} onPress={() => selecionarEspecialidade(item)}>
            <Text style={[styles.opcaoTexto, especialidade === item && styles.opcaoTextoSelecionado]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Médico:</Text>
      {!especialidade && <Text style={styles.ajuda}>Selecione primeiro uma especialidade.</Text>}
      <View style={styles.opcoes}>
        {(medicosPorEspecialidade[especialidade] || []).map((item) => (
          <TouchableOpacity key={item} style={[styles.opcao, medico === item && styles.opcaoSelecionada]} onPress={() => setMedico(item)}>
            <Text style={[styles.opcaoTexto, medico === item && styles.opcaoTextoSelecionado]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Data:</Text>
      <TouchableOpacity style={styles.seletor} onPress={abrirData}>
        <Text style={styles.seletorTexto}>{data ? formatarData(data) : 'Selecionar data'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Hora:</Text>
      <TouchableOpacity style={styles.seletor} onPress={abrirHora}>
        <Text style={styles.seletorTexto}>{hora ? formatarHora(hora) : 'Selecionar hora'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoPrimario} onPress={avancar}>
        <Text style={styles.botaoPrimarioTexto}>Avançar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoSecundarioTexto}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
