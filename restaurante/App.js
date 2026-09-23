import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'

import { PedidoProvider } from './src/context/PedidoContext'
import { AuthProvider, useAuth } from './src/context/AuthContext'
import LoginAdminScreen from './src/screens/LoginAdminScreen'
import ResumoScreen from './src/screens/ResumoScreen'
import Info from './src/screens/Info'
import Configuracao from './src/screens/Configuracao'
import TabNavigator from './src/navigation/TabNavigator'

const Stack = createStackNavigator()

function AppNavigation() {
  const { autenticado } = useAuth()

  if (!autenticado) {
    return (
      <>
        <LoginAdminScreen />
        <StatusBar style="auto" />
      </>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Restaurante" component={TabNavigator} />
        <Stack.Screen name="Resumo" component={ResumoScreen} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Configuracao" component={Configuracao} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PedidoProvider>
          <AppNavigation />
        </PedidoProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
