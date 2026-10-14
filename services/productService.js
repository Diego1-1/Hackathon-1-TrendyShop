import { buscarJSON } from './apiServices.js';

export function getProducts() {
  return buscarJSON('/products');
}