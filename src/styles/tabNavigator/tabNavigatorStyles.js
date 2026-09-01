import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  conteudo: {
    flex: 1,
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcone: {
    fontSize: 20,
  },

  tabTexto: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },

  tabTextoAtivo: {
    color: '#1a237e',
    fontWeight: 'bold',
  },

  indicador: {
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: 3,
    backgroundColor: '#1a237e',
    borderRadius: 2,
  },
})
