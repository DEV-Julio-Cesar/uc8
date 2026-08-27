import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import InputField from '../components/InputField'
import { styles } from '../styles/loginStyles'

/**
 * Tela de Login
 * Permite o usuário fazer login com e-mail e senha
 * 
 * Props:
 * - onCadastro: função para navegar para tela de cadastro
 * - onLogin: função para navegar para tela de perfil após login
 */
export default function LoginScreen({ onCadastro, onLogin }) {
  // ─── Estados do formulário ───────────────────────────────────────────────
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // ─── Função de envio ─────────────────────────────────────────────────────
  function handleLogin() {
    // Validação simples
    if (!email || !senha) {
      Alert.alert(
        'Atenção',
        'Por favor, preencha e-mail e senha.'
      )
      return
    }

    // Alerta de confirmação e navega para o perfil
    Alert.alert(
      'Login realizado!',
      `Bem-vindo(a), ${email}!`,
      [
        {
          text: 'OK',
          onPress: () => {
            if (onLogin) {
              onLogin() // Navega para a tela de perfil
            }
          }
        }
      ]
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        {/* ── Cabeçalho ── */}
        <Text style={styles.titulo}>Login</Text>

        {/* ── E-mail ── */}
        <InputField
          label="E-mail"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* ── Senha ── */}
        <InputField
          label="Senha"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {/* ── Botão Entrar ── */}
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        {/* ── Link para Cadastro ── */}
        <View style={styles.cadastroContainer}>
          <Text style={styles.cadastroTexto}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={onCadastro}>
            <Text style={styles.cadastroLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
