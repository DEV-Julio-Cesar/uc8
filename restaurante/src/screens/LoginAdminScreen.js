import { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { styles } from '../styles/styles'

export default function LoginAdminScreen() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const { carregandoAuth, entrar } = useAuth()

  function fazerLogin() {
    if (!entrar(usuario, senha)) {
      setErro('Usuário ou senha inválidos.')
      return
    }
    setErro('')
  }

  if (carregandoAuth) {
    return <View style={styles.centralizado}><ActivityIndicator size="large" color="#b23a20" /></View>
  }

  return (
    <KeyboardAvoidingView style={styles.centralizado} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.loginCard}>
        <Text style={styles.titulo}>Sabor da Casa</Text>
        <Text style={styles.subtitulo}>Acesso administrativo</Text>
        {!!erro && <Text style={styles.erroLogin}>{erro}</Text>}
        <View style={styles.campoGrupo}>
          <Text style={styles.campoRotulo}>Usuário</Text>
          <TextInput style={styles.campo} value={usuario} onChangeText={setUsuario} autoCapitalize="none" autoCorrect={false} placeholder="Digite o usuário" />
        </View>
        <View style={styles.campoGrupo}>
          <Text style={styles.campoRotulo}>Senha</Text>
          <TextInput style={styles.campo} value={senha} onChangeText={setSenha} secureTextEntry placeholder="Digite a senha" onSubmitEditing={fazerLogin} />
        </View>
        <TouchableOpacity style={[styles.botaoPrimario, styles.botaoComMargem]} onPress={fazerLogin}>
          <Text style={styles.botaoPrimarioTexto}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.dicaLogin}>Primeiro acesso: admin / admin</Text>
      </View>
    </KeyboardAvoidingView>
  )
}
