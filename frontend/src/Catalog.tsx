import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, MessageCircle, X, ChevronDown, Palette, Sparkles, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from './index';
import { CATEGORIES, COLORS, ITEMS_PER_PAGE, WHATSAPP_NUMBER } from './constants';

interface CatalogProps {
  products: Product[];
}

export default function Catalog({ products }: CatalogProps) {
  const [showCatalog, setShowCatalog] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const availableSubcategories = useMemo(() => {
    const subs = CATEGORIES.filter(c => selectedEvents.includes(c.name))
      .flatMap(c => c.subcategories || [])
      .filter(s => s !== 'Todos');
    return Array.from(new Set(subs));
  }, [selectedEvents]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchColor = selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchEvent = selectedEvents.length === 0 || selectedEvents.includes(product.event);
      
      let matchSub = true;
      const cat = CATEGORIES.find(c => c.name === product.event);
      if (cat?.subcategories && selectedSubcategories.length > 0) {
        const catHasSelectedSub = cat.subcategories.some(s => selectedSubcategories.includes(s));
        if (catHasSelectedSub) {
          matchSub = product.subcategory ? selectedSubcategories.includes(product.subcategory) : false;
        }
      }

      return matchColor && matchEvent && matchSub;
    });
  }, [products, selectedColors, selectedEvents, selectedSubcategories]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const safePage = Math.min(currentPage, Math.max(1, totalPages));
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedColors, selectedEvents, selectedSubcategories]);

  const handleAccessClick = () => {
    setIsExploding(true);
    setTimeout(() => {
      setShowCatalog(true);
    }, 600);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fde1ee]">
      {/* --- TELA DE ABERTURA --- */}
      <AnimatePresence>
        {!showCatalog && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center py-12 px-6 bg-[#fde1ee]"
          >
            <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 md:gap-10">
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/logo.jpeg" 
                alt="Ju Franco Atelier" 
                className="w-full max-w-[85vw] sm:max-w-md md:max-w-2xl max-h-[60vh] object-contain"
                
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596460107916-430662021049?auto=format&fit=crop&q=80&w=400';
                }}
              />

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }} className="flex-none flex flex-col items-center relative">
                <motion.button
                  whileHover={{ scale: 1.05, letterSpacing: '4px' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccessClick}
                  className="relative z-20 px-8 md:px-14 py-3 md:py-4 border border-[#6b1226] bg-[#fde1ee] text-[#6b1226] font-serif tracking-[2px] uppercase text-sm transition-all hover:bg-[#6b1226] hover:text-[#fde1ee] duration-300 shadow-xl"
                >
                  <span className="font-bold" style={{ textShadow: "0px 0px 12px rgba(107, 18, 38, 0.6), 0px 0px 24px rgba(107, 18, 38, 0.3)" }}>
                    Acessar Coleção
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isExploding && [...Array(30)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ opacity: 0, x: (Math.random() - 0.5) * 600, y: (Math.random() - 0.5) * 600, scale: Math.random() * 2 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute z-10 w-2 h-2 rounded-full bg-[#6b1226]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 10px #6b1226' }} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CATÁLOGO PRINCIPAL --- */}
      <motion.div initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }} animate={{ opacity: showCatalog ? 1 : 0, scale: showCatalog ? 1 : 1.05, filter: showCatalog ? 'blur(0px)' : 'blur(10px)', pointerEvents: showCatalog ? 'auto' : 'none' }} transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: showCatalog ? 0.3 : 0 }} className="absolute inset-0 z-40 overflow-y-auto bg-[#fde1ee] scroll-smooth">
        <header className="sticky top-0 z-30 w-full px-6 py-5 bg-[#fde1ee]/90 backdrop-blur-md border-b border-[#6b1226]/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#6b1226] hover:scale-110 transition-transform">
              <Instagram size={22} strokeWidth={1.5} />
            </a>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-[0.2em] text-[#6b1226] absolute left-1/2 -translate-x-1/2">JF</h1>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} className="text-center py-20 md:py-28 px-4">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#6b1226] mb-8 leading-tight" style={{ textShadow: "2px 4px 6px rgba(107, 18, 38, 0.4), 0 0 30px rgba(107, 18, 38, 0.5), 0 0 60px rgba(107, 18, 38, 0.3)" }}>
              A Essência da<br />Elegância Atemporal
            </h2>
            <p className="font-sans text-base md:text-lg text-[#6b1226]/80 max-w-2xl mx-auto leading-relaxed">
              Cada peça é cuidadosamente desenhada para realçar a sua essência. 
              Descubra a harmonia perfeita entre conforto, confiança e sofisticação para o seu dia a dia.
            </p>
            <div className="w-12 h-[1px] bg-[#6b1226]/30 mx-auto mt-12 mb-12"></div>
          </motion.div>

          {/* Filtros */}
          <div className="flex flex-col items-center gap-4 mb-16 px-4">
            <div className="flex flex-row flex-wrap items-center justify-center gap-6">
            <div className="relative z-20">
              <button onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)} className="flex items-center gap-2 px-4 py-2 border border-[#6b1226]/20 bg-white/50 hover:bg-white text-[#6b1226] rounded-md transition-colors">
                <Palette size={16} strokeWidth={1.5} />
                <span className="font-serif text-sm uppercase tracking-widest font-bold">Cor: {selectedColors.length === 0 ? 'Todas' : selectedColors.length === 1 ? selectedColors[0] : `${selectedColors.length} selecionadas`}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isColorDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isColorDropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setIsColorDropdownOpen(false)} style={{ zIndex: -1 }} />
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 left-0 w-56 bg-white border border-[#6b1226]/10 rounded-md shadow-xl z-20 py-2 max-h-64 overflow-y-auto">
                      {COLORS.map(color => {
                        const isSelected = color === 'Todos' ? selectedColors.length === 0 : selectedColors.includes(color);
                        return (
                          <button key={color} onClick={() => { if (color === 'Todos') setSelectedColors([]); else setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#fde1ee] transition-colors flex items-center justify-between ${isSelected ? 'bg-[#fde1ee] font-bold' : ''}`}>
                            {color} {isSelected && color !== 'Todos' && <X size={14} className="text-[#6b1226]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="relative z-20">
              <button onClick={() => setIsEventDropdownOpen(!isEventDropdownOpen)} className="flex items-center gap-2 px-4 py-2 border border-[#6b1226]/20 bg-white/50 hover:bg-white text-[#6b1226] rounded-md transition-colors">
                <Sparkles size={16} strokeWidth={1.5} />
                <span className="font-serif text-sm uppercase tracking-widest font-bold">Categoria: {selectedEvents.length === 0 ? 'Todas' : selectedEvents.length === 1 ? selectedEvents[0] : `${selectedEvents.length} selecionadas`}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isEventDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isEventDropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setIsEventDropdownOpen(false)} style={{ zIndex: -1 }} />
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full mt-2 left-0 w-64 bg-white border border-[#6b1226]/10 rounded-md shadow-xl z-20 py-2 max-h-64 overflow-y-auto">
                      {CATEGORIES.map(category => {
                        const isSelected = category.name === 'Todos' ? selectedEvents.length === 0 : selectedEvents.includes(category.name);
                        return (
                          <button key={category.name} onClick={() => { if (category.name === 'Todos') { setSelectedEvents([]); setSelectedSubcategories([]); } else { setSelectedEvents(prev => prev.includes(category.name) ? prev.filter(c => c !== category.name) : [...prev, category.name]); } }} className={`w-full text-left px-4 py-2 text-sm hover:bg-[#fde1ee] transition-colors flex items-center justify-between ${isSelected ? 'bg-[#fde1ee] font-bold' : ''}`}>
                            {category.name} {isSelected && category.name !== 'Todos' && <X size={14} className="text-[#6b1226]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            </div>
            <AnimatePresence>
              {availableSubcategories.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-row flex-wrap items-center justify-center gap-2 mt-2">
                  {availableSubcategories.map(sub => {
                    const isSelected = selectedSubcategories.includes(sub);
                    return (
                      <button key={sub} onClick={() => { setSelectedSubcategories(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]) }} className={`px-4 py-1.5 text-xs font-serif uppercase tracking-wider rounded-full transition-colors border flex items-center gap-1 ${isSelected ? 'bg-[#6b1226] text-white border-[#6b1226]' : 'bg-white/60 text-[#6b1226] border-[#6b1226]/20 hover:bg-white'}`}>
                        {sub} {isSelected && <X size={12} />}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grid de Produtos */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6b1226]/60 font-serif text-xl">Nenhuma peça encontrada para os filtros selecionados.</p>
              <button onClick={() => { setSelectedColors([]); setSelectedEvents([]); setSelectedSubcategories([]); }} className="mt-6 px-6 py-2 border border-[#6b1226] text-[#6b1226] hover:bg-[#6b1226] hover:text-[#fde1ee] transition-colors text-sm uppercase tracking-wider">Limpar Filtros</button>
            </div>
          ) : (
            <>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20" initial="hidden" animate={showCatalog ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.8 } }, hidden: {} }}>
                {paginatedProducts.map((product) => (
                  <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="group flex flex-col">
                    <div className="overflow-hidden bg-white mb-6 aspect-[3/4] relative rounded-xl shadow-md border border-[#6b1226]/5 group-hover:shadow-2xl group-hover:border-[#6b1226]/20 transition-all duration-500">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#6b1226]/40 via-[#6b1226]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#6b1226] text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{product.color}</span>
                        <span className="px-3 py-1 bg-[#6b1226]/90 backdrop-blur-sm text-[#fde1ee] text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{product.event}</span>
                        {product.subcategory && <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#6b1226] text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{product.subcategory}</span>}
                      </div>
                    </div>
                    <h3 className="font-serif text-xl text-[#6b1226] mb-1">{product.name}</h3>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setViewingProduct(product)} className="w-full bg-[#6b1226] text-[#fde1ee] py-3 rounded-md text-xs tracking-wider uppercase font-medium hover:bg-[#8a1c36] hover:shadow-lg transition-all">Ver Detalhes</button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-[#6b1226]/20 text-[#6b1226] rounded-md disabled:opacity-50 hover:bg-white transition-colors font-serif text-sm uppercase tracking-wider">Anterior</button>
                  <span className="font-serif text-[#6b1226] text-sm font-medium">Página {Math.min(currentPage, Math.max(1, totalPages))} de {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-[#6b1226]/20 text-[#6b1226] rounded-md disabled:opacity-50 hover:bg-white transition-colors font-serif text-sm uppercase tracking-wider">Próxima</button>
                </div>
              )}
            </>
          )}
        </main>
        
        <footer className="w-full py-16 border-t border-[#6b1226]/10 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl tracking-[0.2em] text-[#6b1226] mb-6">JF</h2>
          <p className="text-[#6b1226]/60 text-sm font-sans mb-2">&copy; {new Date().getFullYear()} Ju Franco Atelier. Todos os direitos reservados.</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-[#6b1226]/80 hover:text-[#6b1226] text-sm underline underline-offset-4 mt-2 transition-colors">Fale conosco via WhatsApp</a>
          <button onClick={() => navigate('/admin')} className="mt-8 text-[10px] text-[#6b1226]/40 hover:text-[#6b1226] flex items-center gap-1 transition-colors"><Lock size={10} /> Área do Administrador</button>
        </footer>
      </motion.div>

      <AnimatePresence>
        {showCatalog && (
          <motion.a initial={{ opacity: 0, scale: 0, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 1, duration: 0.6, type: "spring" }} href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
            <MessageCircle size={28} />
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewingProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingProduct(null)} className="fixed inset-0 bg-[#6b1226]/20 backdrop-blur-sm z-50" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#fde1ee] z-50 shadow-2xl flex flex-col border-l border-[#6b1226]/10">
              <div className="p-6 border-b border-[#6b1226]/10 flex items-center justify-between bg-white/50">
                <h2 className="font-serif text-2xl text-[#6b1226]">Detalhes da Peça</h2>
                <button onClick={() => setViewingProduct(null)} className="text-[#6b1226]/60 hover:text-[#6b1226] transition-colors p-2"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="relative">
                  <img src={viewingProduct.image} alt={viewingProduct.name} className={`w-full rounded-lg object-cover aspect-[3/4] ${viewingProduct.isAvailable === false ? 'grayscale shadow-sm' : 'shadow-[0_0_20px_rgba(107,18,38,0.15)]'}`} />
                  {viewingProduct.isAvailable === false && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm border border-gray-600">
                        Indisponível
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-3xl text-[#6b1226] mt-6 leading-tight">{viewingProduct.name}</h3>
                <div className="flex gap-2 mt-4 mb-6">
                  <span className="px-3 py-1 bg-white text-[#6b1226] border border-[#6b1226]/20 text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{viewingProduct.color}</span>
                  <span className="px-3 py-1 bg-[#6b1226] text-[#fde1ee] text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{viewingProduct.event}</span>
                  {viewingProduct.subcategory && <span className="px-3 py-1 bg-white text-[#6b1226] border border-[#6b1226]/20 text-[10px] uppercase font-bold tracking-wider rounded-full shadow-sm">{viewingProduct.subcategory}</span>}
                </div>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }} className="bg-white p-6 rounded-lg shadow-sm border border-[#6b1226]/10">
                  <p className="font-sans text-[#6b1226]/80 leading-relaxed whitespace-pre-wrap">{viewingProduct.description}</p>
                </motion.div>
              </div>
              <div className="p-6 bg-white border-t border-[#6b1226]/10">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá, Ju Franco Atelier! Tenho interesse na peça: _${viewingProduct.name}_${viewingProduct.isAvailable === false ? ' que vi no catálogo, mas notei que está indisponível' : ''}. Poderia me dar mais informações?`)}`} target="_blank" rel="noreferrer" className={`w-full py-4 font-sans font-medium tracking-widest uppercase transition-colors shadow-lg flex items-center justify-center gap-2 rounded-md ${viewingProduct.isAvailable === false ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#6b1226] text-[#fde1ee] hover:bg-[#8a1c36]'}`}>
                  <MessageCircle size={20} /> {viewingProduct.isAvailable === false ? 'Consultar Disponibilidade' : 'Tenho Interesse'}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}