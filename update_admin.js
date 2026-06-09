const fs = require('fs');
const p = 'c:/Users/Moura/Desktop/Nexus/clientes/Atelier/frontend/src/Catalog.tsx';
let c = fs.readFileSync(p, 'utf8');
c = c.replace(/href=\\{`https:\/\/wa\.me\/\${\WHATSAPP_NUMBER}`\\}/g, "href={`https://wa.me/