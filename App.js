import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from './src/styles/login/LoginScreen'
import CadastroScreen from './src/styles/cadastro/CadastroScreen'
import TabNavigator from './src/styles/tabNavigator/TabNavigator'

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="App" component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
