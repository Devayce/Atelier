const fs = require('fs');

// Fix Catalog.tsx
const catalogPath = 'c:/Users/Moura/Desktop/Nexus/clientes/Atelier/frontend/src/Catalog.tsx';
let catalog = fs.readFileSync(catalogPath, 'utf8');
catalog = catalog.split('href={https://wa.me/}').join('href={https://wa.me/?text=}');
fs.writeFileSync(catalogPath, catalog);
console.log('Catalog updated.');

// Fix AdminPanel.tsx
const adminPath = 'c:/Users/Moura/Desktop/Nexus/clientes/Atelier/frontend/src/AdminPanel.tsx';
let admin = fs.readFileSync(adminPath, 'utf8');
const oldImageInput = <div className="space-y-2">
                    <label htmlFor="productImage" className="text-sm font-medium text-gray-700">URL da Imagem</label>
                    <input id="productImage" type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors" placeholder="Opcional. Ex: https://..." />
                  </div>;
                  
const newImageInput = <div className="space-y-2">
                    <label htmlFor="productImage" className="text-sm font-medium text-gray-700">Imagem (URL ou Arquivo)</label>
                    <div className="flex gap-2">
                      <input id="productImage" type="text" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:border-[#6b1226] transition-colors" placeholder="Opcional. Ex: https://..." />
                      <label className="flex items-center justify-center px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                        Escolher Arquivo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewProduct(prev => ({...prev, image: reader.result as string}));
                            };
                            reader.readAsDataURL(file);
                          }
                        }} />
                      </label>
                    </div>
                  </div>;
admin = admin.replace(oldImageInput, newImageInput);
fs.writeFileSync(adminPath, admin);
console.log('AdminPanel updated.');
