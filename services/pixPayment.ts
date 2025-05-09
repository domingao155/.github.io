// Simulação de integração com sistema de pagamento PIX
// Em um ambiente real, isso seria substituído por uma API de pagamento

export interface PaymentInfo {
  qrCodeUrl: string;
  pixCopiaECola: string;
  valor: number;
  status: 'pendente' | 'pago' | 'cancelado';
  referencia: string;
}

// Função para gerar um código aleatório para o PIX Copia e Cola
const generateRandomPixCode = (length: number = 40): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Função para gerar um número de referência para o pedido
export const generateOrderReference = (): string => { // Exportar a função
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `PP${year}${month}${day}${random}`;
};

// Função para gerar uma URL de QR Code fictícia
// Em um ambiente real, isso seria gerado por uma API de pagamento
const generateQrCodeUrl = (valor: number, referencia: string): string => {
  // Simulação - em um ambiente real, isso seria uma URL válida para uma imagem de QR code
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PIX:${valor}:${referencia}`;
};

// Função principal para criar um pagamento PIX
export const createPixPayment = async (valor: number): Promise<PaymentInfo> => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const referencia = generateOrderReference();
  const pixCopiaECola = generateRandomPixCode();
  const qrCodeUrl = generateQrCodeUrl(valor, referencia);
  
  return {
    qrCodeUrl,
    pixCopiaECola,
    valor,
    status: 'pendente',
    referencia
  };
};

// Função para verificar o status de um pagamento
// Em um ambiente real, isso consultaria uma API para verificar se o pagamento foi recebido
export const checkPaymentStatus = async (referencia: string): Promise<'pendente' | 'pago' | 'cancelado'> => {
  // Simula um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Para fins de demonstração, vamos simular que o pagamento foi recebido
  // Em um ambiente real, isso consultaria o status real do pagamento
  return 'pago';
};
