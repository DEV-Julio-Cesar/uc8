import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './tabNavigatorStyles'

import PerfilScreen from '../perfil/PerfilScreen'
import Agendamento from '../../2Flatlist/flatlist'

export default function TabNavigator({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('perfil')

  const abas = [
    { id: 'perfil',      icone: '👤', label: 'Perfil'        },
    { id: 'agendamento', icone: '📅', label: 'Agendamentos'  },
  ]

  return (
    <View style={styles.container}>

      <View style={styles.conteudo}>
        {abaAtiva === 'perfil'      && <PerfilScreen navigation={navigation} />}
        {abaAtiva === 'agendamento' && <Agendamento />}
      </View>

      <View style={styles.tabBar}>
        {abas.map((aba) => (
          <TouchableOpacity
            key={aba.id}
            style={styles.tab}
            onPress={() => setAbaAtiva(aba.id)}
          >
            <Text style={styles.tabIcone}>{aba.icone}</Text>
            <Text style={[styles.tabTexto, abaAtiva === aba.id && styles.tabTextoAtivo]}>
              {aba.label}
            </Text>
            {abaAtiva === aba.id && <View style={styles.indicador} />}
          </TouchableOpacity>
        ))}
      </View>

    </View>
  )
}
