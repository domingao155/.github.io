import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface ConfirmacaoPedidoProps {
  pixCode: { payload: string; base64: string };
  valorTotal: number;
  numeroPedido: string;
  tempoEstimado: string;
  enderecoInicial: { rua: string; numero: string; complemento?: string; cep: string };
  onClose: () => void;
  onEnderecoConfirmado?: (endereco: { rua: string; numero: string; complemento?: string; cep: string }) => void;
}

const ConfirmacaoPedido: React.FC<ConfirmacaoPedidoProps> = ({ 
  pixCode, 
  valorTotal, 
  numeroPedido, 
  tempoEstimado,
  enderecoInicial, 
  onClose, 
  onEnderecoConfirmado 
}) => {
  const [enderecoEditavel, setEnderecoEditavel] = useState(enderecoInicial);
  const [cepError, setCepError] = useState('');
  const [editandoEndereco, setEditandoEndereco] = useState(false);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let currentCepError = '';

    if (name === 'cep') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 5) {
        formattedValue = digits;
      } else {
        formattedValue = `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
      }

      setEnderecoEditavel(prev => ({ ...prev, [name]: formattedValue, rua: '', complemento: prev.complemento || '' }));

      if (formattedValue.length === 9) {
        if (!/^\d{5}-\d{3}$/.test(formattedValue)) {
          currentCepError = 'Formato de CEP inválido.';
        } else {
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${digits}/json/`);
            if (response.data.erro) {
              currentCepError = 'CEP não encontrado.';
              setEnderecoEditavel(prev => ({ ...prev, rua: ''}));
            } else {
              setEnderecoEditavel(prev => ({
                ...prev,
                rua: response.data.logradouro || '',
              }));
              currentCepError = '';
            }
          } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            currentCepError = 'Erro ao buscar CEP. Tente novamente.';
            setEnderecoEditavel(prev => ({ ...prev, rua: '' }));
          }
        }
      } else if (formattedValue.length > 0) {
        currentCepError = 'CEP incompleto.';
      } else {
        currentCepError = '';
      }
      setCepError(currentCepError);
      return;
    }

    setEnderecoEditavel(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmarEnderecoLocal = () => {
    if (!cepError && enderecoEditavel.rua && enderecoEditavel.numero) {
      setEditandoEndereco(false);
      if (onEnderecoConfirmado) {
        onEnderecoConfirmado(enderecoEditavel);
      }
    } else {
      alert("Por favor, preencha o CEP, Rua e Número corretamente.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-red-700">
          Pedido Confirmado!
        </h2>
        
        <p className="mb-2 text-gray-800">Seu pedido <strong className="text-red-700">#{numeroPedido}</strong> foi recebido.</p>
        
        <p className="mb-4 text-gray-800">Tempo estimado de entrega: <strong className="text-green-600">{tempoEstimado}</strong></p>

        <div className="mb-4 p-3 bg-gray-100 rounded text-gray-800 text-left">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">Endereço de Entrega:</h3>
            {!editandoEndereco && (
              <button 
                onClick={() => setEditandoEndereco(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Editar
              </button>
            )}
          </div>

          {editandoEndereco ? (
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">CEP:</label>
                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  maxLength={9}
                  className={`w-full p-2 border rounded ${cepError ? 'border-red-500' : 'border-gray-300'}`}
                  value={enderecoEditavel.cep}
                  onChange={handleAddressChange}
                />
                {cepError && <p className="text-red-500 text-xs mt-1">{cepError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rua:</label>
                <input
                  type="text"
                  name="rua"
                  placeholder="Av. Principal"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={enderecoEditavel.rua}
                  onChange={handleAddressChange}
                  disabled={!enderecoEditavel.cep || !!cepError || !/^\d{5}-\d{3}$/.test(enderecoEditavel.cep)}
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Número:</label>
                  <input
                    type="text"
                    name="numero"
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={enderecoEditavel.numero}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Complemento: <span className="text-gray-500">(Opcional)</span></label>
                  <input
                    type="text"
                    name="complemento"
                    placeholder="Apto 101"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={enderecoEditavel.complemento || ''}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <button 
                onClick={handleConfirmarEnderecoLocal}
                className="mt-2 w-full bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                disabled={!enderecoEditavel.rua || !enderecoEditavel.numero || !!cepError}
              >
                Confirmar Endereço
              </button>
            </div>
          ) : (
            <div>
              <p>{enderecoEditavel.rua}, {enderecoEditavel.numero} {enderecoEditavel.complemento || ''}</p>
              <p>CEP: {enderecoEditavel.cep}</p>
            </div>
          )}
        </div>

        <div className="mb-4 p-3 bg-yellow-100 rounded border border-yellow-300 text-yellow-900 text-center">
          <h3 className="font-semibold mb-2 text-yellow-800">Pagamento via PIX</h3>
          <p className="mb-2 text-yellow-900">Valor Total: <strong className="text-xl text-yellow-950">R$ {valorTotal.toFixed(2).replace('.', ',')}</strong></p>
          
          {pixCode.base64 && (
            <div className="flex justify-center mb-3">
              <Image 
                src={pixCode.base64.startsWith("/") ? pixCode.base64 : `data:image/png;base64,${pixCode.base64}`}
                alt="QR Code PIX" 
                width={180} 
                height={180} 
                unoptimized={pixCode.base64.startsWith("/")}
              />
            </div>
          )}
          
          <p className="text-sm mb-1 text-gray-700">Ou copie o código:</p>
          <div className="bg-gray-200 p-2 rounded break-all text-xs mb-3 text-gray-800">
            {pixCode.payload}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(pixCode.payload)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Copiar Código PIX
          </button>
        </div>

        <p className="text-sm text-gray-700">Aguardando confirmação do pagamento...</p>
      </div>
    </div>
  );
};

export default ConfirmacaoPedido;

