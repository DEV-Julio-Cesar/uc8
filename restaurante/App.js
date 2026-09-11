import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'

import TabNavigator from './src/navigation/TabNavigator'
import ResumoScreen from './src/screens/ResumoScreen'
import { PedidoProvider } from './src/context/PedidoContext'

const Stack = createStackNavigator()

export default function App() {
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
