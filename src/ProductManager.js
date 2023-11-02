const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = this.generateUniqueId(products);
    products.push(product);
    this.saveProducts(products);
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(productId) {
    const products = this.getProducts();
    const product = products.find((p) => p.id === productId);
    if (product) {
      return product;
    } else {
      throw new Error('Producto no encontrado');
    }
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedProduct, id: productId };
      this.saveProducts(products);
    } else {
      throw new Error('Producto no encontrado');
    }
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const updatedProducts = products.filter((p) => p.id !== productId);
    if (updatedProducts.length < products.length) {
      this.saveProducts(updatedProducts);
    } else {
      throw new Error('Producto no encontrado');
    }
  }

  generateUniqueId(products) {
    let id = 1;
    while (products.some((p) => p.id === id)) {
      id++;
    }
    return id;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }

  async getAllProducts(limit) {
    try {
      const products = await this.readProductsFromFile(); // Implementa la lectura de productos desde el archivo
      if (limit) {
        return products.slice(0, limit); // Devuelve solo los primeros 'limit' productos
      } else {
        return products; // Devuelve todos los productos
      }
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.readProductsFromFile(); // Implementa la lectura de productos desde el archivo
      const product = products.find((p) => p.id === productId);
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto por ID');
    }
  }
}

module.exports = ProductManager;
