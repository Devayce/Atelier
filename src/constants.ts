import { Category, Product } from './index';

export const WHATSAPP_NUMBER = "5511999999999"; // Substitua pelo número real
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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Vestido Seda Minimal',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    color: 'dourado - tons nude',
    event: 'Vestidos de festa',
    description: 'Uma peça exclusiva e fluida, desenhada para destacar sua beleza natural com um toque minimalista perfeito para festas.'
  },
  {
    id: 2,
    name: 'Vestido Noiva Civil Curto',
    image: 'https://images.unsplash.com/photo-1591369822096-11115560126a?auto=format&fit=crop&q=80&w=800',
    color: 'dourado - tons nude',
    event: 'Noiva civil',
    subcategory: 'curtos',
    description: 'Alfaiataria impecável que transmite confiança e poder, ideal para o ambiente de trabalho contemporâneo.'
  },
  {
    id: 3,
    name: 'Vestido Noiva Princesa',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
    color: 'dourado - tons nude',
    event: 'Noiva',
    subcategory: 'Princesa tradicional',
    description: 'Corte reto e sofisticado. A calça de alfaiataria que acompanha você em reuniões importantes e eventos executivos.'
  },
  {
    id: 4,
    name: 'Vestido 15 Anos Longo',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&q=80&w=800',
    color: 'Azul - tons escuros',
    event: '15 anos',
    subcategory: 'longos',
    description: 'Leveza e frescor para dias quentes. O linho puro proporciona uma estética casual chic indispensável.'
  },
  {
    id: 5,
    name: 'Coroa de Noiva',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800',
    color: 'preto - prata',
    event: 'Acessórios',
    subcategory: 'coroa noiva',
    description: 'O luxo do inverno em uma peça estruturada que garante proteção e extrema elegância para noites frias.'
  },
  {
    id: 6,
    name: 'Vestido Boho Chic',
    image: 'https://images.unsplash.com/photo-1583496924823-3b47c09e3a7a?auto=format&fit=crop&q=80&w=800',
    color: 'Terracota - marrom',
    event: 'Noiva',
    subcategory: 'Boho',
    description: 'Movimento e delicadeza no clássico plissado midi, excelente para passeios diurnos e ocasiões informais.'
  },
  {
    id: 7,
    name: 'Vestido Longo Madrinha',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    color: 'Verde - tons escuros',
    event: 'Vestidos de festa',
    description: 'Alegria e cores vibrantes em uma modelagem fluida, criando o equilíbrio perfeito entre o elegante e o descontraído.'
  },
  {
    id: 8,
    name: 'Vestido Sereia',
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800',
    color: 'dourado - tons nude',
    event: 'Noiva',
    subcategory: 'Sereia tradicional',
    description: 'Praticidade sem perder o charme. O macacão pantalona branco é a escolha perfeita para eventos de prestígio.'
  },
  {
    id: 9,
    name: 'Véu de Noiva',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800',
    color: 'dourado - tons nude',
    event: 'Acessórios',
    subcategory: 'véu noiva',
    description: 'Design moderno em tricot artesanal, pensado para compor looks casuais cheios de personalidade.'
  }
];

export const ORDERS = [
  { id: '1023', client: 'Maria Silva', date: '05 Jun 2026', total: 'R$ 890,00', status: 'Aprovado' },
  { id: '1024', client: 'Ana Clara', date: '04 Jun 2026', total: 'R$ 1.450,00', status: 'Pendente' }
];