import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import PerfilScreen from '../screens/PerfilScreen'
import Agendamento from '../2Flatlist/flatlist'

/**
 * Componente de abas inferior
 * Controla qual tela está visível: 'perfil' ou 'agendamento'
 * 
 * Props:
 * - onLogout: função para voltar ao login
 */
export default function TabNavigator({ onLogout }) {
  // useState controla qual aba está selecionada
  const [abaAtiva, setAbaAtiva] = useState('perfil')

  return (
    <View style={styles.container}>

      {/* ── Conteúdo da aba ativa ── */}
      <View style={styles.conteudo}>
        {abaAtiva === 'perfil' && (
          <PerfilScreen onLogout={onLogout} />
        )}
        {abaAtiva === 'agendamento' && (
          <Agendamento />
        )}
      </View>

      {/* ── Barra de abas na parte inferior ── */}
      <View style={styles.tabBar}>

        {/* Aba Perfil */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setAbaAtiva('perfil')}
        >
          <Text style={styles.tabIcone}>👤</Text>
          <Text style={[
            styles.tabTexto,
            abaAtiva === 'perfil' && styles.tabTextoAtivo
          ]}>
            Perfil
          </Text>
          {/* Linha indicadora embaixo da aba ativa */}
          {abaAtiva === 'perfil' && <View style={styles.indicador} />}
        </TouchableOpacity>

        {/* Aba Agendamentos */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setAbaAtiva('agendamento')}
        >
          <Text style={styles.tabIcone}>📅</Text>
          <Text style={[
            styles.tabTexto,
            abaAtiva === 'agendamento' && styles.tabTextoAtivo
          ]}>
            Agendamentos
          </Text>
          {/* Linha indicadora embaixo da aba ativa */}
          {abaAtiva === 'agendamento' && <View style={styles.indicador} />}
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  // Área onde o conteúdo da tela é exibido
  conteudo: {
    flex: 1,
  },

  // Barra de abas fixada na parte inferior
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Cada aba ocupa metade da barra
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcone: {
    fontSize: 20,
  },

  tabTexto: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },

  // Texto da aba quando está ativa
  tabTextoAtivo: {
    color: '#1a237e',
    fontWeight: 'bold',
  },

  // Linha azul embaixo da aba ativa
  indicador: {
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: 3,
    backgroundColor: '#1a237e',
    borderRadius: 2,
  },
})
