import { StyleSheet } from 'react-native'

// Estilos do formulário de cadastro centralizados aqui
// Facilita manutenção: mudar cores, tamanhos, etc. em um só lugar

export const styles = StyleSheet.create({
  // ─── Container principal ────────────────────────────────────────────────
  scroll: {
    padding: 24,
    paddingBottom: 48,
    backgroundColor: '#f0f4f8',
  },

  // ─── Título da tela ─────────────────────────────────────────────────────
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },

  // ─── Botão Voltar ───────────────────────────────────────────────────────
  botaoVoltar: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },

  botaoVoltarTexto: {
    fontSize: 14,
    color: '#1a237e',
    fontWeight: '600',
  },

  // ─── Labels dos campos ──────────────────────────────────────────────────
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474f',
    marginBottom: 4,
    marginTop: 12,
  },

  // ─── Inputs de texto ────────────────────────────────────────────────────
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cfd8dc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#212121',
    // Sombra leve no Android
    elevation: 1,
    // Sombra leve no iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  // ─── Seleção de sexo ────────────────────────────────────────────────────
  sexoContainer: {
    flexDirection: 'row', // coloca os botões lado a lado
    gap: 10,
    marginTop: 4,
  },

  sexoBotao: {
    flex: 1, // distribui espaço igualmente entre os 3 botões
    borderWidth: 1.5,
    borderColor: '#90a4ae',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  sexoBotaoSelecionado: {
    borderColor: '#1a237e',
    backgroundColor: '#1a237e',
  },

  sexoTexto: {
    fontSize: 13,
    color: '#546e7a',
    fontWeight: '500',
  },

  sexoTextoSelecionado: {
    color: '#fff',
    fontWeight: '700',
  },

  // ─── Botão de envio ─────────────────────────────────────────────────────
  botaoEnviar: {
    marginTop: 32,
    backgroundColor: '#1a237e',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    // Sombra no Android
    elevation: 3,
    // Sombra no iOS
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
})
