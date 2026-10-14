const URL_API = 'https://fakestoreapi.com';

export async function buscarJSON(endpoint) {
  const response = await fetch(`${URL_API}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener los datos`);
  }
  return response.json();
}