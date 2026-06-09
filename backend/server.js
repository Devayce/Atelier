const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'matheus01*',
  port: 5432,
});

const initDB = async () => {
  const createTableText = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image TEXT,
      color VARCHAR(100),
      event VARCHAR(100),
      subcategory VARCHAR(100),
      description TEXT,
      "isAvailable" BOOLEAN DEFAULT true
    );
  `;
  try {
    await pool.query(createTableText);
    console.log('Tabela products verificada/criada com sucesso.');
  } catch (err) { console.error('Erro:', err); }
};

initDB();

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/api/products', async (req, res) => {
  const { name, image, color, event, subcategory, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, image, color, event, subcategory, description, "isAvailable") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, image, color, event, subcategory, description, true]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, color, event, subcategory, description, isAvailable } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, image = $2, color = $3, event = $4, subcategory = $5, description = $6, "isAvailable" = $7 WHERE id = $8 RETURNING *',
      [name, image, color, event, subcategory, description, isAvailable, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso', deletedProduct: result.rows[0] });
  } catch (err) {
    
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});


