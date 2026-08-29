import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

// ─── Importação das telas ─────────────────────────────────────────────────
import LoginScreen from './src/screens/LoginScreen'
import CadastroScreen from './src/screens/CadastroScreen'
import TabNavigator from './src/components/TabNavigator'

/**
 * App principal
 * Sistema de navegação simples entre telas usando useState
 */
export default function App() {
  // ─── Estado de navegação ─────────────────────────────────────────────────
  // Controla qual tela está visível: 'login', 'cadastro' ou 'perfil'
  const [telaAtiva, setTelaAtiva] = useState('login')

  // ─── Funções de navegação ────────────────────────────────────────────────
  function irParaLogin() {
    setTelaAtiva('login')
  }

  function irParaCadastro() {
    setTelaAtiva('cadastro')
  }

  function irParaApp() {
    setTelaAtiva('app')
  }

  // ─── Renderização condicional ────────────────────────────────────────────
  function renderizarTela() {
    switch (telaAtiva) {
      case 'login':
        return <LoginScreen onCadastro={irParaCadastro} onLogin={irParaApp} />
      case 'cadastro':
        return <CadastroScreen onVoltar={irParaLogin} onCadastroSucesso={irParaApp} />
      case 'app':
        return <TabNavigator onLogout={irParaLogin} />
      default:
        return <LoginScreen onCadastro={irParaCadastro} onLogin={irParaApp} />
    }
  }

  return (
    <View style={styles.container}>
      {renderizarTela()}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
})
