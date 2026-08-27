import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import InputField from '../components/InputField'
import { styles } from '../styles/cadastroStyles'

/**
 * Tela de Cadastro
 * Coleta dados do usuário e exibe alerta de confirmação
 * 
 * Props:
 * - onVoltar: função para voltar à tela de login
 * - onCadastroSucesso: função para navegar ao perfil após cadastro
 */
export default function CadastroScreen({ onVoltar, onCadastroSucesso }) {
  // ─── Estados para cada campo do formulário ───────────────────────────────
  const [nome, setNome]               = useState('')
  const [telefone, setTelefone]       = useState('')
  const [email, setEmail]             = useState('')
  const [endereco, setEndereco]       = useState('')
  const [dataNascimento, setDataNasc] = useState('')
  const [cpf, setCpf]                 = useState('')
  const [sexo, setSexo]               = useState('') // 'M', 'F' ou 'O'
  const [senha, setSenha]             = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  // ─── Validação e envio ───────────────────────────────────────────────────
  function handleEnviar() {
    // Verifica se todos os campos estão preenchidos
    if (!nome || !telefone || !email || !endereco || !dataNascimento || !cpf || !sexo || !senha || !confirmarSenha) {
      Alert.alert(
        'Atenção',
        'Por favor, preencha todos os campos antes de enviar.'
      )
      return
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      Alert.alert(
        'Senhas não coincidem',
        'As senhas digitadas não são iguais. Por favor, verifique.'
      )
      return
    }

    // Exibe alerta de sucesso
    Alert.alert(
      'Cadastro realizado!',
      `Olá, ${nome}! Seus dados foram enviados com sucesso.`,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('Cadastro confirmado')
            // Navega para o perfil após cadastro
            if (onCadastroSucesso) {
              onCadastroSucesso()
            }
          }
        }
      ]
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>

      <Text style={styles.titulo}>Cadastro</Text>

      {/* ── Botão Voltar ── */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.botaoVoltarTexto}>← Voltar ao Login</Text>
      </TouchableOpacity>

      {/* ── Campos de entrada usando o componente reutilizável ── */}
      <InputField
        label="Nome completo"
        placeholder="Digite seu nome completo"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <InputField
        label="Telefone"
        placeholder="(99) 99999-9999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <InputField
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <InputField
        label="Endereço"
        placeholder="Rua, número, bairro, cidade"
        value={endereco}
        onChangeText={setEndereco}
      />

      <InputField
        label="Data de nascimento"
        placeholder="DD/MM/AAAA"
        value={dataNascimento}
        onChangeText={setDataNasc}
        keyboardType="numeric"
        maxLength={10}
      />

      <InputField
        label="CPF"
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        maxLength={14}
      />
        <InputField
  label="Senha"
  placeholder="Digite sua senha"
  value={senha}
  onChangeText={setSenha}
  secureTextEntry
/>
<InputField
  label="Confirmar Senha"
  placeholder="Confirme sua senha"
  value={confirmarSenha}          
  onChangeText={setConfirmarSenha} 
  secureTextEntry
/>


      

      {/* ── Seleção de Sexo ── */}
      <Text style={styles.label}>Sexo</Text>
      <View style={styles.sexoContainer}>
        {[
          { value: 'M', label: 'Masculino' },
          { value: 'F', label: 'Feminino' },
          { value: 'O', label: 'Outro' },
        ].map((opcao) => (
          <TouchableOpacity
            key={opcao.value}
            style={[
              styles.sexoBotao,
              sexo === opcao.value && styles.sexoBotaoSelecionado,
            ]}
            onPress={() => setSexo(opcao.value)}
          >
            <Text
              style={[
                styles.sexoTexto,
                sexo === opcao.value && styles.sexoTextoSelecionado,
              ]}
            >
              {opcao.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Botão de Envio ── */}
      <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviar}>
        <Text style={styles.botaoTexto}>Enviar Cadastro</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}
