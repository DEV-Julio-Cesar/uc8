import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CARDAPIO } from '../data/cardapio'

const CHAVE_CARRINHO = '@restaurante:carrinho'
const CHAVE_PEDIDOS = '@restaurante:pedidos'
const QUANTIDADE_MAXIMA = 20
const MAXIMO_PEDIDOS = 50
const TAMANHO_MAXIMO_ARMAZENADO = 200000
const PedidoContext = createContext(null)

function lerJsonLimitado(valor) {
  if (!valor || valor.length > TAMANHO_MAXIMO_ARMAZENADO) return []
  return JSON.parse(valor)
}

function validarCarrinho(valor) {
  if (!Array.isArray(valor)) return []

  return valor.slice(0, CARDAPIO.length).reduce((itensValidos, item) => {
    const produtoExiste = CARDAPIO.some((produto) => produto.id === item?.produtoId)
    const produtoDuplicado = itensValidos.some((itemValido) => itemValido.produtoId === item?.produtoId)
    const quantidadeValida = Number.isInteger(item?.quantidade)
      && item.quantidade >= 1
      && item.quantidade <= QUANTIDADE_MAXIMA

    if (produtoExiste && !produtoDuplicado && quantidadeValida) itensValidos.push(item)
    return itensValidos
  }, [])
}

function validarPedidos(valor) {
  if (!Array.isArray(valor)) return []

  return valor.slice(0, MAXIMO_PEDIDOS).reduce((pedidosValidos, pedido) => {
    if (typeof pedido?.id !== 'string' || pedido.id.length > 100) return pedidosValidos
    if (typeof pedido?.data !== 'string' || Number.isNaN(new Date(pedido.data).getTime())) return pedidosValidos
    if (!Array.isArray(pedido?.itens)) return pedidosValidos

    const itens = validarCarrinho(pedido.itens.map((item) => ({
      produtoId: item?.produtoId,
      quantidade: item?.quantidade,
    }))).map((item) => {
      const produto = CARDAPIO.find((produtoAtual) => produtoAtual.id === item.produtoId)
      return { ...item, nome: produto.nome, precoCentavos: produto.precoCentavos }
    })
    if (itens.length === 0) return pedidosValidos

    pedidosValidos.push({
      id: pedido.id,
      data: pedido.data,
      itens,
      totalCentavos: itens.reduce(
        (total, item) => total + item.precoCentavos * item.quantidade,
        0
      ),
    })
    return pedidosValidos
  }, [])
}

export function PedidoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroArmazenamento, setErroArmazenamento] = useState('')

  useEffect(() => {
    async function carregarDados() {
      try {
        const [[, carrinhoSalvo], [, pedidosSalvos]] = await AsyncStorage.multiGet([
          CHAVE_CARRINHO,
          CHAVE_PEDIDOS,
        ])
        setCarrinho(validarCarrinho(lerJsonLimitado(carrinhoSalvo)))
        setPedidos(validarPedidos(lerJsonLimitado(pedidosSalvos)))
      } catch {
        setErroArmazenamento('Não foi possível recuperar os dados salvos.')
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [])

  useEffect(() => {
    if (carregando) return

    AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho)).catch(() => {
      setErroArmazenamento('Não foi possível salvar o carrinho.')
    })
  }, [carrinho, carregando])

  useEffect(() => {
    if (carregando) return

    AsyncStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos)).catch(() => {
      setErroArmazenamento('Não foi possível salvar o histórico de pedidos.')
    })
  }, [pedidos, carregando])

  function alterarQuantidade(produtoId, diferenca) {
    if (!CARDAPIO.some((produto) => produto.id === produtoId)) return

    setCarrinho((listaAtual) => {
      const itemAtual = listaAtual.find((item) => item.produtoId === produtoId)
      const novaQuantidade = Math.min(
        QUANTIDADE_MAXIMA,
        Math.max(0, (itemAtual?.quantidade || 0) + diferenca)
      )

      if (novaQuantidade === 0) {
        return listaAtual.filter((item) => item.produtoId !== produtoId)
      }
      if (itemAtual) {
        return listaAtual.map((item) => (
          item.produtoId === produtoId ? { ...item, quantidade: novaQuantidade } : item
        ))
      }
      return [...listaAtual, { produtoId, quantidade: novaQuantidade }]
    })
  }

  function finalizarPedido() {
    if (carrinho.length === 0) return false

    const itens = carrinho.map((item) => {
      const produto = CARDAPIO.find((produtoAtual) => produtoAtual.id === item.produtoId)
      return {
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: item.quantidade,
        precoCentavos: produto.precoCentavos,
      }
    })
    const totalCentavos = itens.reduce(
      (total, item) => total + item.precoCentavos * item.quantidade,
      0
    )
    const pedido = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      data: new Date().toISOString(),
      itens,
      totalCentavos,
    }

    setPedidos((listaAtual) => [pedido, ...listaAtual].slice(0, MAXIMO_PEDIDOS))
    setCarrinho([])
    return true
  }

  const itensCarrinho = useMemo(() => carrinho.map((item) => {
    const produto = CARDAPIO.find((produtoAtual) => produtoAtual.id === item.produtoId)
    return { ...produto, quantidade: item.quantidade }
  }), [carrinho])

  const totalCentavos = useMemo(() => itensCarrinho.reduce(
    (total, item) => total + item.precoCentavos * item.quantidade,
    0
  ), [itensCarrinho])

  return (
    <PedidoContext.Provider value={{
      carregando,
      erroArmazenamento,
      itensCarrinho,
      pedidos,
      totalCentavos,
      alterarQuantidade,
      finalizarPedido,
    }}>
      {children}
    </PedidoContext.Provider>
  )
}

export function usePedido() {
  const contexto = useContext(PedidoContext)
  if (!contexto) throw new Error('usePedido deve ser usado dentro de PedidoProvider.')
  return contexto
}
