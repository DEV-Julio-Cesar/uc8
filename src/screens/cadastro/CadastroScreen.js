import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { styles } from './cadastroStyles'

export default function CadastroScreen({ navigation }) {
  const [nome, setNome]                     = useState('')
  const [telefone, setTelefone]             = useState('')
  const [email, setEmail]                   = useState('')
  const [endereco, setEndereco]             = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [cpf, setCpf]                       = useState('')
  const [sexo, setSexo]                     = useState('')
  const [senha, setSenha]                   = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  function handleEnviar() {
    if (!nome || !telefone || !email || !endereco || !dataNascimento || !cpf || !sexo || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.')
      return
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem.')
      return
    }

    Alert.alert(
      'Cadastro realizado!',
      `Olá, ${nome}! Seus dados foram enviados com sucesso.`,
      [{ text: 'OK', onPress: () => navigation.navigate('App') }]
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>

      <Text style={styles.titulo}>Cadastro</Text>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoVoltarTexto}>← Voltar ao Login</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput style={styles.input} placeholder="(99) 99999-9999" keyboardType="phone-pad" value={telefone} onChangeText={setTelefone} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} placeholder="seuemail@exemplo.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Endereço:</Text>
      <TextInput style={styles.input} placeholder="Rua, número, bairro" value={endereco} onChangeText={setEndereco} />

      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput style={styles.input} placeholder="DD/MM/AAAA" keyboardType="numeric" value={dataNascimento} onChangeText={setDataNascimento} />

      <Text style={styles.label}>CPF:</Text>
      <TextInput style={styles.input} placeholder="000.000.000-00" keyboardType="numeric" value={cpf} onChangeText={setCpf} />

      <Text style={styles.label}>Sexo:</Text>
      <View style={styles.sexoContainer}>
        {['Masculino', 'Feminino', 'Outro'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.sexoBotao, sexo === opcao && styles.sexoBotaoSelecionado]}
            onPress={() => setSexo(opcao)}
          >
            <Text style={[styles.sexoTexto, sexo === opcao && styles.sexoTextoSelecionado]}>
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Senha:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry value={senha} onChangeText={setSenha} />

      <Text style={styles.label}>Confirmar Senha:</Text>
      <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />

      <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviar}>
        <Text style={styles.botaoTexto}>Enviar Cadastro</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}
