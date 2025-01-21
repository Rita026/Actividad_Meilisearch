const express = require('express');
const { MeiliSearch } = require('meilisearch');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Configuración del cliente de MeiliSearch
const client = new MeiliSearch({
  host: 'http://172.235.48.37', // Mi IP de MeiliSearch
  apiKey: '6a1733e33c80fa51c1aa5942cbed8b78cd3e72d88c94b402ffdd56228529', // Mi clave maestra
});

app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'El campo "query" es requerido' });
    }

    // Buscar en el índice 'movies'
    const index = client.index('movies');
    const searchResults = await index.search(query);
    
    res.json(searchResults);
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error.message, error.stack);
    res.status(500).json({ error: 'Error al realizar la búsqueda' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
