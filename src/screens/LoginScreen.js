import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { styles } from '../styles/loginStyles'

export default function LoginScreen({ navigation }) {
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
      [{ text: 'OK', onPress: () => navigation.navigate('App') }]
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
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.cadastroContainer}>
        <Text style={styles.cadastroTexto}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.cadastroLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
