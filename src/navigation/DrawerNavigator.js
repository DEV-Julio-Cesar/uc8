import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginScreen from '../screens/LoginScreen'
import CadastroScreen from '../screens/CadastroScreen'
import TabNavigator from './TabNavigator'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Cadastro" component={CadastroScreen} />
      <Drawer.Screen name="App" component={TabNavigator} />
    </Drawer.Navigator>
  )
}
