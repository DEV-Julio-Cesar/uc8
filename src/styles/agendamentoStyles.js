import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // ─── Container ───────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },

  // ─── Título ──────────────────────────────────────────────────────────────
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },

  // ─── Link ────────────────────────────────────────────────────────────────
  link: {
    fontSize: 14,
    color: '#1565c0',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 16,
  },

  // ─── Card ────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  id: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 2,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  tarefa: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },

  // ─── Botão de data ────────────────────────────────────────────────────────
  botaoData: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e8eaf6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  data: {
    fontSize: 13,
    color: '#1a237e',
    fontWeight: '600',
  },

  // ─── Botão adicionar ──────────────────────────────────────────────────────
  botaoAdicionar: {
    backgroundColor: '#1a237e',
    margin: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  botaoAdicionarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ─── Modal ────────────────────────────────────────────────────────────────
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginTop: 10,
    marginBottom: 4,
  },

  modalInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#f9f9f9',
  },

  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 10,
  },

  modalBotao: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  modalCancelar: {
    backgroundColor: '#F44336',
  },

  modalSalvar: {
    backgroundColor: '#4CAF50',
  },

  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
})
