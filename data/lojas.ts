// Mock data for store locations - replace with actual data and logic later
// For simplicity, we associate stores directly with city IDs used in cidades.ts

interface Loja {
  id: string;
  nome: string;
  cidadeId: string; // Matches the ID in cidades.ts
  endereco: string;
  // Add latitude/longitude in a real application for distance calculation
  // lat: number;
  // lon: number;
}

export const lojas: Loja[] = [
  // RJ
  { id: 'loja-rj-01', nome: 'Pizza Pizza - Copacabana', cidadeId: 'RJ', endereco: 'Av. Atlântica, 1702' },
  { id: 'loja-rj-02', nome: 'Pizza Pizza - Barra', cidadeId: 'RJ', endereco: 'Av. das Américas, 4666' },
  { id: 'loja-nt-01', nome: 'Pizza Pizza - Icaraí', cidadeId: 'NT', endereco: 'R. Gavião Peixoto, 100' },
  { id: 'loja-sg-01', nome: 'Pizza Pizza - Centro SG', cidadeId: 'SG', endereco: 'R. Dr. Nilo Peçanha, 56' },
  { id: 'loja-dc-01', nome: 'Pizza Pizza - Caxias Centro', cidadeId: 'DC', endereco: 'Av. Gov. Leonel de Moura Brizola, 1898' },
  { id: 'loja-ni-01', nome: 'Pizza Pizza - Centro NI', cidadeId: 'NI', endereco: 'Av. Mal. Floriano Peixoto, 2023' },
  { id: 'loja-ar-01', nome: 'Pizza Pizza - Centro Angra', cidadeId: 'AR', endereco: 'R. do Comércio, 150' }, // Store in Angra based on reference interaction

  // SP
  { id: 'loja-sp-01', nome: 'Pizza Pizza - Paulista', cidadeId: 'SP', endereco: 'Av. Paulista, 1000' },
  { id: 'loja-sp-02', nome: 'Pizza Pizza - Pinheiros', cidadeId: 'SP', endereco: 'R. dos Pinheiros, 500' },
  { id: 'loja-cp-01', nome: 'Pizza Pizza - Cambuí', cidadeId: 'CP', endereco: 'R. Cel. Quirino, 999' },
  { id: 'loja-gr-01', nome: 'Pizza Pizza - Centro GR', cidadeId: 'GR', endereco: 'R. Dom Pedro II, 178' },

  // Add more stores for other cities/states as needed
  { id: 'loja-bh-01', nome: 'Pizza Pizza - Savassi', cidadeId: 'BH', endereco: 'R. Fernandes Tourinho, 500' },
  { id: 'loja-sl-01', nome: 'Pizza Pizza - Pituba', cidadeId: 'SL', endereco: 'Av. Octávio Mangabeira, 1234' }, // Salvador (BA)
  { id: 'loja-ft-01', nome: 'Pizza Pizza - Aldeota', cidadeId: 'FT', endereco: 'Av. Santos Dumont, 2000' }, // Fortaleza (CE)
];

// Function to simulate finding the nearest store
// In a real app, this would involve geolocation and distance calculation
export const findNearestStore = (cidadeId: string): { store: Loja | null, distance: number | null } => {
  const storesInCity = lojas.filter(loja => loja.cidadeId === cidadeId);

  if (storesInCity.length > 0) {
    // Simulate finding the 'nearest' one and calculate a random distance < 5km
    const nearestStore = storesInCity[0]; // Just pick the first one for simulation
    const distance = parseFloat((Math.random() * 4 + 0.5).toFixed(1)); // Random distance 0.5km to 4.5km
    return { store: nearestStore, distance };
  } else {
    return { store: null, distance: null };
  }
};

