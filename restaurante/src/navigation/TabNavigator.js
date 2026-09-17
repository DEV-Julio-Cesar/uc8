import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CardapioScreen from '../screens/CardapioScreen'
import CarrinhoScreen from '../screens/CarrinhoScreen'
import PedidosScreen from '../screens/PedidosScreen'
import CadastrarScreen from '../screens/CadastrarScreen'
import { usePedido } from '../context/PedidoContext'

const Tab = createBottomTabNavigator()

function Icone({ valor, focused }) {
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{valor}</Text>
}

export default function TabNavigator() {
  const { itensCarrinho } = usePedido()
  const quantidade = itensCarrinho.reduce((total, item) => total + item.quantidade, 0)

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#b23a20',
      tabBarInactiveTintColor: '#8d8d8d',
      tabBarStyle: { height: 62, paddingBottom: 6, paddingTop: 4 },
    }}>
      <Tab.Screen name="Cardápio" component={CardapioScreen} options={{
        tabBarIcon: ({ focused }) => <Icone valor="🍽️" focused={focused} />,
      }} />
      <Tab.Screen name="Carrinho" component={CarrinhoScreen} options={{
        tabBarBadge: quantidade > 0 ? quantidade : undefined,
        tabBarBadgeStyle: { backgroundColor: '#b23a20' },
        tabBarIcon: ({ focused }) => <Icone valor="🛒" focused={focused} />,
      }} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} options={{
        tabBarIcon: ({ focused }) => <Icone valor="🧾" focused={focused} />,
      }} />
      <Tab.Screen name="Cadastro" component={CadastrarScreen} options={{
        tabBarIcon: ({ focused }) => <Icone valor="👤" focused={focused} />,
      }} />
    </Tab.Navigator>
  )
}
