import Image from 'next/image';
import { CardapioItem } from './types';

interface Props {
  item: CardapioItem;
  onAddToCart: (item: CardapioItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  cartItemQuantity: number;
}

const CardapioItemCard: React.FC<Props> = ({ item, onAddToCart, onRemoveFromCart, cartItemQuantity }) => {
  const handleAddToCart = () => {
    onAddToCart(item);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(item.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-48">
        <Image src={item.imagem} alt={item.nome} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.nome}</h3>
        <p className="text-sm text-gray-600 mb-3">{item.descricao}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">R$ {item.preco.toFixed(2).replace('.', ',')}</p>
          {cartItemQuantity > 0 ? (
            <div className="flex items-center">
              <button 
                onClick={handleRemoveFromCart} 
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors duration-300"
              >
                -
              </button>
              <span className="mx-2 text-gray-700">{cartItemQuantity}</span>
              <button 
                onClick={handleAddToCart} 
                className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors duration-300"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart} 
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
            >
              Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardapioItemCard;
