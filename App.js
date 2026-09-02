import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import StackNavigator from './src/navigation/StackNavigator'
import DrawerNavigator from './src/navigation/DrawerNavigator'

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
