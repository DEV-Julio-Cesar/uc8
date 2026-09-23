import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { styles } from '../styles/styles'

export default function AdminScreen({ navigation }) {
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [salvando, setSalvando] = useState(false)
  const { trocarSenha, sair } = useAuth()

  async function salvarSenha() {
    if (novaSenha !== confirmacao) {
      Alert.alert('Senhas diferentes', 'A confirmação deve ser igual à nova senha.')
      return
    }
    try {
      setSalvando(true)
      const resultado = await trocarSenha(senhaAtual, novaSenha)
      if (!resultado.sucesso) {
        Alert.alert('Não foi possível trocar', resultado.mensagem)
        return
      }
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmacao('')
      Alert.alert('Senha alterada', 'A nova senha foi salva neste dispositivo.')
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a nova senha.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Administrador</Text>
        <Text style={styles.subtitulo}>Usuário: admin</Text>
        {[
          ['Senha atual', senhaAtual, setSenhaAtual],
          ['Nova senha', novaSenha, setNovaSenha],
          ['Confirmar nova senha', confirmacao, setConfirmacao],
        ].map(([rotulo, valor, alterar]) => (
          <View style={styles.campoGrupo} key={rotulo}>
            <Text style={styles.campoRotulo}>{rotulo}</Text>
            <TextInput style={styles.campo} value={valor} onChangeText={alterar} secureTextEntry placeholder={rotulo} />
          </View>
        ))}
        <TouchableOpacity style={[styles.botaoPrimario, styles.botaoComMargem, salvando && styles.botaoDesabilitado]} onPress={salvarSenha} disabled={salvando}>
          <Text style={styles.botaoPrimarioTexto}>{salvando ? 'Salvando...' : 'Trocar senha'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoSecundario} onPress={sair}>
          <Text style={styles.botaoSecundarioTexto}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Configuracao')}>
          <Text style={styles.botaoSecundarioTexto}>Configurações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
