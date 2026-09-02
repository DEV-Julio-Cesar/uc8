import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native'
import { useState } from 'react'
import { styles } from '../styles/configuracaoStyles'

export default function ConfiguracaoScreen() {
  const [notificacoes, setNotificacoes] = useState(true)
  const [modoEscuro, setModoEscuro] = useState(false)
  const [localizacao, setLocalizacao] = useState(true)

  const secoes = [
    {
      titulo: 'Conta',
      opcoes: [
        { id: 1, icone: '🔒', titulo: 'Privacidade',   descricao: 'Controle quem vê seu perfil' },
        { id: 2, icone: '🔑', titulo: 'Segurança',     descricao: 'Senha e autenticação'        },
        { id: 3, icone: '📧', titulo: 'E-mail',        descricao: 'Gerencie seu e-mail'         },
      ],
    },
    {
      titulo: 'Preferências',
      opcoes: [
        { id: 4, icone: '🌐', titulo: 'Idioma',        descricao: 'Português (Brasil)'                                                          },
        { id: 5, icone: '🔔', titulo: 'Notificações',  descricao: 'Alertas e lembretes',  toggle: true, valor: notificacoes, aoMudar: setNotificacoes },
        { id: 6, icone: '🌙', titulo: 'Modo Escuro',   descricao: 'Tema escuro do app',   toggle: true, valor: modoEscuro,   aoMudar: setModoEscuro   },
        { id: 7, icone: '📍', titulo: 'Localização',   descricao: 'Acesso à sua posição', toggle: true, valor: localizacao,  aoMudar: setLocalizacao  },
      ],
    },
    {
      titulo: 'Suporte',
      opcoes: [
        { id: 8,  icone: '❓', titulo: 'Ajuda e Suporte', descricao: 'Central de ajuda'        },
        { id: 9,  icone: '⭐', titulo: 'Avaliar o App',   descricao: 'Deixe sua opinião'       },
        { id: 10, icone: '📄', titulo: 'Termos de Uso',   descricao: 'Políticas e privacidade' },
      ],
    },
  ]

  function handleOpcaoPress(opcao) {
    if (opcao.toggle) return
    Alert.alert(opcao.titulo, opcao.descricao, [{ text: 'Fechar' }])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Configurações</Text>
      </View>

      <ScrollView>
        {secoes.map((secao) => (
          <View key={secao.titulo}>
            <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
            {secao.opcoes.map((opcao) => (
              <TouchableOpacity
                key={opcao.id}
                style={styles.opcaoItem}
                onPress={() => handleOpcaoPress(opcao)}
                activeOpacity={opcao.toggle ? 1 : 0.6}
              >
                <View style={styles.opcaoIcone}>
                  <Text style={styles.opcaoIconeTexto}>{opcao.icone}</Text>
                </View>
                <View style={styles.opcaoConteudo}>
                  <Text style={styles.opcaoTitulo}>{opcao.titulo}</Text>
                  <Text style={styles.opcaoDescricao}>{opcao.descricao}</Text>
                </View>
                {opcao.toggle ? (
                  <Switch
                    value={opcao.valor}
                    onValueChange={opcao.aoMudar}
                    trackColor={{ false: '#ddd', true: '#3949ab' }}
                    thumbColor={opcao.valor ? '#1a237e' : '#f4f3f4'}
                  />
                ) : (
                  <Text style={styles.opcaoSeta}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <Text style={styles.versao}>Versão 1.0.0</Text>
      </ScrollView>
    </View>
  )
}
