import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginScreen from './src/screens/LoginScreen'
import CadastroScreen from './src/screens/CadastroScreen'
import TabNavigator from './src/navigation/TabNavigator'

// ─── Navigators ──────────────────────────────────────────────────────────────

const Stack = createStackNavigator()

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="App" component={TabNavigator} />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator()

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Cadastro" component={CadastroScreen} />
      <Drawer.Screen name="App" component={TabNavigator} />
    </Drawer.Navigator>
  )
}

// ─── Troque aqui para alternar o modo de navegação ───────────────────────────
const Navigator = StackNavigator
// const Navigator = DrawerNavigator
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
