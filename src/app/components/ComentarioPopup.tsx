import { useState, useEffect, useRef } from 'react';

interface Comentario {
  id: number;
  autor: string;
  texto: string;
}

interface ComentarioPopupProps {
  comentarios: Comentario[];
  tempoVisivelSegundos?: number;
  tempoIntervaloSegundos?: number;
  delayInicialSegundos?: number;
}

const ComentarioPopup: React.FC<ComentarioPopupProps> = ({
  comentarios,
  tempoVisivelSegundos = 10, // Padrão: 10 segundos visível
  tempoIntervaloSegundos = 7,  // Padrão: 7 segundos de intervalo
  delayInicialSegundos = 5    // Padrão: 5 segundos de delay inicial
}) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Refs para os timers
  const proximoComentarioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const esconderComentarioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animacaoSaidaTimerRef = useRef<NodeJS.Timeout | null>(null);
  const delayInicialTimerRef = useRef<NodeJS.Timeout | null>(null);

  const limparTodosOsTimers = () => {
    if (proximoComentarioTimerRef.current) clearTimeout(proximoComentarioTimerRef.current);
    if (esconderComentarioTimerRef.current) clearTimeout(esconderComentarioTimerRef.current);
    if (animacaoSaidaTimerRef.current) clearTimeout(animacaoSaidaTimerRef.current);
    if (delayInicialTimerRef.current) clearTimeout(delayInicialTimerRef.current);
  };

  useEffect(() => {
    if (comentarios.length === 0) {
      setVisivel(false);
      return;
    }

    limparTodosOsTimers(); // Limpa timers de execuções anteriores ou re-montagens

    let currentIndex = 0; // Usar uma variável local para o índice no ciclo

    const mostrarProximo = () => {
      setIndiceAtual(currentIndex);
      setAnimationClass('comentario-popup-enter-active');
      setVisivel(true);

      esconderComentarioTimerRef.current = setTimeout(() => {
        setAnimationClass('comentario-popup-exit-active');

        animacaoSaidaTimerRef.current = setTimeout(() => {
          setVisivel(false);
          // Prepara para o próximo comentário
          currentIndex = (currentIndex + 1) % comentarios.length;
          
          proximoComentarioTimerRef.current = setTimeout(() => {
            mostrarProximo();
          }, tempoIntervaloSegundos * 1000);
        }, 500); // Duração da animação de saída (0.5s - deve corresponder ao CSS)

      }, tempoVisivelSegundos * 1000);
    };

    // Delay inicial antes do primeiro popup
    delayInicialTimerRef.current = setTimeout(() => {
      mostrarProximo();
    }, delayInicialSegundos * 1000);

    // Função de limpeza para desmontagem do componente
    return () => {
      limparTodosOsTimers();
    };
  // As dependências são apenas os comentários e os tempos. 
  // Isso garante que o ciclo reinicie se essas props mudarem, mas não por mudanças de estado internas.
  }, [comentarios, tempoVisivelSegundos, tempoIntervaloSegundos, delayInicialSegundos]);

  if (comentarios.length === 0 || !visivel) {
    return null;
  }

  // O componente usa o estado `indiceAtual` para renderizar, que é atualizado por `currentIndex`.
  const comentarioAtual = comentarios[indiceAtual];

  return (
    <div 
      className={`comentario-popup-base ${animationClass}`}
    >
      <div className="flex items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <strong className="text-md font-semibold">{comentarioAtual?.autor} disse:</strong>
      </div>
      <p className="text-sm italic">"{comentarioAtual?.texto}"</p>
    </div>
  );
};

export default ComentarioPopup;

