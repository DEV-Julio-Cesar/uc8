import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'

export default function LoginScreen({ onCadastro, onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha e-mail e senha.')
      return
    }

    Alert.alert(
      'Login realizado!',
      `Bem-vindo(a), ${email}!`,
      [{ text: 'OK', onPress: () => onLogin() }]
    )
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Login</Text>

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.cadastroContainer}>
        <Text style={styles.cadastroTexto}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={onCadastro}>
          <Text style={styles.cadastroLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
    marginTop: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  botao: {
    backgroundColor: '#1a237e',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  cadastroTexto: {
    color: '#555',
    fontSize: 14,
  },
  cadastroLink: {
    color: '#1a237e',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
