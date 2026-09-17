import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ConectarBD } from '../../database/database'
import { inserirUsuario } from '../../reporitory/usuarioRepository'
import { styles } from '../styles/styles'

export default function CadastrarScreen() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function cadastrar() {
    const nomeLimpo = nome.trim()
    const emailLimpo = email.trim().toLowerCase()

    if (!nomeLimpo || !emailLimpo || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha.')
      return
    }
    if (!emailLimpo.includes('@')) {
      Alert.alert('E-mail inválido', 'Informe um endereço de e-mail válido.')
      return
    }

    try {
      setSalvando(true)
      const db = await ConectarBD()
      await inserirUsuario(db, { nome: nomeLimpo, email: emailLimpo, senha })
      setNome('')
      setEmail('')
      setSenha('')
      Alert.alert('Cadastro realizado', 'Usuário cadastrado com sucesso!')
    } catch (erro) {
      console.error('Erro ao cadastrar usuário:', erro)
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.formulario} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Criar conta</Text>
        <Text style={styles.subtitulo}>Preencha seus dados para se cadastrar</Text>

        <View style={styles.campoGrupo}>
          <Text style={styles.campoRotulo}>Nome</Text>
          <TextInput style={styles.campo} value={nome} onChangeText={setNome} placeholder="Seu nome" autoCapitalize="words" />
        </View>
        <View style={styles.campoGrupo}>
          <Text style={styles.campoRotulo}>E-mail</Text>
          <TextInput style={styles.campo} value={email} onChangeText={setEmail} placeholder="seu@email.com" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
        </View>
        <View style={styles.campoGrupo}>
          <Text style={styles.campoRotulo}>Senha</Text>
          <TextInput style={styles.campo} value={senha} onChangeText={setSenha} placeholder="Digite sua senha" secureTextEntry />
        </View>
        <TouchableOpacity style={[styles.botaoPrimario, salvando && styles.botaoDesabilitado]} onPress={cadastrar} disabled={salvando}>
          <Text style={styles.botaoPrimarioTexto}>{salvando ? 'Cadastrando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
