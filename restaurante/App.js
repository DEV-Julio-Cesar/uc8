import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { mostrarUsuarios, mostrarUsuario, deletarUsuario, atualizarUsuario } from './reporitory/usuarioRepository'

import TabNavigator from './src/navigation/TabNavigator'
import ResumoScreen from './src/screens/ResumoScreen'
import { PedidoProvider } from './src/context/PedidoContext'
import { ConectarBD, criarTabelaUsuarios } from './database/database'
import { useEffect } from 'react'

const Stack = createStackNavigator()

export default function App() {
  useEffect(() => {
    async function inicializarBanco() {
      const db = await ConectarBD()
      if (db) {
        await criarTabelaUsuarios(db)
        await mostrarUsuarios(db)
        await mostrarUsuario(db, 2)
        await atualizarUsuario(db, 3, {
          nome: 'koldri',
          email: 'koldri@gmail.com',
          senha: '123456',
        })
        await deletarUsuario(db,1),
        await mostrarUsuarios(db)
      }
    }

    inicializarBanco()
  }, [])

  return (
    <SafeAreaProvider>
      <PedidoProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Restaurante" component={TabNavigator} />
            <Stack.Screen name="Resumo" component={ResumoScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PedidoProvider>
    </SafeAreaProvider>
  )
}
