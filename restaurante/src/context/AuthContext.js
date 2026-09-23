import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CHAVE_ADMIN = '@restaurante:administrador'
const ADMIN_PADRAO = { usuario: 'admin', senha: 'admin' }
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [carregandoAuth, setCarregandoAuth] = useState(true)
  const [autenticado, setAutenticado] = useState(false)
  const [credenciais, setCredenciais] = useState(ADMIN_PADRAO)

  useEffect(() => {
    async function inicializarAdmin() {
      try {
        const valorSalvo = await AsyncStorage.getItem(CHAVE_ADMIN)
        if (valorSalvo) {
          const dados = JSON.parse(valorSalvo)
          if (dados?.usuario === 'admin' && typeof dados?.senha === 'string' && dados.senha) {
            setCredenciais(dados)
            return
          }
        }
        await AsyncStorage.setItem(CHAVE_ADMIN, JSON.stringify(ADMIN_PADRAO))
      } catch {
        setCredenciais(ADMIN_PADRAO)
      } finally {
        setCarregandoAuth(false)
      }
    }

    inicializarAdmin()
  }, [])

  function entrar(usuario, senha) {
    const valido = usuario.trim().toLowerCase() === credenciais.usuario && senha === credenciais.senha
    if (valido) setAutenticado(true)
    return valido
  }

  function sair() {
    setAutenticado(false)
  }

  async function trocarSenha(senhaAtual, novaSenha) {
    if (senhaAtual !== credenciais.senha) {
      return { sucesso: false, mensagem: 'A senha atual está incorreta.' }
    }
    if (novaSenha.length < 4) {
      return { sucesso: false, mensagem: 'A nova senha deve ter pelo menos 4 caracteres.' }
    }

    const novasCredenciais = { usuario: 'admin', senha: novaSenha }
    await AsyncStorage.setItem(CHAVE_ADMIN, JSON.stringify(novasCredenciais))
    setCredenciais(novasCredenciais)
    return { sucesso: true }
  }

  return (
    <AuthContext.Provider value={{ carregandoAuth, autenticado, entrar, sair, trocarSenha }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  return contexto
}
