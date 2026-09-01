import React, { useState } from 'react'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Linking,
} from 'react-native'
import { styles } from './agendamentoStyles'

// ─── Dados iniciais ───────────────────────────────────────────────────────────
const agendamentosIniciais = [
  { id: '1', nome: 'Julio',    tarefa: 'Reunião com o cliente'      },
  { id: '2', nome: 'Maria',    tarefa: 'Consulta médica'            },
  { id: '3', nome: 'Carlos',   tarefa: 'Entrega do projeto'         },
  { id: '4', nome: 'Ana',      tarefa: 'Aula de inglês'             },
  { id: '5', nome: 'Pedro',    tarefa: 'Revisão do carro'           },
  { id: '6', nome: 'Fernanda', tarefa: 'Apresentação na faculdade'  },
  { id: '7', nome: 'Lucas',    tarefa: 'Pagamento de conta'         },
  { id: '8', nome: 'Beatriz',  tarefa: 'Treinamento na academia'    },
]

// ─── Componente ───────────────────────────────────────────────────────────────
export default function AgendamentoScreen() {
  const [agendamentos, setAgendamentos] = useState(
    agendamentosIniciais.map((item) => ({ ...item, data: new Date() }))
  )
  const [modalVisivel, setModalVisivel] = useState(false)
  const [novoNome, setNovoNome]         = useState('')
  const [novaTarefa, setNovaTarefa]     = useState('')

  // ─── Funções ──────────────────────────────────────────────────────────────

  function abrirLink() {
    Linking.openURL('https://fast.com/pt/')
  }

  function abrirPicker(id) {
    const ag = agendamentos.find((ag) => ag.id === id)
    const dataAtual = ag?.data instanceof Date ? ag.data : new Date()

    DateTimePickerAndroid.open({
      value: dataAtual,
      mode: 'date',
      minimumDate: new Date(),
      onValueChange: (_event, dataSelecionada) => {
        if (dataSelecionada instanceof Date) {
          setAgendamentos((lista) =>
            lista.map((item) =>
              item.id === id ? { ...item, data: dataSelecionada } : item
            )
          )
        }
      },
    })
  }

  function adicionarAgendamento() {
    if (!novoNome || !novaTarefa) {
      Alert.alert('Atenção', 'Preencha o nome e a tarefa.')
      return
    }
    const novoItem = {
      id: String(agendamentos.length + 1),
      nome: novoNome,
      tarefa: novaTarefa,
      data: new Date(),
    }
    setAgendamentos([...agendamentos, novoItem])
    setNovoNome('')
    setNovaTarefa('')
    setModalVisivel(false)
  }

  function formatarData(data) {
    if (!data || !(data instanceof Date) || isNaN(data.getTime())) {
      data = new Date()
    }
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  function renderizarItem({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.tarefa}>{item.tarefa}</Text>
        <TouchableOpacity style={styles.botaoData} onPress={() => abrirPicker(item.id)}>
          <Text style={styles.data}>📅 {formatarData(item.data)}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Agendamentos</Text>

      <TouchableOpacity onPress={abrirLink}>
        <Text style={styles.link}>🔗 Testar velocidade da internet</Text>
      </TouchableOpacity>

      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisivel(true)}>
        <Text style={styles.botaoAdicionarTexto}>+ Novo Agendamento</Text>
      </TouchableOpacity>

      <Modal visible={modalVisivel} transparent animationType="slide">
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitulo}>Novo Agendamento</Text>

            <Text style={styles.modalLabel}>Nome:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite o nome"
              value={novoNome}
              onChangeText={setNovoNome}
            />

            <Text style={styles.modalLabel}>Tarefa:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite a tarefa"
              value={novaTarefa}
              onChangeText={setNovaTarefa}
            />

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={[styles.modalBotao, styles.modalCancelar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBotao, styles.modalSalvar]}
                onPress={adicionarAgendamento}
              >
                <Text style={styles.modalBotaoTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  )
}
