import { Category } from './index';

export const WHATSAPP_NUMBER = "5599982240000"; // Substitua pelo número real
export const ITEMS_PER_PAGE = 12;

export const CATEGORIES: Category[] = [
  { name: 'Todos' },
  { name: 'Vestidos de festa' },
  { name: 'Noiva civil', subcategories: ['Todos', 'curtos', 'longos'] },
  { name: 'Noiva', subcategories: ['Todos', 'Princesa tradicional', 'Sereia tradicional', 'Boho', 'minimalista'] },
  { name: '15 anos', subcategories: ['Todos', 'longos', 'curtos'] },
  { name: 'Acessórios', subcategories: ['Todos', 'coroa noiva', 'véu noiva', 'Robe de noiva', 'Bolsa festa'] }
];

export const COLORS = [
  'Todos',
  'Vermelho',
  'Verde - tons escuros',
  'Verde - tons claros',
  'Azul - tons escuros',
  'azul - tons claros',
  'Marsala',
  'Pink - Fucsia',
  'Rosa - tons claros',
  'lilás -roxo',
  'amarelo',
  'dourado - tons nude',
  'Terracota - marrom',
  'preto - prata',
  'salmão - coral'
];

