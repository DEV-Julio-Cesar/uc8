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
import { styles } from './perfilStyles'

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('Julio')
  const [textoBusca, setTextoBusca] = useState('')

  const usuario = {
    nome: nome,
    username: '@julio',
    fotoPerfil: 'https://i.pravatar.cc/300?img=47',
    bio: 'Desenvolvedor mobile | React Native | Amante de tecnologia 💻',
    email: 'julio.silva@email.com',
    telefone: '(11) 98765-4321',
    localizacao: 'São Gonçalo do Amarante, RN',
    dataCadastro: '15/01/2024',
    posts: 42,
    seguidores: 1250,
    seguindo: 380,
  }

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

  function handleBusca() {
    if (!textoBusca.trim()) {
      Alert.alert('Busca', 'Digite algo para buscar.')
      return
    }
    Alert.alert('Resultado da Busca', `Buscando por: "${textoBusca}"`, [{ text: 'OK' }])
  }

  const acoes = [
    { id: 1, icone: '📝', titulo: 'Editar Perfil',  descricao: 'Atualize suas informações'   },
    { id: 2, icone: '⚙️', titulo: 'Configurações',  descricao: 'Preferências e privacidade'  },
    { id: 3, icone: '📊', titulo: 'Estatísticas',   descricao: 'Veja seu desempenho'         },
    { id: 4, icone: '❤️', titulo: 'Curtidas',       descricao: 'Posts que você curtiu'       },
    { id: 5, icone: '🔖', titulo: 'Salvos',         descricao: 'Conteúdos salvos'            },
    { id: 6, icone: '🚪', titulo: 'Sair',           descricao: 'Fazer logout da conta', isLogout: true },
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
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }),
          },
        ]
      )
      return
    }
    Alert.alert(acao.titulo, `Você clicou em: ${acao.descricao}`)
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.header}>
          <Text style={styles.headerTitulo}>Meu Perfil</Text>
        </View>

        <View style={styles.perfilContainer}>
          <Image source={{ uri: usuario.fotoPerfil }} style={styles.fotoPerfil} />
          <Text style={styles.nome}>{usuario.nome}</Text>
          <Text style={styles.username}>{usuario.username}</Text>
          <TouchableOpacity style={styles.botaoVerMais} onPress={handleVerMais}>
            <Text style={styles.botaoVerMaisTexto}>Ver mais</Text>
          </TouchableOpacity>
        </View>

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

        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  )
}
