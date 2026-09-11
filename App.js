import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './src/screens/LoginScreen'
import CadastroScreen from './src/screens/CadastroScreen'
import NovoAgendamentoScreen from './src/screens/NovoAgendamentoScreen'
import ConfirmacaoScreen from './src/screens/ConfirmacaoScreen'
import TabNavigator from './src/navigation/TabNavigator'
import { ClinicaProvider } from './src/context/ClinicaContext'

// ─── Navigators ──────────────────────────────────────────────────────────────

const Stack = createStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="App" component={TabNavigator} />
      <Stack.Screen name="NovoAgendamento" component={NovoAgendamentoScreen} />
      <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
    </Stack.Navigator>
  )
}

// ─── Troque aqui para alternar o modo de navegação ───────────────────────────
const Navigator = StackNavigator
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <ClinicaProvider>
        <NavigationContainer>
          <Navigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ClinicaProvider>
    </SafeAreaProvider>
  )
}
