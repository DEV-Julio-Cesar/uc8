import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  header: {
    backgroundColor: '#1a237e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  headerTitulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  secaoTitulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 6,
    marginHorizontal: 20,
  },

  opcaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  opcaoIcone: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#e8eaf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  opcaoIconeTexto: {
    fontSize: 18,
  },

  opcaoConteudo: {
    flex: 1,
  },

  opcaoTitulo: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },

  opcaoDescricao: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },

  opcaoSeta: {
    fontSize: 16,
    color: '#ccc',
  },

  versao: {
    textAlign: 'center',
    color: '#bbb',
    fontSize: 12,
    marginVertical: 32,
  },
})
