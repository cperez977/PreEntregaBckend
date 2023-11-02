const express = require('express');
const app = express();
const port = 3000; 


const ProductManager = require('./src/ProductManager');


const productManager = new ProductManager();

app.get('/', (req, res) => {
    res.send('Curso BackEnd!');
  });

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); 

    const products = await productManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;

    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
