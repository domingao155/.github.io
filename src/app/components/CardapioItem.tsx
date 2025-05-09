import { CardapioItem } from './types';

const cardapio: CardapioItem[] = [
  { id: 'pizza-01', categoria: 'Pizza', nome: 'Pizza Grande Mussarela', descricao: 'Molho de tomate fresco, mussarela de alta qualidade e orégano.', imagem: '/images/Pizza Grande Mussarela.jpg', preco: 55.90 },
  { id: 'pizza-02', categoria: 'Pizza', nome: 'Pizza Grande Calabresa', descricao: 'Molho de tomate fresco, calabresa fatiada, cebola e orégano.', imagem: '/images/Pizza Grande Calabresa.jpg', preco: 58.90 },
  { id: 'pizza-03', categoria: 'Pizza', nome: 'Pizza Grande Portuguesa', descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitona e orégano.', imagem: '/images/Pizza Grande Portuguesa.jpg', preco: 60.90 },
  { id: 'pizza-04', categoria: 'Pizza', nome: 'Pizza Grande Frango com Catupiry', descricao: 'Molho de tomate, mussarela, frango desfiado, catupiry e orégano.', imagem: "/images/Pizza Grande Frango com Catupiry.jpg", preco: 62.90 },
  { id: 'pizza-05', categoria: 'Pizza', nome: 'Pizza Grande Quatro Queijos', descricao: 'Molho de tomate, mussarela, provolone, parmesão, gorgonzola e orégano.', imagem: "/images/Pizza Grande Quatro Queijos.jpg", preco: 64.90 },
  { id: 'pizza-06', categoria: 'Pizza', nome: 'Pizza Grande Marguerita', descricao: 'Molho de tomate, mussarela, tomate fresco, manjericão e orégano.', imagem: 
'/images/Pizza Grande Marguerita.jpg', preco: 59.90 },
  { id: 'pizza-07', categoria: 'Pizza', nome: 'Pizza Grande Pepperoni', descricao: 'Molho de tomate, mussarela e generosas fatias de pepperoni.', imagem: "/images/Pizza Grande Pepperoni.jpg", preco: 66.90 },
  { id: 'pizza-08', categoria: 'Pizza', nome: 'Pizza Grande Bacon', descricao: 'Molho de tomate, mussarela, bacon crocante e orégano.', imagem: "/images/Pizza Grande Bacon.jpg", preco: 63.90 },
  { id: 'pizza-09', categoria: 'Pizza', nome: 'Pizza Grande Milho', descricao: 'Molho de tomate, mussarela, milho verde e orégano.', imagem: "/images/Pizza Grande Milho.jpg", preco: 57.90 },
  { id: 'pizza-10', categoria: 'Pizza', nome: 'Pizza Grande Palmito', descricao: 'Molho de tomate, mussarela, palmito em rodelas e orégano.', imagem: "/images/Pizza Grande Palmito.jpg", preco: 61.90 },
  { id: 'pizza-11', categoria: 'Pizza', nome: 'Pizza Grande Atum', descricao: 'Molho de tomate, mussarela, atum sólido, cebola e orégano.', imagem: "/images/Pizza Grande Atum.jpg", preco: 60.90 },
  { id: 'pizza-12', categoria: 'Pizza', nome: 'Pizza Grande Napolitana', descricao: 'Molho de tomate, mussarela, tomate fresco, parmesão e orégano.', imagem: "/images/Pizza Grande Napolitana.jpg", preco: 60.90 },
  { id: 'pizza-13', categoria: 'Pizza', nome: 'Pizza Grande Romana', descricao: 'Molho de tomate, mussarela, aliche importado, tomate fresco e orégano.', imagem: 
'/images/Pizza Grande Romana.jpg', preco: 68.90 },
  { id: 'pizza-14', categoria: 'Pizza', nome: 'Pizza Grande Siciliana', descricao: 'Molho de tomate, mussarela, champignon, azeitonas e orégano.', imagem: "/images/Pizza Grande Siciliana.jpg", preco: 67.90 },
  { id: 'pizza-15', categoria: 'Pizza', nome: 'Pizza Grande Vegetariana', descricao: 'Molho de tomate, mussarela, brócolis, palmito, milho, ervilha, cebola e orégano.', imagem: "/images/Pizza Grande Vegetariana.jpg", preco: 63.90 },
  { id: 'pizza-16', categoria: 'Pizza', nome: 'Pizza Grande Brócolis com Bacon', descricao: 'Molho de tomate, mussarela, brócolis refogado, bacon crocante e orégano.', imagem: "/images/Pizza Grande Brocolis com Bacon.jpg", preco: 65.90 },
  { id: 'pizza-17', categoria: 'Pizza', nome: 'Pizza Grande Lombo Canadense', descricao: 'Molho de tomate, mussarela, lombo canadense fatiado, cebola e orégano.', imagem: "/images/Pizza Grande Lombo Canadense.jpg", preco: 66.90 },
  { id: 'pizza-18', categoria: 'Pizza', nome: 'Pizza Grande Carne Seca', descricao: 'Molho de tomate, mussarela, carne seca desfiada, cebola e catupiry.', imagem: "/images/Pizza Grande Carne Seca.jpg", preco: 69.90 },
  { id: 'pizza-19', categoria: 'Pizza', nome: 'Pizza Grande Chocolate', descricao: 'Massa de pizza coberta com chocolate ao leite derretido e granulado.', imagem: "/images/Pizza Grande Chocolate.jpg", preco: 55.90 },
  { id: 'pizza-20', categoria: 'Pizza', nome: 'Pizza Grande Romeu e Julieta', descricao: 'Massa de pizza coberta com mussarela e goiabada cremosa.', imagem: "/images/Pizza Grande Romeu e Julieta.jpg", preco: 56.90 },
  { id: 'esfirra-01', categoria: 'Esfirra', nome: 'Esfirra de Carne', descricao: 'Deliciosa esfirra aberta com recheio de carne moída temperada.', imagem: "/images/Esfirra de Carne.jpg", preco: 6.50 },
  { id: 'esfirra-02', categoria: 'Esfirra', nome: 'Esfirra de Frango', descricao: 'Esfirra aberta com recheio de frango desfiado e temperado.', imagem: "/images/Esfirra de Frango.jpg", preco: 6.50 },
  { id: 'esfirra-03', categoria: 'Esfirra', nome: 'Esfirra de Queijo', descricao: 'Esfirra aberta com recheio de queijo mussarela derretido.', imagem: "/images/Esfirra de Queijo.jpg", preco: 6.50 },
  { id: 'esfirra-04', categoria: 'Esfirra', nome: 'Esfirra de Calabresa', descricao: 'Esfirra aberta com recheio de calabresa moída e cebola.', imagem: "/images/Esfirra de Calabresa.jpg", preco: 6.90 },
  { id: 'esfirra-05', categoria: 'Esfirra', nome: 'Esfirra de Palmito', descricao: 'Esfirra aberta com recheio cremoso de palmito.', imagem: "/images/Esfirra de Palmito.jpg", preco: 7.20 },
  { id: 'esfirra-06', categoria: 'Esfirra', nome: 'Esfirra de Brócolis', descricao: 'Esfirra aberta com brócolis refogado e queijo.', imagem: "/images/Esfirra de Brocolis.jpg", preco: 7.20 },
  { id: 'esfirra-07', categoria: 'Esfirra', nome: 'Esfirra de Carne Seca', descricao: 'Esfirra aberta com recheio de carne seca desfiada e catupiry.', imagem: "/images/Esfirra de Carne Seca.jpg", preco: 7.90 },
  { id: 'esfirra-08', categoria: 'Esfirra', nome: 'Esfirra de Chocolate', descricao: 'Esfirra aberta doce com cobertura de chocolate ao leite.', imagem: "/images/Esfirra de Chocolate.jpg", preco: 7.50 },
  { id: 'esfirra-09', categoria: 'Esfirra', nome: 'Esfirra de Doce de Leite', descricao: 'Esfirra aberta doce com cobertura de doce de leite cremoso.', imagem: "/images/Esfirra de Doce de Leite.jpg", preco: 7.50 },
  { id: 'esfirra-10', categoria: 'Esfirra', nome: 'Esfirra Romeu e Julieta', descricao: 'Esfirra aberta doce com queijo mussarela e goiabada.', imagem: "/images/Esfirra Romeu e Julieta.jpg", preco: 7.50 },
  { id: 'broto-01', categoria: 'Broto', nome: 'Broto de Chocolate com Confetes', descricao: 'Pizza broto doce com cobertura de chocolate e confetes coloridos.', imagem: "/images/Broto de Chocolate com Confetes.jpg", preco: 25.90 },
  { id: 'broto-02', categoria: 'Broto', nome: 'Broto de Calabresa', descricao: 'Pizza broto com molho de tomate, mussarela, calabresa fatiada e orégano.', imagem: "/images/Broto de Calabresa.jpg", preco: 22.90 },
  { id: 'broto-03', categoria: 'Broto', nome: 'Broto de Mussarela', descricao: 'Pizza broto com molho de tomate, mussarela e orégano.', imagem: "/images/Broto de Mussarela.jpg", preco: 19.90 },
  { id: 'bebida-01', categoria: 'Bebida', nome: 'Coca-Cola Lata 350ml', descricao: 'Refrigerante de cola, lata 350ml.', imagem: "/images/Coca-Cola Lata 350ml.jpg", preco: 5.50 },
  { id: 'bebida-02', categoria: 'Bebida', nome: 'Coca-Cola 2 Litros', descricao: 'Refrigerante de cola, garrafa 2 litros.', imagem: "/images/Coca-Cola 2 Litros.jpg", preco: 12.90 },
  { id: 'bebida-03', categoria: 'Bebida', nome: 'Guaraná Antarctica Lata 350ml', descricao: 'Refrigerante de guaraná, lata 350ml.', imagem: "/images/Guarana Antarctica Lata 350ml.jpg", preco: 5.50 },
  { id: 'bebida-04', categoria: 'Bebida', nome: 'Guaraná Antarctica 2 Litros', descricao: 'Refrigerante de guaraná, garrafa 2 litros.', imagem: 
'/images/bebidas/Guarana_Antarctica_2_Litros.jpg', preco: 12.90 },
  { id: 'bebida-05', categoria: 'Bebida', nome: 'Fanta Laranja Lata 350ml', descricao: 'Refrigerante sabor laranja, lata 350ml.', imagem: 
'/images/bebidas/Fanta_Laranja_Lata_350ml.jpg', preco: 5.50 },
  { id: 'bebida-06', categoria: 'Bebida', nome: 'Fanta Laranja 2 Litros', descricao: 'Refrigerante sabor laranja, garrafa 2 litros.', imagem: 
'/images/bebidas/Fanta_Laranja_2_Litros.png', preco: 12.90 },
  { id: 'bebida-07', categoria: 'Bebida', nome: 'Sprite Lata 350ml', descricao: 'Refrigerante sabor limão, lata 350ml.', imagem: 
'/images/bebidas/Sprite_Lata_350ml.jpg', preco: 5.50 },
  { id: 'bebida-08', categoria: 'Bebida', nome: 'Sprite 2 Litros', descricao: 'Refrigerante sabor limão, garrafa 2 litros.', imagem: 
'/images/bebidas/Sprite_2_Litros.jpg', preco: 12.90 },
  { id: 'bebida-09', categoria: 'Bebida', nome: 'Água Mineral sem Gás 500ml', descricao: 'Água mineral natural, garrafa 500ml.', imagem: 
'/images/bebidas/Agua_Mineral_sem_Gas_500ml.jpg', preco: 4.00 },
  { id: 'bebida-10', categoria: 'Bebida', nome: 'Água Mineral com Gás 500ml', descricao: 'Água mineral com gás, garrafa 500ml.', imagem: 
'/images/bebidas/Agua_Mineral_com_Gas_500ml.jpg', preco: 4.50 }
];

export default cardapio;

