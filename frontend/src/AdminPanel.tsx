import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, LayoutDashboard, Package, LogOut, Search, Edit, Trash2, Plus, X, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from './index';
import { COLORS, CATEGORIES, ITEMS_PER_PAGE } from './constants';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AdminPanel({ products, setProducts }: AdminPanelProps) {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products'>('dashboard');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', color: COLORS[1], event: CATEGORIES[1].name, subcategory: '', description: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [adminCurrentPage, setAdminCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filteredAdminProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  const adminTotalPages = Math.ceil(filteredAdminProducts.length / ITEMS_PER_PAGE);

  const paginatedAdminProducts = useMemo(() => {
    const safePage = Math.min(adminCurrentPage, Math.max(1, adminTotalPages));
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredAdminProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAdminProducts, adminCurrentPage, adminTotalPages]);

  useEffect(() => {
    setAdminCurrentPage(1);
  }, [searchQuery]);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;
    
    if (editingId !== null) {
      setProducts(products.map(p => p.id === editingId ? {
        ...p,
        name: newProduct.name,
        image: newProduct.image || 'https://images.unsplash.com/photo-1596460107916-430662021049?auto=format&fit=crop&q=80&w=400',
        color: newProduct.color,
        event: newProduct.event,
        subcategory: newProduct.subcategory,
        description: newProduct.description
      } : p));
      setEditingId(null);
    } else {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const productToAdd: Product = {
        id: newId,
        name: newProduct.name,
        image: newProduct.image || 'https://images.unsplash.com/photo-1596460107916-430662021049?auto=format&fit=crop&q=80&w=400',
        color: newProduct.color,
        event: newProduct.event,
        subcategory: newProduct.subcategory,
        description: newProduct.description,
        isAvailable: true
      };
      setProducts([productToAdd, ...products]);
    }
    
    setNewProduct({ name: '', image: '', color: COLORS[1], event: CATEGORIES[1].name, subcategory: '', description: '' });
  };

  const handleEditProduct = (p: Product) => {
    setEditingId(p.id);
    setNewProduct({
      name: p.name,
      image: p.image,
      color: p.color,
      event: p.event,
      subcategory: p.subcategory || '',
      description: p.description || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewProduct({ name: '', image: '', color: COLORS[1], event: CATEGORIES[1].name, subcategory: '', description: '' });
  };

  if (!isAdminAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fde1ee] p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full border border-[#6b1226]/10 text-center">
          <div className="w-16 h-16 bg-[#fde1ee] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#6b1226]" size={28} />
          </div>
          <h2 className="text-2xl font-serif text-[#6b1226] mb-2">Administração</h2>
          <p className="text-sm text-[#6b1226]/60 mb-6">Insira a senha para acessar o painel</p>
          
          <input 
            type="password" 
            value={adminPass} 
            onChange={e => setAdminPass(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && adminPass === 'admin123') setIsAdminAuth(true); }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6b1226] transition-colors mb-4 text-center tracking-widest"
            placeholder="••••••••"
          />
          
          <button 
            onClick={() => adminPass === 'admin123' ? setIsAdminAuth(true) : alert('Senha incorreta! (Dica: admin123)')}
            className="w-full py-3 bg-[#6b1226] text-[#fde1ee] rounded-lg font-medium hover:bg-[#8a1c36] transition-colors shadow-md"
          >
            Acessar Painel
          </button>
          
          <button 
            onClick={() => { navigate('/'); setAdminPass(''); }}
            className="mt-6 text-sm text-[#6b1226]/60 hover:text-[#6b1226] transition-colors flex items-center justify-center gap-2 w-full"
          >
            <ArrowLeft size={14} /> Voltar à loja
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between md:justify-center">
          <h2 className="font-serif text-2xl tracking-widest text-[#6b1226]">JF ADMIN</h2>
        <button 
          onClick={() => navigate('/')} 
          className="md:hidden text-gray-400 hover:text-[#6b1226]"
          aria-label="Fechar painel"
          title="Fechar"
        >
          <X />
        </button>
        </div>
        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          <button onClick={() => setAdminTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${adminTab === 'dashboard' ? 'bg-[#fde1ee] text-[#6b1226] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20} /> Disponibilidade
          </button>
          <button onClick={() => setAdminTab('products')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${adminTab === 'products' ? 'bg-[#fde1ee] text-[#6b1226] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Package size={20} /> Produtos
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => { setIsAdminAuth(false); navigate('/'); setAdminPass(''); }}
            className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
          >
            <LogOut size={20} /> Sair do Painel
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {adminTab === 'dashboard' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-serif text-gray-800">Controle de Disponibilidade</h1>
              <p className="text-gray-600">Gerencie quais peças estão visíveis no catálogo para os clientes.</p>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-gray-800">Catálogo Atual ({filteredAdminProducts.length} itens)</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Buscar peças..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors"
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {paginatedAdminProducts.map(p => (
                    <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-16 h-20 object-cover rounded shadow-sm border border-gray-200" />
                        <div>
                          <h4 className="font-serif text-lg text-gray-900 leading-tight mb-1">{p.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${p.isAvailable !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.isAvailable !== false ? 'Disponível' : 'Indisponível'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={async () => { const newStatus = p.isAvailable === false; try { await fetch('http://localhost:3000/api/products/' + p.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...p, isAvailable: newStatus }) }); setProducts(products.map(prod => prod.id === p.id ? { ...prod, isAvailable: newStatus } : prod)); } catch(e) { console.error(e); } }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-transparent ${p.isAvailable !== false ? 'text-gray-500 hover:text-red-600 hover:bg-red-50 hover:border-red-100' : 'text-gray-500 hover:text-green-600 hover:bg-green-50 hover:border-green-100'}`}
                      >
                        {p.isAvailable !== false ? <><EyeOff size={16}/> Ocultar</> : <><Eye size={16}/> Mostrar</>}
                      </button>
                    </div>
                  ))}
                </div>
                {adminTotalPages > 1 && (
                  <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setAdminCurrentPage(p => Math.max(1, p - 1))}
                      disabled={adminCurrentPage <= 1}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Anterior
                    </button>
                    <span className="text-gray-600 text-sm font-medium">
                      Página {Math.min(adminCurrentPage, Math.max(1, adminTotalPages))} de {adminTotalPages}
                    </span>
                    <button
                      onClick={() => setAdminCurrentPage(p => Math.min(adminTotalPages, p + 1))}
                      disabled={adminCurrentPage >= adminTotalPages}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {adminTab === 'products' && (
            <div className="space-y-8">
              <h1 className="text-3xl font-serif text-gray-800">Gerenciar Peças</h1>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-6 border-b border-gray-100 pb-4">
                  {editingId ? 'Editar Peça' : 'Adicionar Nova Peça'}
                </h3>
                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="productName" className="text-sm font-medium text-gray-700">Nome da Peça</label>
                    <input id="productName" required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors" placeholder="Ex: Vestido Seda" />
                  </div>
                  <div className="space-y-2 lg:col-span-3">
                    <label htmlFor="productDescription" className="text-sm font-medium text-gray-700">Descrição</label>
                    <textarea id="productDescription" rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors resize-none" placeholder="Detalhes da peça..." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="productImage" className="text-sm font-medium text-gray-700">Imagem (URL ou Arquivo)</label>
                    <div className="flex gap-2">
                      <input id="productImage" type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors" placeholder="Opcional. Ex: https://..." />
                      <label className="flex items-center justify-center px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                        Upload Local
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewProduct(prev => ({...prev, image: reader.result}));
                            };
                            reader.readAsDataURL(file);
                          }
                        }} />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="productColor" className="text-sm font-medium text-gray-700">Categoria (Cor)</label>
                    <select id="productColor" value={newProduct.color} onChange={e => setNewProduct({...newProduct, color: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors">
                      {COLORS.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="productEvent" className="text-sm font-medium text-gray-700">Categoria</label>
                    <select id="productEvent" value={newProduct.event} onChange={e => {
                      const event = e.target.value;
                      const cat = CATEGORIES.find(c => c.name === event);
                      setNewProduct({...newProduct, event, subcategory: cat?.subcategories ? cat.subcategories[1] : ''})
                    }} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors">
                      {CATEGORIES.filter(c => c.name !== 'Todos').map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  {CATEGORIES.find(c => c.name === newProduct.event)?.subcategories && (
                    <div className="space-y-2">
                      <label htmlFor="productSubcategory" className="text-sm font-medium text-gray-700">Subcategoria</label>
                      <select id="productSubcategory" value={newProduct.subcategory} onChange={e => setNewProduct({...newProduct, subcategory: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors">
                        {CATEGORIES.find(c => c.name === newProduct.event)?.subcategories?.filter(s => s !== 'Todos').map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  )}
                  <div className="flex items-end gap-2">
                    <button type="submit" className="flex-1 py-2.5 bg-[#6b1226] text-white rounded-lg font-medium hover:bg-[#8a1c36] transition-colors shadow-md flex items-center justify-center gap-2">
                      {editingId ? 'Salvar' : <><Plus size={18} /> Adicionar ao Catálogo</>}
                    </button>
                    {editingId && (
                      <button type="button" onClick={handleCancelEdit} className="py-2.5 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors shadow-sm">
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-gray-800">Catálogo Atual ({filteredAdminProducts.length} itens)</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Buscar peças..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors"
                    />
                  </div>
                </div>
                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {paginatedAdminProducts.map(p => (
                    <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-16 h-20 object-cover rounded shadow-sm border border-gray-200" />
                        <div>
                          <h4 className="font-serif text-lg text-gray-900 leading-tight mb-1">{p.name}</h4>
                          
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] uppercase font-bold">{p.color}</span>
                            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] uppercase font-bold">{p.event}</span>
                            {p.subcategory && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-[10px] uppercase font-bold">{p.subcategory}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="self-end sm:self-center flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(p)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                        >
                          <Edit size={16} /> Editar
                        </button>
                        <button 
                          onClick={() => {
                            setProducts(products.filter(prod => prod.id !== p.id));
                            if (editingId === p.id) handleCancelEdit();
                          }} 
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                          <Trash2 size={16} /> Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {adminTotalPages > 1 && (
                  <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setAdminCurrentPage(p => Math.max(1, p - 1))}
                      disabled={adminCurrentPage <= 1}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Anterior
                    </button>
                    <span className="text-gray-600 text-sm font-medium">
                      Página {Math.min(adminCurrentPage, Math.max(1, adminTotalPages))} de {adminTotalPages}
                    </span>
                    <button
                      onClick={() => setAdminCurrentPage(p => Math.min(adminTotalPages, p + 1))}
                      disabled={adminCurrentPage >= adminTotalPages}
                      className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors text-sm"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}