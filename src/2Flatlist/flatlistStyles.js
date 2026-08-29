import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  info: {
    flex: 1,
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
  botaoData: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e8eaf6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  botaoDataTexto: {
    fontSize: 13,
    color: '#1a237e',
    fontWeight: '600',
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  botaoFeito: {
    backgroundColor: '#4CAF50',
  },
  botaoNaoFeito: {
    backgroundColor: '#F44336',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardHorizontal: {
    backgroundColor: '#1a237e',
    padding: 12,
    marginHorizontal: 8,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
})
