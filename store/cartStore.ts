import { create } from 'zustand';
import { CardapioItem, CartItem } from '../src/app/components/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CardapioItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantidade: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const currentItems = get().items;
    const existingItemIndex = currentItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex > -1) {
      // Item already exists, update quantity
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantidade += 1;
      set({ items: updatedItems });
    } else {
      // Add new item
      set({ items: [...currentItems, { ...item, quantidade: 1 }] });
    }
  },

  removeItem: (itemId) => {
    set({ items: get().items.filter((item) => item.id !== itemId) });
  },

  updateQuantity: (itemId, quantidade) => {
    if (quantidade <= 0) {
      // If quantity is 0 or less, remove the item
      get().removeItem(itemId);
    } else {
      set({ 
        items: get().items.map((item) => 
          item.id === itemId ? { ...item, quantidade } : item
        )
      });
    }
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantidade, 0);
  },

  getTotalPrice: () => {
    const items = get().items;
    // Verifica se a promoção "Pague 1 Leve 2 + Broto" está ativa usando o marcador 'promo'
    const promoItems = items.filter(item => item.promo === true);
    const nonPromoItems = items.filter(item => !item.promo);

    let promoIsValid = false;
    if (promoItems.length === 3) {
      const promoPizzas = promoItems.filter(item => item.categoria === 'Pizza' && item.nome.includes('Grande'));
      // Broto pode ser categoria 'Broto' ou a pizza doce 'pizza-20'
      const promoBroto = promoItems.find(item => item.categoria === 'Broto' || item.id === 'pizza-20');

      if (promoPizzas.length === 2 && promoBroto) {
        promoIsValid = true;
      }
    }

    // Calcula o preço total
    let total = 0;

    if (promoIsValid) {
      total += 69.99; // Adiciona o preço fixo da promoção
    } else {
      // Se a promoção não for válida, calcula o preço dos itens promocionais individualmente
      promoItems.forEach(item => {
        const price = typeof item.preco === 'number' ? item.preco : 0;
        const quantity = typeof item.quantidade === 'number' ? item.quantidade : 0;
        total += price * quantity;
      });
    }

    // Adiciona o preço dos itens não promocionais
    nonPromoItems.forEach(item => {
      const price = typeof item.preco === 'number' ? item.preco : 0;
      const quantity = typeof item.quantidade === 'number' ? item.quantidade : 0;
      total += price * quantity;
    });

    return total;
  },
}));

