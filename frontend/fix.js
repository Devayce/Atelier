const fs = require('fs');
let c = fs.readFileSync('src/Catalog.tsx', 'utf8');

const oldStr = `              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/logo.jpeg" 
                alt="Ju Franco Atelier" 
                className="w-full max-h-[65vh] object-contain rounded-sm"
                style={{ filter: "drop-shadow(0px 15px 30px rgba(107, 18, 38, 0.15))" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596460107916-430662021049?auto=format&fit=crop&q=80&w=400';
                }}
              />`;

const newStr = `              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="/logo.jpeg" 
                alt="Ju Franco Atelier" 
                className="w-full max-w-[85vw] sm:max-w-md md:max-w-2xl max-h-[60vh] object-contain mix-blend-multiply"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596460107916-430662021049?auto=format&fit=crop&q=80&w=400';
                }}
              />`;

c = c.replace(oldStr, newStr);

fs.writeFileSync('src/Catalog.tsx', c);
