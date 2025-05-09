export interface CardapioItem {
  id: string;
  categoria: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  promo?: boolean;
}

export interface CartItem extends CardapioItem {
  quantidade: number;
} 