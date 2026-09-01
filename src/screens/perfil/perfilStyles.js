import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // ─── Container principal ────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },

  // ─── Header ─────────────────────────────────────────────────────────────
  header: {
    backgroundColor: '#1a237e',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  headerTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  // ─── Foto + nome ─────────────────────────────────────────────────────────
  perfilContainer: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 16,
  },

  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#e0e0e0',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginTop: 12,
  },

  username: {
    fontSize: 14,
    color: '#546e7a',
    marginTop: 4,
  },

  // ─── Botão ver mais ──────────────────────────────────────────────────────
  botaoVerMais: {
    backgroundColor: '#1a237e',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 12,
    elevation: 2,
  },

  botaoVerMaisTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // ─── Estatísticas ────────────────────────────────────────────────────────
  estatisticasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  estatisticaItem: {
    alignItems: 'center',
  },

  estatisticaNumero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
  },

  estatisticaLabel: {
    fontSize: 12,
    color: '#546e7a',
    marginTop: 4,
  },

  // ─── Busca ───────────────────────────────────────────────────────────────
  buscaContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
  },

  buscaInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 15,
    color: '#212121',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // ─── Ações ───────────────────────────────────────────────────────────────
  acoesContainer: {
    marginHorizontal: 24,
  },

  acaoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  acaoIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  acaoIconeTexto: {
    fontSize: 20,
  },

  acaoConteudo: {
    flex: 1,
  },

  acaoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },

  acaoDescricao: {
    fontSize: 13,
    color: '#546e7a',
    marginTop: 2,
  },
})
