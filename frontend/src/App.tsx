import { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import Catalog from './Catalog'; 
import AdminPanel from './AdminPanel'; 
import { Product } from './index'; 
export default function App() { 
const [products, setProducts] = useState<Product[]>([]); 
useEffect(() => { 
fetch('http:////localhost:3000/api/products').then(res => res.json()).then(data => setProducts(data)).catch(err => console.error('Erro:', err)); 
}, []); 
return ( <BrowserRouter> <Routes> <Route path='/' element={<Catalog products={products} />} /> <Route path='/admin' element={<AdminPanel products={products} setProducts={setProducts} />} /> <Route path='*' element={<Navigate to='/' replace />} /> </Routes> </BrowserRouter> ); }