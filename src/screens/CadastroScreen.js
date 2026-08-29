import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native'

export default function CadastroScreen({ onVoltar, onCadastroSucesso }) {
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
      [{ text: 'OK', onPress: () => onCadastroSucesso() }]
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formulario}>

        <Text style={styles.titulo}>Cadastro</Text>

        <TouchableOpacity onPress={onVoltar}>
          <Text style={styles.voltar}>← Voltar ao Login</Text>
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
        <TextInput style={styles.input} placeholder="Masculino, Feminino ou Outro" value={sexo} onChangeText={setSexo} />

        <Text style={styles.label}>Senha:</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry={true} value={senha} onChangeText={setSenha} />

        <Text style={styles.label}>Confirmar Senha:</Text>
        <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry={true} value={confirmarSenha} onChangeText={setConfirmarSenha} />

        <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
          <Text style={styles.botaoTexto}>Enviar Cadastro</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formulario: {
    padding: 24,
    paddingTop: 50,
    paddingBottom: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 16,
  },
  voltar: {
    fontSize: 14,
    color: '#1a237e',
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
    marginTop: 12,
    marginBottom: 5,
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
})
