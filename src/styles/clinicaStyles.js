import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8', padding: 24, paddingTop: 60 },
  scroll: { flexGrow: 1, backgroundColor: '#f0f4f8', padding: 24, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 12 },
  saudacao: { fontSize: 20, fontWeight: '600', color: '#37474f', textAlign: 'center', marginBottom: 28 },
  descricao: { fontSize: 16, color: '#546e7a', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 16, elevation: 2 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#1a237e', marginBottom: 8 },
  cardTexto: { fontSize: 15, color: '#546e7a', lineHeight: 22 },
  botaoPrimario: { backgroundColor: '#1a237e', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  botaoPrimarioTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoSair: { borderWidth: 1, borderColor: '#c62828', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 14 },
  botaoSairTexto: { color: '#c62828', fontSize: 16, fontWeight: 'bold' },
  contatoItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 14, elevation: 2 },
  contatoIcone: { fontSize: 28, marginRight: 16 },
  contatoTitulo: { fontSize: 16, fontWeight: 'bold', color: '#212121' },
  contatoTexto: { fontSize: 14, color: '#546e7a', marginTop: 3 },
})
