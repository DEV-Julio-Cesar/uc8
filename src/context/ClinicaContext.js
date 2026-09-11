import { createContext, useContext, useState } from 'react'

const ClinicaContext = createContext(null)

const agendamentosIniciais = [
  { id: '1', especialidade: 'Clínica Geral', medico: 'Dra. Ana Souza', data: '15/09/2026', hora: '09:00' },
  { id: '2', especialidade: 'Cardiologia', medico: 'Dr. Carlos Lima', data: '18/09/2026', hora: '14:30' },
]

export function ClinicaProvider({ children }) {
  const [nomePaciente, setNomePaciente] = useState('Paciente')
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais)

  function adicionarAgendamento(agendamento) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    setAgendamentos((listaAtual) => [...listaAtual, { ...agendamento, id }])
  }

  return (
    <ClinicaContext.Provider value={{ nomePaciente, setNomePaciente, agendamentos, adicionarAgendamento }}>
      {children}
    </ClinicaContext.Provider>
  )
}

export function useClinica() {
  const contexto = useContext(ClinicaContext)

  if (!contexto) {
    throw new Error('useClinica deve ser usado dentro de ClinicaProvider.')
  }

  return contexto
}
