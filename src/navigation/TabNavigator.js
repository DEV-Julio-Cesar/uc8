import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'

import PerfilScreen from '../screens/PerfilScreen'
import AgendamentoScreen from '../screens/AgendamentoScreen'
import ConfiguracaoScreen from '../screens/ConfiguracaoScreen'

const Tab = createBottomTabNavigator()

function TabIcone({ icone, focused }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icone}</Text>
  )
}

export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1a237e',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 60,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ focused }) => <TabIcone icone="👤" focused={focused} />,
        }}
      >
        {() => <PerfilScreen navigation={navigation} />}
      </Tab.Screen>

      <Tab.Screen
        name="Agendamentos"
        component={AgendamentoScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcone icone="📅" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={ConfiguracaoScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcone icone="⚙️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}
