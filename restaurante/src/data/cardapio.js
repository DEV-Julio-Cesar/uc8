export const CARDAPIO = [
  { id: 'comida-1', categoria: 'Comidas', nome: 'Hambúrguer artesanal', descricao: 'Pão, carne, queijo, salada e molho da casa', precoCentavos: 2890 },
  { id: 'comida-2', categoria: 'Comidas', nome: 'Pizza margherita', descricao: 'Molho de tomate, muçarela e manjericão', precoCentavos: 3990 },
  { id: 'comida-3', categoria: 'Comidas', nome: 'Filé com fritas', descricao: 'Filé grelhado acompanhado de batatas fritas', precoCentavos: 4590 },
  { id: 'comida-4', categoria: 'Comidas', nome: 'Salada tropical', descricao: 'Folhas, tomate, manga e molho especial', precoCentavos: 2290 },
  { id: 'bebida-1', categoria: 'Bebidas', nome: 'Suco natural', descricao: 'Copo de 400 ml', precoCentavos: 900 },
  { id: 'bebida-2', categoria: 'Bebidas', nome: 'Refrigerante', descricao: 'Lata de 350 ml', precoCentavos: 700 },
  { id: 'bebida-3', categoria: 'Bebidas', nome: 'Água mineral', descricao: 'Garrafa de 500 ml', precoCentavos: 450 },
]

export function formatarPreco(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
