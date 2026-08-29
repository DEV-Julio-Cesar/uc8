import { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { styles } from '../styles/perfilStyles'

/**
 * Tela de Perfil de Usuário
 * Exibe informações do usuário estilo rede social
 * 
 * Props:
 * - onLogout: função para fazer logout e voltar ao login
 */
export default function PerfilScreen({ onLogout, onAgendamento }) {
  // ─── Estado do nome — pode ser alterado dinamicamente ────────────────────
  const [nome, setNome] = useState('Julio')

  // ─── Estado da busca ─────────────────────────────────────────────────────
  const [textoBusca, setTextoBusca] = useState('')

  // ─── Dados estáticos do usuário ──────────────────────────────────────────
  const usuario = {
    nome: nome,          // usa o estado em vez de valor fixo
    username: '@julio',
    fotoPerfil: 'https://i.pravatar.cc/300?img=47', // foto aleatória
    bio: 'Desenvolvedora mobile | React Native | Amante de tecnologia 💻',
    email: 'maria.silva@email.com',
    telefone: '(11) 98765-4321',
    localizacao: 'São Paulo, SP',
    dataCadastro: '15/01/2024',
    posts: 42,
    seguidores: 1250,
    seguindo: 380,
  }

  // ─── Função: Ver mais informações ────────────────────────────────────────
  function handleVerMais() {
    Alert.alert(
      'Informações do Perfil',
      `Nome: ${usuario.nome}\n` +
      `Usuário: ${usuario.username}\n` +
      `E-mail: ${usuario.email}\n` +
      `Telefone: ${usuario.telefone}\n` +
      `Localização: ${usuario.localizacao}\n` +
      `Membro desde: ${usuario.dataCadastro}\n\n` +
      `Bio: ${usuario.bio}`,
      [{ text: 'Fechar' }]
    )
  }

  // ─── Função: Realizar busca ──────────────────────────────────────────────
  function handleBusca() {
    if (!textoBusca.trim()) {
      Alert.alert('Busca', 'Digite algo para buscar.')
      return
    }

    Alert.alert(
      'Resultado da Busca',
      `Buscando por: "${textoBusca}"`,
      [{ text: 'OK' }]
    )
  }

  // ─── Lista de ações rápidas ──────────────────────────────────────────────
  const acoes = [
    { id: 1, icone: '📝', titulo: 'Editar Perfil', descricao: 'Atualize suas informações' },
    { id: 2, icone: '⚙️', titulo: 'Configurações', descricao: 'Preferências e privacidade' },
    { id: 3, icone: '📊', titulo: 'Estatísticas', descricao: 'Veja seu desempenho' },
    { id: 4, icone: '❤️', titulo: 'Curtidas', descricao: 'Posts que você curtiu' },
    { id: 5, icone: '🔖', titulo: 'Salvos', descricao: 'Conteúdos salvos' },
    { id: 6, icone: '🚪', titulo: 'Sair', descricao: 'Fazer logout da conta', isLogout: true },
  ]

  function handleAcaoPress(acao) {
    if (acao.isLogout) {
      Alert.alert(
        'Sair',
        'Tem certeza que deseja sair da sua conta?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: () => {
              if (onLogout) {
                onLogout()
              }
            }
          }
        ]
      )
      return
    }

    Alert.alert(acao.titulo, `Você clicou em: ${acao.descricao}`)
  }

  return (
    <View style={styles.container}>
    <ScrollView>
      
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Meu Perfil</Text>
      </View>

      {/* ── Foto de Perfil + Nome ── */}
      <View style={styles.perfilContainer}>
        <Image
          source={{ uri: usuario.fotoPerfil }}
          style={styles.fotoPerfil}
        />
        <Text style={styles.nome}>{usuario.nome}</Text>
        <Text style={styles.username}>{usuario.username}</Text>

        {/* Botão Ver Mais */}
        <TouchableOpacity style={styles.botaoVerMais} onPress={handleVerMais}>
          <Text style={styles.botaoVerMaisTexto}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      {/* ── Estatísticas (Posts, Seguidores, Seguindo) ── */}
      <View style={styles.estatisticasContainer}>
        <View style={styles.estatisticaItem}>
          <Text style={styles.estatisticaNumero}>{usuario.posts}</Text>
          <Text style={styles.estatisticaLabel}>Posts</Text>
        </View>
        <View style={styles.estatisticaItem}>
          <Text style={styles.estatisticaNumero}>{usuario.seguidores}</Text>
          <Text style={styles.estatisticaLabel}>Seguidores</Text>
        </View>
        <View style={styles.estatisticaItem}>
          <Text style={styles.estatisticaNumero}>{usuario.seguindo}</Text>
          <Text style={styles.estatisticaLabel}>Seguindo</Text>
        </View>
      </View>

      {/* ── Barra de Pesquisa ── */}
      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Buscar posts, pessoas, hashtags..."
          placeholderTextColor="#aaa"
          value={textoBusca}
          onChangeText={setTextoBusca}
          onSubmitEditing={handleBusca}
          returnKeyType="search"
        />
      </View>

      {/* ── Lista de Ações Rápidas ── */}
      <View style={styles.acoesContainer}>
        {acoes.map((acao) => (
          <TouchableOpacity
            key={acao.id}
            style={styles.acaoItem}
            onPress={() => handleAcaoPress(acao)}
          >
            <View style={styles.acaoIcone}>
              <Text style={styles.acaoIconeTexto}>{acao.icone}</Text>
            </View>
            <View style={styles.acaoConteudo}>
              <Text style={styles.acaoTitulo}>{acao.titulo}</Text>
              <Text style={styles.acaoDescricao}>{acao.descricao}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Espaçamento final */}
      <View style={{ height: 40 }} />

    </ScrollView>
    </View>
  )
}
