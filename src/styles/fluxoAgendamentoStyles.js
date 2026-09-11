import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 24, paddingTop: 60 },
  scroll: { flexGrow: 1, backgroundColor: '#f0f4f8', padding: 24, paddingTop: 60, paddingBottom: 40 },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: '#37474f', marginTop: 16, marginBottom: 8 },
  ajuda: { color: '#78909c', fontSize: 13, marginBottom: 8 },
  opcoes: { gap: 8 },
  opcao: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cfd8dc', borderRadius: 8, padding: 12 },
  opcaoSelecionada: { backgroundColor: '#1a237e', borderColor: '#1a237e' },
  opcaoTexto: { color: '#37474f', textAlign: 'center', fontWeight: '500' },
  opcaoTextoSelecionado: { color: '#fff', fontWeight: 'bold' },
  seletor: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cfd8dc', borderRadius: 8, padding: 14 },
  seletorTexto: { color: '#37474f', fontSize: 15 },
  resumo: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 24, elevation: 2 },
  resumoLabel: { color: '#78909c', fontSize: 12, textTransform: 'uppercase', marginTop: 10 },
  resumoValor: { color: '#212121', fontSize: 17, fontWeight: '600', marginTop: 3 },
  botaoPrimario: { backgroundColor: '#1a237e', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 24 },
  botaoPrimarioTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoSecundario: { borderWidth: 1, borderColor: '#1a237e', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  botaoSecundarioTexto: { color: '#1a237e', fontSize: 15, fontWeight: '600' },
})
