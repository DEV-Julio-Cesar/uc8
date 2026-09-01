import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // ─── Container principal ────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    padding: 24,
  },

  // ─── Título ─────────────────────────────────────────────────────────────
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 1,
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
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  // ─── Botão de login ─────────────────────────────────────────────────────
  botaoEntrar: {
    marginTop: 32,
    backgroundColor: '#1a237e',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 3,
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

  // ─── Link para cadastro ─────────────────────────────────────────────────
  cadastroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },

  cadastroTexto: {
    color: '#546e7a',
    fontSize: 14,
  },

  cadastroLink: {
    color: '#1a237e',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
})
