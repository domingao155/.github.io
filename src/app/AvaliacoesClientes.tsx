import React from 'react';
import Image from 'next/image';

interface Avaliacao {
  id: number;
  nome: string;
  nota: number;
  comentario: string;
  imagem?: string;
}

const avaliacoesFicticias: Avaliacao[] = [
  {
    id: 1,
    nome: "Laysa",
    nota: 4.9,
    comentario: "A pizza é incrível, super crocante e bem recheada! Adoro as pizzas dessa loja.",
    imagem: "/images/Pizza Grande Mussarela.jpg"
  },
  {
    id: 2,
    nome: "Nadia",
    nota: 4.8,
    comentario: "Os sabores de pizza são deliciosos, e a massa tem o tempero perfeito. Super recomendo!",
    imagem: "/images/Pizza Grande Calabresa.jpg"
  },
  {
    id: 3,
    nome: "Aline",
    nota: 5.0,
    comentario: "A pizza de frango é maravilhosa, e a entrega sempre fresquinha. Melhor lugar para pedir pizza!",
    imagem: "/images/Pizza Grande Frango com Catupiry.jpg"
  },
  {
    id: 4,
    nome: "Kamilly",
    nota: 4.8,
    comentario: "Comprei para uma festa e todos amaram! Pizza e esfirra são demais.",
    imagem: "/images/Pizza Grande Portuguesa.jpg"
  },
  {
    id: 5,
    nome: "Karol",
    nota: 4.9,
    comentario: "Adoro a pizza de queijo e a de calabresa. Sabor caseiro e sempre fresquinho!",
    imagem: "/images/Pizza Grande Quatro Queijos.jpg"
  },
  {
    id: 6,
    nome: "Talita",
    nota: 4.7,
    comentario: "Massa leve e crocante, e o recheio é sensacional. Sempre volto!",
    imagem: "/images/Pizza Grande Marguerita.jpg"
  },
  {
    id: 7,
    nome: "Aline B.",
    nota: 4.8,
    comentario: "Bom, barato e entrega rápida. Não tem erro, semana que vem peço de novo.",
    imagem: "/images/Pizza Grande Pepperoni.jpg"
  },
  {
    id: 8,
    nome: "Iana",
    nota: 4.9,
    comentario: "Pedi pela primeira vez e todo mundo gostou, vamos pedir mais!",
    imagem: "/images/Pizza Grande Bacon.jpg"
  },
  {
    id: 9,
    nome: "Gustavo",
    nota: 5.0,
    comentario: "A melhor pizza da cidade! Sempre crocante e bem recheada.",
    imagem: "/images/Pizza Grande Milho.jpg"
  },
  {
    id: 10,
    nome: "Iana L.",
    nota: 4.8,
    comentario: "Pizzas frescas e saborosas. A de carne seca é top!",
    imagem: "/images/Pizza Grande Carne Seca.jpg"
  },
  {
    id: 11,
    nome: "Mari",
    nota: 4.9,
    comentario: "Adoro as pizzas dessa loja! Sempre fresquinhos e com sabor de casa.",
    imagem: "/images/Pizza Grande Palmito.jpg"
  },
  {
    id: 12,
    nome: "Ana",
    nota: 4.7,
    comentario: "Primeira vez aqui e amei! A pizza é super gostosa, e o atendimento é ótimo.",
    imagem: "/images/Pizza Grande Vegetariana.jpg"
  }
];

const Estrelas = ({ nota }: { nota: number }) => {
  const estrelasCheias = Math.floor(nota);
  const temMeiaEstrela = nota % 1 !== 0;
  const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {[...Array(estrelasCheias)].map((_, i) => <span key={`full-${i}`}>★</span>)}
      {temMeiaEstrela && <span key="half">☆</span>}
      {[...Array(estrelasVazias)].map((_, i) => <span key={`empty-${i}`} className="text-gray-300">☆</span>)}
    </div>
  );
};

const AvaliacoesClientes: React.FC = () => {
  const notaMedia = (avaliacoesFicticias.reduce((acc, curr) => acc + curr.nota, 0) / avaliacoesFicticias.length).toFixed(1);
  const totalAvaliacoes = avaliacoesFicticias.length;

  return (
    <div className="container mx-auto px-4 py-12 bg-white rounded-lg shadow-md my-12">
      <h2 className="text-3xl font-bold text-center mb-4 text-red-700">Avaliações dos Clientes</h2>
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-2">
          <span className="text-4xl font-bold mr-2 text-gray-800">{notaMedia}</span>
          <Estrelas nota={parseFloat(notaMedia)} />
        </div>
        <p className="text-gray-600">{totalAvaliacoes} avaliações</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avaliacoesFicticias.map((avaliacao) => (
          <div key={avaliacao.id} className="border rounded-lg p-4 flex items-start space-x-4 bg-gray-50 shadow-sm">
            {avaliacao.imagem && (
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 relative">
                <Image 
                  src={avaliacao.imagem} 
                  alt={`Avaliação de ${avaliacao.nome}`} 
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{avaliacao.nome}</h3>
              <div className="flex items-center mb-2">
                <span className="font-bold mr-1 text-gray-700">{avaliacao.nota.toFixed(1)}</span>
                <Estrelas nota={avaliacao.nota} />
              </div>
              <p className="text-gray-600 text-sm">{avaliacao.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvaliacoesClientes;

