import React, { useState, useEffect, useRef } from 'react';

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
  tempoVisivelSegundos = 10,
  tempoIntervaloSegundos = 7,
  delayInicialSegundos = 5
}) => {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const dragThreshold = 80; // pixels para considerar swipe

  const visibilityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDelayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const tempoVisivelMs = tempoVisivelSegundos * 1000;
  const tempoIntervaloMs = tempoIntervaloSegundos * 1000;
  const delayInicialMs = delayInicialSegundos * 1000;

  useEffect(() => {
    if (comentarios.length === 0) {
      setVisivel(false);
      return;
    }

    const clearAllTimers = () => {
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (initialDelayTimerRef.current) {
        clearTimeout(initialDelayTimerRef.current);
        initialDelayTimerRef.current = null;
      }
    };

    const showNextComment = () => {
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

      if (document.hidden) {
        pauseTimerRef.current = setTimeout(() => showNextComment(), tempoIntervaloMs);
        return;
      }

      setAnimationClass('comentario-popup-enter-active');
      setVisivel(true);

      visibilityTimerRef.current = setTimeout(() => {
        setAnimationClass('comentario-popup-exit-active');

        animationTimerRef.current = setTimeout(() => {
          setVisivel(false);
          setIndiceAtual(prevIndice => (prevIndice + 1) % comentarios.length);

          pauseTimerRef.current = setTimeout(() => showNextComment(), tempoIntervaloMs);
        }, 500);
      }, tempoVisivelMs);
    };

    if (comentarios.length > 0 && !initialDelayTimerRef.current && !visivel) {
      initialDelayTimerRef.current = setTimeout(() => {
        initialDelayTimerRef.current = null;
        showNextComment();
      }, delayInicialMs);
    }

    const handleVisibilityChange = () => {
      clearAllTimers();
      if (!document.hidden) {
        initialDelayTimerRef.current = setTimeout(() => {
          initialDelayTimerRef.current = null;
          showNextComment();
        }, 200);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearAllTimers();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [comentarios, tempoVisivelMs, tempoIntervaloMs, delayInicialMs, visivel]);

  // Funções para swipe touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX !== null) {
      setDragDeltaX(e.touches[0].clientX - dragStartX);
    }
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragDeltaX) > dragThreshold) {
      // Força o pop-up a sumir imediatamente
      setAnimationClass('comentario-popup-exit-active');
      setTimeout(() => {
        setVisivel(false);
        setDragDeltaX(0);
        setDragStartX(null);
        setIndiceAtual(prevIndice => (prevIndice + 1) % comentarios.length);
      }, 300);
    } else {
      setDragDeltaX(0);
      setDragStartX(null);
    }
  };

  // Funções para swipe mouse (desktop)
  const [mouseDown, setMouseDown] = useState(false);
  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setDragStartX(e.clientX);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDown && dragStartX !== null) {
      setDragDeltaX(e.clientX - dragStartX);
    }
  };
  const handleMouseUp = () => {
    setMouseDown(false);
    if (Math.abs(dragDeltaX) > dragThreshold) {
      setAnimationClass('comentario-popup-exit-active');
      setTimeout(() => {
        setVisivel(false);
        setDragDeltaX(0);
        setDragStartX(null);
        setIndiceAtual(prevIndice => (prevIndice + 1) % comentarios.length);
      }, 300);
    } else {
      setDragDeltaX(0);
      setDragStartX(null);
    }
  };

  if (comentarios.length === 0 || !visivel) {
    return null;
  }

  const comentarioAtual = comentarios[indiceAtual % comentarios.length];

  return (
    <>
      <style jsx>{`
        .comentario-popup-base {
          position: fixed;
          left: 32px;
          bottom: 32px;
          min-width: 320px;
          max-width: 380px;
          background: rgba(255,255,255,0.97);
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          padding: 24px 28px 20px 24px;
          z-index: 1000;
          border: 2px solid #ffe066;
          transition: transform 0.5s, opacity 0.5s;
          font-size: 1.15rem;
        }
        .comentario-popup-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
        .comentario-popup-exit-active {
          opacity: 0;
          transform: translateY(40px);
        }
      `}</style>
      <div
        className={`comentario-popup-base ${animationClass}`}
        style={{ transform: dragDeltaX ? `translateX(${dragDeltaX}px)` : undefined }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <strong className="text-lg font-bold text-gray-800">{comentarioAtual.autor} disse:</strong>
        </div>
        <p className="text-base italic text-gray-700">&lsquo;{comentarioAtual.texto}&rsquo;</p>
      </div>
    </>
  );
};

export default ComentarioPopup;

