import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { styles } from './flatlistStyles'

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

export default function Agendamento() {

  // Estado da lista com feito e data para cada agendamento
  const [agendamentos, setAgendamentos] = useState(
    agendamentosIniciais.map((item) => ({
      ...item,
      feito: false,
      data: new Date(), // data inicial = hoje
    }))
  )

  // Controla qual item está com o picker aberto (null = nenhum)
  const [itemSelecionado, setItemSelecionado] = useState(null)

  // Alterna feito/não feito
  function alternarStatus(id) {
    setAgendamentos(
      agendamentos.map((item) => {
        if (item.id === id) {
          return { ...item, feito: !item.feito }
        }
        return item
      })
    )
  }

  // Abre o DateTimePicker para o item clicado
  function abrirPicker(id) {
    setItemSelecionado(id)
  }

  // Formata a data para exibição: DD/MM/AAAA
  function formatarData(data) {
    // Garante que o valor é um objeto Date válido antes de chamar os métodos
    const dataObj = data instanceof Date ? data : new Date(data)
    const dia  = String(dataObj.getDate()).padStart(2, '0')
    const mes  = String(dataObj.getMonth() + 1).padStart(2, '0')
    const ano  = dataObj.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  function renderizarItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.id}>#{item.id}</Text>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.tarefa}>{item.tarefa}</Text>

          {/* Botão que abre o DateTimePicker */}
          <TouchableOpacity
            style={styles.botaoData}
            onPress={() => abrirPicker(item.id)}
          >
            <Text style={styles.botaoDataTexto}>
              📅 {formatarData(item.data)}
            </Text>
          </TouchableOpacity>

          {/* Exibe o picker apenas para o item selecionado */}
          {itemSelecionado === item.id && (
            <DateTimePicker
              value={item.data}
              mode="date"
              display="default"
              onValueChange={(dataSelecionada) => {
                // dataSelecionada pode vir como timestamp (número) no Android
                // então convertemos garantindo que é um Date válido
                if (dataSelecionada !== undefined) {
                  const novaData = dataSelecionada instanceof Date
                    ? dataSelecionada
                    : new Date(dataSelecionada)

                  setAgendamentos(
                    agendamentos.map((ag) => {
                      if (ag.id === itemSelecionado) {
                        return { ...ag, data: novaData }
                      }
                      return ag
                    })
                  )
                }
                setItemSelecionado(null) // fecha o picker
              }}
              onDismiss={() => setItemSelecionado(null)} // fecha ao cancelar
            />
          )}
        </View>

        {/* Botão feito/não feito */}
        <TouchableOpacity
          style={[styles.botao, item.feito ? styles.botaoFeito : styles.botaoNaoFeito]}
          onPress={() => alternarStatus(item.id)}
        >
          <Text style={styles.botaoTexto}>
            {item.feito ? 'Feito' : 'Não feito'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agendamentos</Text>

      {/* Lista horizontal com nome e data */}
      <FlatList
        data={agendamentosIniciais}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View style={styles.cardHorizontal}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.tarefa}>{item.tarefa}</Text>
          </View>
        )}
        horizontal
      />

      {/* Lista principal com feito/não feito e datepicker */}
      <FlatList
        data={agendamentos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
      />
    </View>
  )
}

