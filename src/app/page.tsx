'use client'

import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import ConfirmacaoPedido from './ConfirmacaoPedido';
import { generateOrderReference } from '../../services/pixPayment';
import AvaliacoesClientes from './AvaliacoesClientes';
import ComentarioPopup from './ComentarioPopup';
import { CardapioItem } from './components/types';
import { useCartStore } from '../../store/cartStore';

interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
}

export default function Home() {
  const [address, setAddress] = useState<Endereco>({ cep: '', rua: '', numero: '', complemento: '' });
  const [showModal, setShowModal] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cepError, setCepError] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [pixCode] = useState({ payload: '00020126580014br.gov.bcb.pix013696a6cf20-b3b1-4651-92e0-a57610e3580d5204000053039865802BR5924Vinicius de Jesus Nascim6008Brasilia62240520daqr236285478331330863046397', base64: '/images/novo_qrcode_cliente.png' });
  const [showConfirmacao, setShowConfirmacao] = useState(false);
  const [pedidoInfo, setPedidoInfo] = useState({ numero: "", tempoEstimado: "", valor: 0 });
  const [promoCepStep, setPromoCepStep] = useState(false);
  const [promoStep, setPromoStep] = useState(0);
  const [selectedPromoPizzas, setSelectedPromoPizzas] = useState<CardapioItem[]>([]);
  const [buscandoLojaCepModal, setBuscandoLojaCepModal] = useState(false);
  const [lojaEncontradaCepModal, setLojaEncontradaCepModal] = useState(false);
  const [mensagemEntregaCepModal, setMensagemEntregaCepModal] = useState("");
  const [itemAddedToCart, setItemAddedToCart] = useState<string | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const addItemToCart = useCartStore((state) => state.addItem);
  const removeItemFromCart = useCartStore((state) => state.removeItem);
  const updateCartQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalCartPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalCartItems = useCartStore((state) => state.getTotalItems);

  const novosComentariosPopup = [
    { id: 1, autor: "Laura B.", texto: "A pizza de pepperoni é simplesmente divina! Chegou super rápido." },
    { id: 2, autor: "Ricardo G.", texto: "Atendimento nota 10 e a pizza de quatro queijos estava sensacional." },
    { id: 3, autor: "Sofia M.", texto: "Já virei cliente fiel! A qualidade é sempre impecável." },
    { id: 4, autor: "Bruno A.", texto: "Pedi a promoção e valeu cada centavo. As pizzas são enormes e deliciosas." },
    { id: 5, autor: "Camila R.", texto: "A massa fininha e crocante faz toda a diferença. Recomendo!" },
    { id: 6, autor: "Lucas P.", texto: "Entrega pontual e a pizza de frango com catupiry é a melhor que já comi." },
    { id: 7, autor: "Juliana C.", texto: "Sabor incomparável! Ótima opção para o fim de semana." },
    { id: 8, autor: "Marcos V.", texto: "Ingredientes frescos e de qualidade. Dá para sentir o capricho." },
    { id: 9, autor: "Beatriz S.", texto: "A pizza doce de chocolate é uma perdição! Amei." },
    { id: 10, autor: "Gabriel L.", texto: "Excelente custo-benefício. Pizzas saborosas e com preço justo." },
    { id: 11, autor: "Amanda N.", texto: "O motoboy foi muito atencioso e a pizza chegou perfeita." },
    { id: 12, autor: "Vinicius F.", texto: "Surpreendente! Não esperava que fosse tão boa. Virei fã." },
    { id: 13, autor: "Clara D.", texto: "A melhor pizzaria da região, sem dúvidas. Sempre peço aqui." },
    { id: 14, autor: "Eduardo T.", texto: "A pizza vegetariana é incrível, cheia de sabor e com muitos vegetais frescos." },
    { id: 15, autor: "Rafaela J.", texto: "Perfeita para reunir os amigos! Todo mundo elogiou." },
    { id: 16, autor: "Gustavo H.", texto: "Chegou antes do previsto e quentinha. Muito bom!" },
    { id: 17, autor: "Letícia M.", texto: "A de lombo canadense é minha favorita. Sabor marcante!" },
    { id: 18, autor: "Felipe O.", texto: "O recheio é generoso e a borda crocante. Delícia!" },
    { id: 19, autor: "Isabela K.", texto: "Fui surpreendida pela qualidade. Com certeza pedirei novamente." },
    { id: 20, autor: "Anderson Z.", texto: "Simplesmente a melhor! Não troco por nada." }
  ];

  const cardapio: CardapioItem[] = [
    { id: 'pizza-01', categoria: 'Pizza', nome: 'Pizza Grande Mussarela', descricao: 'Molho de tomate fresco, mussarela de alta qualidade e orégano.', imagem: '/images/Pizza Grande Mussarela.jpg', preco: 55.90 },
    { id: 'pizza-02', categoria: 'Pizza', nome: 'Pizza Grande Calabresa', descricao: 'Molho de tomate fresco, calabresa fatiada, cebola e orégano.', imagem: '/images/Pizza Grande Calabresa.jpg', preco: 58.90 },
    { id: 'pizza-03', categoria: 'Pizza', nome: 'Pizza Grande Portuguesa', descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitona e orégano.', imagem: '/images/Pizza Grande Portuguesa.jpg', preco: 60.90 },
    { id: 'pizza-04', categoria: 'Pizza', nome: 'Pizza Grande Frango com Catupiry', descricao: 'Molho de tomate, mussarela, frango desfiado, catupiry e orégano.', imagem: "/images/Pizza Grande Frango com Catupiry.jpg", preco: 62.90 },
    { id: 'pizza-05', categoria: 'Pizza', nome: 'Pizza Grande Quatro Queijos', descricao: 'Molho de tomate, mussarela, provolone, parmesão, gorgonzola e orégano.', imagem: "/images/Pizza Grande Quatro Queijos.jpg", preco: 64.90 },
    { id: 'pizza-06', categoria: 'Pizza', nome: 'Pizza Grande Marguerita', descricao: 'Molho de tomate, mussarela, tomate fresco, manjericão e orégano.', imagem: '/images/Pizza Grande Marguerita.jpg', preco: 59.90 },
    { id: 'pizza-07', categoria: 'Pizza', nome: 'Pizza Grande Pepperoni', descricao: 'Molho de tomate, mussarela e generosas fatias de pepperoni.', imagem: "/images/Pizza Grande Pepperoni.jpg", preco: 66.90 },
    { id: 'pizza-08', categoria: 'Pizza', nome: 'Pizza Grande Bacon', descricao: 'Molho de tomate, mussarela, bacon crocante e orégano.', imagem: "/images/Pizza Grande Bacon.jpg", preco: 63.90 },
    { id: 'pizza-09', categoria: 'Pizza', nome: 'Pizza Grande Milho', descricao: 'Molho de tomate, mussarela, milho verde e orégano.', imagem: "/images/Pizza Grande Milho.jpg", preco: 57.90 },
    { id: 'pizza-10', categoria: 'Pizza', nome: 'Pizza Grande Palmito', descricao: 'Molho de tomate, mussarela, palmito em rodelas e orégano.', imagem: "/images/Pizza Grande Palmito.jpg", preco: 61.90 },
    { id: 'pizza-11', categoria: 'Pizza', nome: 'Pizza Grande Atum', descricao: 'Molho de tomate, mussarela, atum sólido, cebola e orégano.', imagem: "/images/Pizza Grande Atum.jpg", preco: 60.90 },
    { id: 'pizza-12', categoria: 'Pizza', nome: 'Pizza Grande Napolitana', descricao: 'Molho de tomate, mussarela, tomate fresco, parmesão e orégano.', imagem: "/images/Pizza Grande Napolitana.jpg", preco: 60.90 },
    { id: 'pizza-13', categoria: 'Pizza', nome: 'Pizza Grande Romana', descricao: 'Molho de tomate, mussarela, aliche importado, tomate fresco e orégano.', imagem: '/images/Pizza Grande Romana.jpg', preco: 68.90 },
    { id: 'pizza-14', categoria: 'Pizza', nome: 'Pizza Grande Siciliana', descricao: 'Molho de tomate, mussarela, champignon, bacon, azeitonas e orégano.', imagem: "/images/Pizza Grande Siciliana.jpg", preco: 67.90 },
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
    { id: 'bebida-04', categoria: 'Bebida', nome: 'Guaraná Antarctica 2 Litros', descricao: 'Refrigerante de guaraná, garrafa 2 litros.', imagem: '/images/bebidas/Guarana_Antarctica_2_Litros.jpg', preco: 12.90 },
    { id: 'bebida-05', categoria: 'Bebida', nome: 'Fanta Laranja Lata 350ml', descricao: 'Refrigerante sabor laranja, lata 350ml.', imagem: '/images/bebidas/Fanta_Laranja_Lata_350ml.jpg', preco: 5.50 },
    { id: 'bebida-06', categoria: 'Bebida', nome: 'Fanta Laranja 2 Litros', descricao: 'Refrigerante sabor laranja, garrafa 2 litros.', imagem: '/images/bebidas/Fanta_Laranja_2_Litros.png', preco: 12.90 },
    { id: 'bebida-07', categoria: 'Bebida', nome: 'Sprite Lata 350ml', descricao: 'Refrigerante sabor limão, lata 350ml.', imagem: '/images/bebidas/Sprite_Lata_350ml.jpg', preco: 5.50 },
    { id: 'bebida-08', categoria: 'Bebida', nome: 'Sprite 2 Litros', descricao: 'Refrigerante sabor limão, garrafa 2 litros.', imagem: '/images/bebidas/Sprite_2_Litros.jpg', preco: 12.90 },
    { id: 'bebida-09', categoria: 'Bebida', nome: 'Água Mineral sem Gás 500ml', descricao: 'Água mineral natural, garrafa 500ml.', imagem: '/images/bebidas/Agua_Mineral_sem_Gas_500ml.jpg', preco: 4.00 },
    { id: 'bebida-10', categoria: 'Bebida', nome: 'Água Mineral com Gás 500ml', descricao: 'Água mineral com gás, garrafa 500ml.', imagem: '/images/bebidas/Agua_Mineral_com_Gas_500ml.jpg', preco: 4.50 }
  ];

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cep') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5) + '-' + formattedValue.slice(5, 8);
      }
    }
    setAddress(prev => ({ ...prev, [name]: formattedValue }));

    if (name === 'cep') {
      const cepValue = formattedValue.replace(/\D/g, '');
      if (cepValue.length === 8) {
        setCepError('');
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
          if (response.data.erro) {
            setCepError('CEP não encontrado.');
            setAddress(prev => ({ ...prev, rua: '' }));
          } else {
            setAddress(prev => ({ ...prev, rua: response.data.logradouro || '' }));
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setCepError('Erro ao buscar CEP. Verifique a conexão.');
          setAddress(prev => ({ ...prev, rua: '' }));
        }
      } else if (cepValue.length > 0 && cepValue.length < 8) {
        setCepError('CEP incompleto.');
        setAddress(prev => ({ ...prev, rua: '' }));
      } else {
        setCepError('');
        setAddress(prev => ({ ...prev, rua: '' }));
      }
    }
  };

  const handleConfirmAddress = () => {
    if (address.cep && address.rua && address.numero && !cepError) {
      setBuscandoLojaCepModal(true);
      setLojaEncontradaCepModal(false);
      setTimeout(() => {
        setBuscandoLojaCepModal(false);
        setLojaEncontradaCepModal(true);
        setMensagemEntregaCepModal("40-60 minutos");
        setTimeout(() => {
          setShowModal(false);
          setLojaEncontradaCepModal(false);
        }, 2500);
      }, 10000);
    } else {
      alert('Por favor, preencha o CEP, Rua e Número corretamente.');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  
  const handleAddToCart = (item: CardapioItem) => {
    addItemToCart(item);
    setItemAddedToCart(item.id); // Define o ID do item para ativar a animação
    setTimeout(() => setItemAddedToCart(null), 1000); // Remove a animação após 1 segundo
  };

  const handleRemoveFromCart = (itemId: string) => removeItemFromCart(itemId);
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity > 0) updateCartQuantity(itemId, quantity); else handleRemoveFromCart(itemId);
  };
  const handleClearCart = () => { clearCart(); setShowCheckout(false); };
  
  const handleStartPromo = (e?: React.MouseEvent<HTMLElement>) => {
    if (e && (e.target as HTMLElement).closest(".promo-close-button")) {
      return;
    }
    setShowPromoBanner(false);
    setPromoCepStep(true);
  };

  const handleSelectPromoItem = (item: CardapioItem) => {
    if (promoStep === 1) {
      setSelectedPromoPizzas([{ ...item, promo: true }]);
      setPromoStep(2);
      alert("Primeira pizza selecionada! Agora escolha a segunda pizza grande (será gratuita).");
    } else if (promoStep === 2) {
      const primeiraPizza = selectedPromoPizzas[0];
      const segundaPizzaGratis = { ...item, preco: 0, nome: `${item.nome} (Promo Grátis)`, promo: true };
      handleAddToCart(primeiraPizza);
      handleAddToCart(segundaPizzaGratis);
      setSelectedPromoPizzas(prev => [...prev, item]);
      setPromoStep(3);
      alert("Segunda pizza adicionada (grátis)! Agora escolha seu broto doce.");
    } else if (promoStep === 3) {
      const brotoGratis = { ...item, preco: 0, nome: `${item.nome} (Promo Grátis)`, promo: true };
      handleAddToCart(brotoGratis);
      setPromoStep(4);
      alert("Broto doce adicionado! Promoção concluída. Finalizando pedido...");
      handleGoToCheckout(); 
    }
  };

  const handleGoToCheckout = () => setShowCheckout(true);

  const handlePixPaymentConfirm = () => {
    const total = getTotalCartPrice();
    const novoNumeroPedido = generateOrderReference();
    const tempoEntregaPadrao = "30-50 minutos";
    setPedidoInfo({ numero: novoNumeroPedido, tempoEstimado: mensagemEntregaCepModal || tempoEntregaPadrao, valor: total });
    setShowCheckout(false);
    setShowConfirmacao(true);
  };

  const handleEnderecoConfirmadoNoModal = (enderecoAtualizado: { rua: string; numero: string; complemento?: string; cep: string }) => {
    setAddress({
      cep: enderecoAtualizado.cep,
      rua: enderecoAtualizado.rua,
      numero: enderecoAtualizado.numero,
      complemento: enderecoAtualizado.complemento || ''
    });
    setMensagemEntregaCepModal(mensagemEntregaCepModal || "30-50 minutos"); 
  };

  const getFilteredCardapio = () => {
    let itensFiltrados = cardapio;

    if (promoStep === 1 || promoStep === 2) {
      // Na etapa 1 e 2 da promoção, mostrar apenas Pizzas Grandes
      itensFiltrados = cardapio.filter(item => item.categoria === 'Pizza');
    } else if (promoStep === 3) {
      // Na etapa 3 da promoção, mostrar apenas Brotos Doces
      itensFiltrados = cardapio.filter(item => item.categoria === 'Broto' && (item.nome.toLowerCase().includes('chocolate') || item.nome.toLowerCase().includes('doce de leite') || item.nome.toLowerCase().includes('romeu e julieta')));
    } else {
      // Fora da promoção ou após concluída, aplicar busca normal
      if (searchTerm) {
        itensFiltrados = cardapio.filter(item =>
          item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
    return itensFiltrados;
  };

  const filteredCardapio = getFilteredCardapio();

  const pizzasGrandes = filteredCardapio.filter(item => item.categoria === "Pizza");
  const esfirras = promoStep === 0 || promoStep >=4 ? filteredCardapio.filter(item => item.categoria === "Esfirra") : [];
  const brotos = (promoStep === 0 || promoStep >=4) ? filteredCardapio.filter(item => item.categoria === "Broto") : (promoStep === 3 ? filteredCardapio.filter(item => item.categoria === "Broto" && (item.nome.toLowerCase().includes('chocolate') || item.nome.toLowerCase().includes('doce de leite') || item.nome.toLowerCase().includes('romeu e julieta'))) : []);
  const bebidas = promoStep === 0 || promoStep >=4 ? filteredCardapio.filter(item => item.categoria === "Bebida") : [];


  const renderCardapioSection = (titulo: string, itens: CardapioItem[], categoriaPromo?: string) => {
    if (itens.length === 0) return null;
    return (
      <section id={titulo.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-700">{titulo}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {itens.map(item => {
            let promoBtnText = "Selecionar Promo";
            let promoBtnColor = "bg-yellow-500 hover:bg-yellow-600";
            if (promoStep === 1 && categoriaPromo === "Pizza" && item.categoria === "Pizza") {
              promoBtnText = "Escolher pizza paga";
              promoBtnColor = "bg-green-600 hover:bg-green-700";
            } else if (promoStep === 2 && categoriaPromo === "Pizza" && item.categoria === "Pizza") {
              promoBtnText = "Escolher pizza grátis";
              promoBtnColor = "bg-blue-600 hover:bg-blue-700";
            } else if (promoStep === 3 && categoriaPromo === "Broto" && item.categoria === "Broto" && (item.nome.toLowerCase().includes('chocolate') || item.nome.toLowerCase().includes('doce de leite') || item.nome.toLowerCase().includes('romeu e julieta'))) {
              promoBtnText = "Escolher broto doce grátis";
              promoBtnColor = "bg-purple-600 hover:bg-purple-700";
            }
            return (
              <div 
                key={item.id} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col ${itemAddedToCart === item.id ? 'animate-pulse-green' : ''}`}
              >
                <div className="relative w-full h-48">
                  <Image src={item.imagem} alt={item.nome} layout="fill" objectFit="cover" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.nome}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex-grow">{item.descricao}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold text-green-600">R$ {item.preco.toFixed(2).replace(".", ",")}</p>
                    {(promoStep === 1 && categoriaPromo === "Pizza" && item.categoria === "Pizza") || 
                     (promoStep === 2 && categoriaPromo === "Pizza" && item.categoria === "Pizza") || 
                     (promoStep === 3 && categoriaPromo === "Broto" && item.categoria === "Broto" && (item.nome.toLowerCase().includes('chocolate') || item.nome.toLowerCase().includes('doce de leite') || item.nome.toLowerCase().includes('romeu e julieta'))) ? (
                      <button 
                        onClick={() => handleSelectPromoItem(item)} 
                        className={`${promoBtnColor} text-white px-4 py-2 rounded-full transition-colors duration-300 shadow-md font-bold text-base`}
                      >
                        {promoBtnText}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(item)} 
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
                        disabled={promoStep > 0 && promoStep < 4}
                      >
                        Adicionar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-pizza-rain-blur"></div>
      
      {showPromoBanner && !promoCepStep && (
         <div 
          className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 bg-gradient-to-br from-yellow-400 via-red-500 to-orange-600 text-white p-4 sm:p-7 rounded-xl sm:rounded-2xl shadow-2xl z-50 cursor-pointer promo-banner-container transform hover:scale-105 transition-transform duration-300 max-w-xs sm:max-w-md border-2 sm:border-4 border-yellow-300 promo-banner-animated flex flex-col items-center"
          onClick={handleStartPromo}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setShowPromoBanner(false); }} 
            className="absolute -top-3 -right-3 bg-white text-red-600 rounded-full p-1.5 shadow-lg hover:bg-red-100 transition-colors text-2xl w-9 h-9 flex items-center justify-center border-2 border-red-400 promo-close-button"
            aria-label="Fechar banner de promoção"
          >
            &times;
          </button>
          <div className="flex flex-col items-center mb-4">
            <Image src="/images/logo_cartoon_pizza.jpg" alt="Super Pizza" width={70} height={70} className="w-12 h-12 sm:w-[70px] sm:h-[70px] rounded-full mb-2 border-4 border-white shadow-lg"/>
            <h3 className="text-lg sm:text-2xl font-extrabold drop-shadow-lg">SUPER PROMOÇÃO!</h3>
            <p className="text-xs sm:text-base font-medium text-yellow-100">Pizzas em Dobro + Broto Doce!</p>
          </div>
          <div className="bg-white/30 p-2 sm:p-3 rounded-xl mb-2 sm:mb-4 shadow">
            <p className="text-center text-base sm:text-lg font-bold text-yellow-900">Pague 1 Pizza Grande e Leve OUTRA + 1 Broto Doce <strong className="text-yellow-500">GRÁTIS!</strong></p>
          </div>
          <div className="flex justify-center mb-2 sm:mb-3">
            <Image src="/images/promocao_pizza.png" alt="Imagem da Promoção" width={180} height={180} className="w-20 h-20 sm:w-[180px] sm:h-[180px] rounded-xl shadow-xl border-2 border-yellow-200"/>
          </div>
          <p className="text-[10px] sm:text-xs text-center text-yellow-100 hover:text-white transition-colors font-semibold">Clique aqui para aproveitar esta oferta imperdível!</p>
        </div>
      )}

      {promoCepStep && promoStep === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[60] p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center relative">
            <button 
              onClick={() => { setPromoCepStep(false); setShowPromoBanner(true); }} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <Image src="/images/logo_cartoon_pizza.jpg" alt="Super Pizza Logo" width={100} height={100} className="mx-auto mb-4 rounded-full"/>
            <h2 className="text-2xl font-bold mb-4 text-red-700">Confirme seu CEP para a Promoção!</h2>
            <p className="mb-4 text-gray-700">Para participar da promoção "Pague 1 Leve 2 + Broto Grátis", precisamos confirmar se entregamos na sua região.</p>
            <input 
              type="text" 
              name="cep" 
              placeholder="Digite seu CEP (ex: 00000-000)" 
              value={address.cep} 
              onChange={handleAddressChange} 
              maxLength={9}
              className={`w-full p-3 border rounded mb-2 ${cepError ? "border-red-500" : "border-gray-300"} text-gray-800 placeholder-gray-500`}
            />
            {cepError && <p className="text-red-500 text-xs mb-3">{cepError}</p>}
            <input 
              type="text" 
              name="rua" 
              placeholder="Rua (automático após CEP válido)" 
              value={address.rua} 
              readOnly 
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 mb-2 text-gray-800 placeholder-gray-500"
            />
            <input 
              type="text" 
              name="numero" 
              placeholder="Número" 
              value={address.numero} 
              onChange={handleAddressChange} 
              className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-800 placeholder-gray-500"
            />
            <button 
              onClick={() => {
                if (address.cep && address.rua && address.numero && !cepError) {
                  setPromoStep(1);
                  alert("CEP confirmado! Agora escolha sua primeira pizza grande.");
                } else {
                  alert("Por favor, preencha CEP, Rua e Número corretamente.");
                }
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md text-lg font-semibold"
              disabled={!address.rua || !address.numero || !!cepError}
            >
              Confirmar e Iniciar Promoção
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[60] p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <Image src="/images/logo_cartoon_pizza.jpg" alt="Super Pizza Logo" width={150} height={150} className="mx-auto mb-6 rounded-full"/>
            <h2 className="text-3xl font-bold mb-6 text-red-700">Bem-vindo à Super Pizza!</h2>
            <p className="mb-4 text-gray-700">Para começar, por favor, informe seu CEP para verificarmos a área de entrega:</p>
            <input 
              type="text" 
              name="cep" 
              placeholder="Digite seu CEP (ex: 00000-000)" 
              value={address.cep} 
              onChange={handleAddressChange} 
              maxLength={9}
              className={`w-full p-3 border rounded mb-2 ${cepError ? "border-red-500" : "border-gray-300"} text-gray-800 placeholder-gray-500`}
            />
            {cepError && <p className="text-red-500 text-xs mb-3">{cepError}</p>}
            <input 
              type="text" 
              name="rua" 
              placeholder="Rua (será preenchida automaticamente)" 
              value={address.rua} 
              readOnly 
              className="w-full p-3 border border-gray-300 rounded bg-gray-100 mb-2 text-gray-800 placeholder-gray-500"
            />
            <input 
              type="text" 
              name="numero" 
              placeholder="Número" 
              value={address.numero} 
              onChange={handleAddressChange} 
              className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-800 placeholder-gray-500"
            />
            <button 
              onClick={handleConfirmAddress} 
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md text-lg font-semibold"
              disabled={!address.rua || !address.numero || !!cepError}
            >
              Verificar Entrega
            </button>
          </div>
        </div>
      )}

      {buscandoLojaCepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[70]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-red-600 font-semibold">Buscando loja para seu CEP...</p>
          </div>
        </div>
      )}

      {lojaEncontradaCepModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[70]">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Ótima notícia!</h3>
            <p className="text-gray-700">Entregamos no seu endereço.</p>
            <p className="text-gray-700">Tempo estimado: <strong className="text-green-600">{mensagemEntregaCepModal}</strong></p>
          </div>
        </div>
      )}

      <header className="bg-gradient-to-r from-red-700 via-red-600 to-yellow-400 text-white p-4 sm:p-8 shadow-xl sticky top-0 z-40 border-b-4 border-yellow-300">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center mb-4 sm:mb-0">
            <Image src="/images/logo_cartoon_pizza.jpg" alt="Super Pizza Logo" width={60} height={60} className="mr-3 sm:mr-5 rounded-full border-4 border-yellow-300 shadow-lg"/>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">Super Pizza</h1>
              <div className="text-xs sm:text-base mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                <span className="bg-yellow-200 text-red-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-semibold shadow">🍕 Mais de 100 pontos pelo Brasil</span>
                <span className="hidden sm:inline mx-2 text-yellow-300 font-bold">|</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full font-semibold shadow">🚀 Delivery rápido!</span>
              </div>
            </div>
          </div>
          <div className="flex items-center bg-green-500 px-3 sm:px-5 py-1 sm:py-2 rounded-full text-base sm:text-lg font-bold shadow-lg border-2 border-green-300 animate-pulse mt-2 sm:mt-0">
            <span className="mr-2">Status:</span>
            <span className="font-extrabold text-white">ABERTO</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-5 w-4 sm:w-5 ml-2 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="3" />
            </svg>
          </div>
        </div>
        <div className="container mx-auto mt-4 sm:mt-6">
          <input 
            type="text" 
            placeholder="Buscar no cardápio... (ex: Calabresa, Chocolate)" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-shadow duration-200 text-gray-800 shadow placeholder-gray-500 text-base sm:text-lg bg-white/90"
            disabled={promoStep > 0 && promoStep < 4}
          />
        </div>
      </header>

      <main className="container mx-auto p-2 sm:p-6">
        {promoStep > 0 && promoStep < 4 && (
          <div className="mb-8 p-4 rounded-xl bg-yellow-100 border-l-4 border-yellow-400 text-yellow-900 text-center text-lg font-semibold shadow">
            {promoStep === 1 && 'Escolha a pizza grande que você irá pagar!'}
            {promoStep === 2 && 'Agora escolha a pizza grande grátis!'}
            {promoStep === 3 && 'Agora escolha o broto doce grátis!'}
          </div>
        )}
        {(promoStep === 0 || promoStep >=4) && renderCardapioSection("Pizzas Grandes", pizzasGrandes, "Pizza")}
        {(promoStep === 1 || promoStep === 2) && renderCardapioSection("Escolha sua Pizza Grande da Promoção", pizzasGrandes, "Pizza")}
        {(promoStep === 0 || promoStep >=4) && renderCardapioSection("Esfirras", esfirras)}
        {(promoStep === 0 || promoStep >=4) && renderCardapioSection("Brotos Doces e Salgados", brotos, "Broto")}
        {promoStep === 3 && renderCardapioSection("Escolha seu Broto Doce da Promoção", brotos, "Broto")}
        {(promoStep === 0 || promoStep >=4) && renderCardapioSection("Bebidas", bebidas)}
        <AvaliacoesClientes />
        {!showModal && !lojaEncontradaCepModal && (
          <ComentarioPopup
            key={`comentario-popup-${String(!showModal)}`}
            comentarios={novosComentariosPopup}
            tempoVisivelSegundos={5}
            tempoIntervaloSegundos={7}
            delayInicialSegundos={5}
          />
        )}
      </main>

      {getTotalCartItems() > 0 && !showCheckout && (
        <button 
          onClick={handleGoToCheckout} 
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 z-30 transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {getTotalCartItems()}
          </span>
        </button>
      )}

      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4 pt-10">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-700">Seu Carrinho</h2>
              <button onClick={() => setShowCheckout(false)} className="text-gray-600 hover:text-gray-900 text-2xl">&times;</button>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-700 text-center py-4">Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <Image 
                        src={item.imagem || '/images/placeholder.jpg'} 
                        alt={item.nome} 
                        width={60} 
                        height={60} 
                        className="rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.nome}</h3>
                        <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantidade - 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                      <span className="px-3 font-semibold">{item.quantidade}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantidade + 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-semibold text-gray-800">Total:</p>
                  <p className="text-2xl font-bold text-green-600">R$ {getTotalCartPrice().toFixed(2).replace(".", ",")}</p>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={handleClearCart} 
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                  >
                    Limpar Carrinho
                  </button>
                  <button 
                    onClick={handlePixPaymentConfirm} 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
                  >
                    Finalizar com PIX
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showConfirmacao && (
        <ConfirmacaoPedido 
          pixCode={pixCode} 
          valorTotal={pedidoInfo.valor} 
          numeroPedido={pedidoInfo.numero} 
          tempoEstimado={pedidoInfo.tempoEstimado} 
          enderecoInicial={address} 
          onClose={() => {
            setShowConfirmacao(false);
            clearCart();
            setShowPromoBanner(true); 
            setPromoCepStep(false);
            setPromoStep(0);
            setSelectedPromoPizzas([]);
          }}
          onEnderecoConfirmado={handleEnderecoConfirmadoNoModal}
        />
      )}

      <footer className="bg-gray-800 text-white text-center p-4 sm:p-8 mt-8 sm:mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
            <div>
              <h5 className="text-xl font-semibold mb-3">Super Pizza</h5>
              <p className="text-gray-400 text-sm">A melhor pizza da cidade, entregue quentinha na sua casa! Experimente nossos sabores incríveis e promoções imperdíveis.</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-3">Links Úteis</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#pizzas-grandes" className="text-gray-400 hover:text-yellow-400 transition-colors">Pizzas</a></li>
                <li><a href="#esfirras" className="text-gray-400 hover:text-yellow-400 transition-colors">Esfirras</a></li>
                <li><a href="#brotos-doces-e-salgados" className="text-gray-400 hover:text-yellow-400 transition-colors">Brotos</a></li>
                <li><a href="#bebidas" className="text-gray-400 hover:text-yellow-400 transition-colors">Bebidas</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-3">Contato</h5>
              <p className="text-gray-400 text-sm">Telefone: (11) 7199-0664</p>
              <p className="text-gray-400 text-sm">Whatsapp: (11) 7199-0664</p>
              <p className="text-gray-400 text-sm">Endereço: pelo Brasil inteiro</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 sm:pt-8">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Super Pizza. Todos os direitos reservados.</p>
            <div className="mt-3">
              <Image src="/images/selo_ssl.jpeg" alt="Selo SSL" width={80} height={40} className="mx-auto" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

