import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Catalog from './components/Catalog';
import AdminPanel from './components/AdminPanel';
import { Product } from './types';
import { INITIAL_PRODUCTS } from './utils/constants';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog products={products} />} />
        <Route path="/admin" element={<AdminPanel products={products} setProducts={setProducts} />} />
        {/* Redireciona qualquer rota inválida para o catálogo */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}