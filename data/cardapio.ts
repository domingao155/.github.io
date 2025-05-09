export interface MenuItem {
  id: string;
  categoria: string; // 'Pizza', 'Esfirra', 'Broto', 'Bebida'
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string; // Optional image path
  promo?: boolean; // Optional promo marker
}

export const cardapio: MenuItem[] = [
  // Pizzas Grandes (Exemplos)
  {
    id: 'pizza-01',
    categoria: 'Pizza',
    nome: 'Pizza Grande Mussarela',
    descricao: 'Molho de tomate fresco, mussarela de alta qualidade e orégano.',
    preco: 55.90,
    imagem: '/images/pizzas/mussarela.jpg' // Placeholder path
  },
  {
    id: 'pizza-02',
    categoria: 'Pizza',
    nome: 'Pizza Grande Calabresa',
    descricao: 'Molho de tomate fresco, calabresa fatiada, cebola e orégano.',
    preco: 58.90,
    imagem: '/images/pizzas/calabresa.jpg'
  },
  {
    id: 'pizza-03',
    categoria: 'Pizza',
    nome: 'Pizza Grande Frango com Catupiry',
    descricao: 'Molho de tomate fresco, frango desfiado, catupiry original e orégano.',
    preco: 62.90,
    imagem: '/images/pizzas/frango_catupiry.jpg'
  },
  {
    id: 'pizza-04',
    categoria: 'Pizza',
    nome: 'Pizza Grande Portuguesa',
    descricao: 'Molho de tomate fresco, presunto, mussarela, ovo, cebola, pimentão, azeitonas e orégano.',
    preco: 64.90,
    imagem: '/images/pizzas/portuguesa.jpg'
  },

  // Esfirras (Exemplos)
  {
    id: 'esfirra-01',
    categoria: 'Esfirra',
    nome: 'Esfirra de Carne',
    descricao: 'Deliciosa esfirra aberta com recheio de carne moída temperada.',
    preco: 6.50,
    imagem: '/images/esfirras/carne.jpg'
  },
  {
    id: 'esfirra-02',
    categoria: 'Esfirra',
    nome: 'Esfirra de Queijo',
    descricao: 'Irresistível esfirra aberta com recheio de mussarela derretida.',
    preco: 6.50,
    imagem: '/images/esfirras/queijo.jpg'
  },
  {
    id: 'esfirra-03',
    categoria: 'Esfirra',
    nome: 'Esfirra de Calabresa',
    descricao: 'Saborosa esfirra aberta com recheio de calabresa e cebola.',
    preco: 7.00,
    imagem: '/images/esfirras/calabresa.jpg'
  },

  // Brotos (Exemplos)
  {
    id: 'broto-01',
    categoria: 'Broto',
    nome: 'Broto de Chocolate com Confetes',
    descricao: 'Pizza broto doce com cobertura de chocolate e confetes coloridos.',
    preco: 25.90,
    imagem: '/images/brotos/chocolate_confete.jpg'
  },
  {
    id: 'broto-02',
    categoria: 'Broto',
    nome: 'Broto Romeu e Julieta',
    descricao: 'Pizza broto doce com mussarela e goiabada cremosa.',
    preco: 24.90,
    imagem: '/images/brotos/romeu_julieta.jpg'
  },

  // Bebidas (Atualizado com imagens e itens individuais)
  {
    id: 'bebida-coca-2l',
    categoria: 'Bebida',
    nome: 'Coca-Cola 2 Litros',
    descricao: 'Refrigerante Coca-Cola Garrafa 2 Litros.',
    preco: 12.00,
    imagem: '/images/bebidas/Coca-Cola_2_Litros.jpg'
  },
  {
    id: 'bebida-guarana-2l',
    categoria: 'Bebida',
    nome: 'Guaraná Antarctica 2 Litros',
    descricao: 'Refrigerante Guaraná Antarctica Garrafa 2 Litros.',
    preco: 12.00,
    imagem: '/images/bebidas/Guarana_Antarctica_2_Litros.jpg'
  },
  {
    id: 'bebida-fanta-2l',
    categoria: 'Bebida',
    nome: 'Fanta Laranja 2 Litros',
    descricao: 'Refrigerante Fanta Laranja Garrafa 2 Litros.',
    preco: 12.00,
    imagem: '/images/bebidas/Fanta_Laranja_2_Litros.png'
  },
   {
    id: 'bebida-sprite-2l',
    categoria: 'Bebida',
    nome: 'Sprite 2 Litros',
    descricao: 'Refrigerante Sprite Garrafa 2 Litros.',
    preco: 12.00,
    imagem: '/images/bebidas/Sprite_2_Litros.jpg'
  },
   {
    id: 'bebida-coca-lata',
    categoria: 'Bebida',
    nome: 'Coca-Cola Lata 350ml',
    descricao: 'Refrigerante Coca-Cola Lata 350ml.',
    preco: 5.00,
    // imagem: '/images/bebidas/Coca-Cola Lata 350ml.jpg' // Imagem não fornecida
  },
  {
    id: 'bebida-guarana-lata',
    categoria: 'Bebida',
    nome: 'Guaraná Antarctica Lata 350ml',
    descricao: 'Refrigerante Guaraná Antarctica Lata 350ml.',
    preco: 5.00,
    // imagem: '/images/bebidas/Guaraná Antarctica Lata 350ml.jpg' // Imagem não fornecida
  },
   {
    id: 'bebida-fanta-lata',
    categoria: 'Bebida',
    nome: 'Fanta Laranja Lata 350ml',
    descricao: 'Refrigerante Fanta Laranja Lata 350ml.',
    preco: 5.00,
    imagem: '/images/bebidas/Fanta_Laranja_Lata_350ml.jpg'
  },
   {
    id: 'bebida-sprite-lata',
    categoria: 'Bebida',
    nome: 'Sprite Lata 350ml',
    descricao: 'Refrigerante Sprite Lata 350ml.',
    preco: 5.00,
    imagem: '/images/bebidas/Sprite_Lata_350ml.jpg'
  },
   {
    id: 'bebida-agua-sem-gas',
    categoria: 'Bebida',
    nome: 'Água Mineral sem Gás 500ml',
    descricao: 'Água mineral sem gás, garrafa 500ml.',
    preco: 4.00, // Preço exemplo
    imagem: '/images/bebidas/Agua_Mineral_sem_Gas_500ml.jpg'
  },
   {
    id: 'bebida-agua-com-gas',
    categoria: 'Bebida',
    nome: 'Água Mineral com Gás 500ml',
    descricao: 'Água mineral com gás, garrafa 500ml.',
    preco: 4.50, // Preço exemplo
    imagem: '/images/bebidas/Agua_Mineral_com_Gas_500ml.jpg'
  },
];

